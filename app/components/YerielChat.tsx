'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { buildAndLaunchProgram } from '@/lib/program-data';

// Configurable so a staging backend can be pointed at without a code change.
// NEXT_PUBLIC_ vars are inlined at build time, so changing this needs a redeploy.
const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL || 'https://tjrcs-backend.onrender.com/api/chat';

// Matches the backend's own validation so oversized input is caught before
// it costs a round trip.
const MAX_INPUT_CHARS = 2000;
// The backend keeps the last 20 turns; sending more would just be discarded.
const MAX_HISTORY_TURNS = 20;

// Render's free tier spins the service down when idle, so a cold start can
// take 50+ seconds. The request ceiling is generous, and a separate, shorter
// timer swaps in reassuring copy so a long wait doesn't read as broken.
const REQUEST_TIMEOUT_MS = 90_000;
const SLOW_NOTICE_AFTER_MS = 8_000;

const GREETING =
  "Hi, I'm Yeriel. I can answer questions about Build & Launch: how it works, what's included, pricing, and who it's for. Ask me anything you're wondering about.";

const ERROR_TEXT =
  "Sorry, I couldn't get through just then. Give it another try, or use the inquiry form and Tamika will get back to you personally.";

type Role = 'user' | 'assistant';

type ChatMessage = {
  id: number;
  role: Role;
  content: string;
  /** Client-side notices (greeting, errors) are shown but never sent as history. */
  local?: boolean;
  isError?: boolean;
  /** Backend flagged this reply as a booking response; render the CTA under it. */
  showBooking?: boolean;
};

let messageId = 0;
const nextId = () => (messageId += 1);

const FOCUSABLE =
  'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export default function YerielChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: 'assistant', content: GREETING, local: true },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  // Holds the message that failed so the retry button can resend it.
  const [retryText, setRetryText] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    if (!isOpen) return;
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, isSending, isOpen]);

  // Move focus into the panel on open, and back to the launcher on close so
  // keyboard users are never dropped at the top of the document. Skipped on
  // first mount, which would otherwise steal focus on every page load.
  const hasToggled = useRef(false);
  useEffect(() => {
    if (!hasToggled.current) {
      hasToggled.current = true;
      return;
    }
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  // Abort any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const closePanel = useCallback(() => setIsOpen(false), []);

  // Escape closes from anywhere in the panel; Tab is cycled so focus stays
  // inside the dialog while it is open.
  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      closePanel();
      return;
    }
    if (event.key !== 'Tab') return;

    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  async function send(text: string, isRetry = false) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    setRetryText(null);
    setInput('');
    setIsSending(true);
    setIsSlow(false);

    // On a retry the failed message is already the last user turn in the
    // thread, so history has to stop short of it. Otherwise it would be sent
    // twice: once as history and again as `message`.
    let lastUserIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user' && !messages[i].local) {
        lastUserIdx = i;
        break;
      }
    }
    const prior = isRetry && lastUserIdx >= 0 ? messages.slice(0, lastUserIdx) : messages;

    // Build history from real exchanges only. The canned greeting and any
    // error notices are client-side and would misrepresent the conversation.
    const history = prior
      .filter((m) => !m.local && !m.isError)
      .slice(-MAX_HISTORY_TURNS)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) =>
      isRetry
        ? // Clear the error notice but keep the user's message where it is.
          prev.filter((m) => !m.isError)
        : [...prev, { id: nextId(), role: 'user', content: trimmed }]
    );

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutTimer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const slowTimer = setTimeout(() => setIsSlow(true), SLOW_NOTICE_AFTER_MS);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
        signal: controller.signal,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.reply) {
        // Prefer the backend's own friendly copy when it sent some.
        const serverMessage = typeof data?.error === 'string' ? data.error : null;
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: serverMessage || ERROR_TEXT,
            local: true,
            isError: true,
          },
        ]);
        setRetryText(trimmed);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: data.reply,
          showBooking: data.showBooking === true,
        },
      ]);
    } catch {
      // Network failure, timeout, or a blocked cross-origin request. The
      // visitor gets one plain message either way, never a raw error.
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', content: ERROR_TEXT, local: true, isError: true },
      ]);
      setRetryText(trimmed);
    } finally {
      clearTimeout(timeoutTimer);
      clearTimeout(slowTimer);
      abortRef.current = null;
      setIsSending(false);
      setIsSlow(false);
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter makes a new line.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  const charsLeft = MAX_INPUT_CHARS - input.length;
  const canSend = input.trim().length > 0 && !isSending;

  return (
    <>
      {/* Launcher — hidden from the a11y tree while the panel is open so the
          dialog is the only interactive surface. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="yeriel-panel"
        aria-label={isOpen ? 'Close the chat with Yeriel' : 'Open the chat with Yeriel'}
        className="yeriel-launcher fixed bottom-6 right-6 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-[#1C3B3A] text-[#F9F4EC] shadow-lg hover:bg-[#E8924B] hover:text-white"
      >
        {isOpen ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3v-5.2A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="yeriel-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="yeriel-title"
          onKeyDown={handlePanelKeyDown}
          className="yeriel-panel fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-[#9BB5A8] bg-[#F9F4EC] shadow-2xl bottom-24 right-4 left-4 max-h-[70vh] sm:left-auto sm:right-6 sm:w-[400px] sm:max-h-[560px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-[#1C3B3A] px-5 py-4">
            <div>
              <h2
                id="yeriel-title"
                className="font-heading text-[20px] font-bold leading-tight text-[#F9F4EC]"
              >
                Yeriel
              </h2>
              <p className="font-sans text-[13px] leading-tight text-[#9BB5A8]">
                Questions about Build &amp; Launch
              </p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close the chat with Yeriel"
              className="shrink-0 rounded-md p-1.5 text-[#F9F4EC]/80 hover:bg-white/10 hover:text-[#E8924B] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Thread. role="log" + aria-live announces each new message to
              screen readers as it is appended. */}
          <div
            ref={threadRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Conversation with Yeriel"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <div key={m.id}>
                <div className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={[
                      'max-w-[85%] rounded-xl px-4 py-2.5 font-sans text-[16px] leading-[1.6] whitespace-pre-wrap',
                      m.role === 'user'
                        ? 'bg-[#1C3B3A] text-[#F9F4EC]'
                        : m.isError
                          ? 'bg-white text-[#1C3B3A] border-l-4 border-[#E8924B]'
                          : 'bg-white text-[#1C3B3A] border border-[#9BB5A8]/50',
                    ].join(' ')}
                  >
                    <span className="sr-only">{m.role === 'user' ? 'You said: ' : 'Yeriel said: '}</span>
                    {m.content}
                  </div>
                </div>

                {/* Booking CTA. The URL comes straight from lib/program-data.ts,
                    never from the API response, so it is never spoken by the
                    model and never shown as text. */}
                {m.showBooking && (
                  <div className="mt-3 flex justify-start">
                    <a
                      href={buildAndLaunchProgram.consultationBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[85%] rounded-lg bg-[#E8924B] px-4 py-2.5 text-left font-heading text-[14px] font-bold leading-snug text-white transition-colors hover:bg-[#d4793a]"
                    >
                      Book a free 1-on-1 consultation with Tamika
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-[#9BB5A8]/50 bg-white px-4 py-2.5">
                  <span className="yeriel-dots flex items-center gap-1.5" aria-hidden="true">
                    <span className="block h-2 w-2 rounded-full bg-[#9BB5A8]" />
                    <span className="block h-2 w-2 rounded-full bg-[#9BB5A8]" />
                    <span className="block h-2 w-2 rounded-full bg-[#9BB5A8]" />
                  </span>
                </div>
              </div>
            )}

            {retryText && !isSending && (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => void send(retryText, true)}
                  className="rounded-lg border-2 border-[#E8924B] px-4 py-2 font-heading text-[14px] font-bold uppercase tracking-[1px] text-[#E8924B] transition-colors hover:bg-[#E8924B] hover:text-white"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Status region, kept separate from the thread so waiting and
              character-limit updates are announced without re-reading messages. */}
          <div aria-live="polite" className="sr-only">
            {isSending
              ? isSlow
                ? 'Still working. This can take up to a minute if the assistant has been idle.'
                : 'Yeriel is typing.'
              : ''}
          </div>

          {isSending && isSlow && (
            <p className="px-4 pb-1 font-sans text-[13px] italic leading-snug text-[#1C3B3A]/60">
              Still working. The assistant can take up to a minute to wake up if it has been idle.
            </p>
          )}

          {/* Composer */}
          <form onSubmit={handleSubmit} className="border-t border-[#9BB5A8]/50 bg-white px-3 py-3">
            <div className="flex items-end gap-2">
              <label htmlFor="yeriel-input" className="sr-only">
                Your message to Yeriel
              </label>
              <textarea
                id="yeriel-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_INPUT_CHARS}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about Build &amp; Launch..."
                aria-describedby="yeriel-input-hint"
                className="max-h-28 min-h-[44px] flex-1 resize-y rounded-lg border border-[#9BB5A8] bg-[#F9F4EC] px-3 py-2.5 font-sans text-[16px] leading-[1.5] text-[#1C3B3A] placeholder:text-[#1C3B3A]/45"
              />
              <button
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg bg-[#E8924B] text-white transition-colors hover:bg-[#d4793a] disabled:cursor-not-allowed disabled:bg-[#9BB5A8] disabled:opacity-70"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <p id="yeriel-input-hint" className="mt-1.5 font-sans text-[12px] leading-snug text-[#1C3B3A]/50">
              {charsLeft <= 200
                ? `${charsLeft} characters left`
                : 'Press Enter to send. Yeriel can make mistakes, so please confirm details with Tamika.'}
            </p>
          </form>
        </div>
      )}
    </>
  );
}
