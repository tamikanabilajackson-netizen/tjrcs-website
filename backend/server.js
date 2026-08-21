require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');

// Build & Launch facts, generated from the Next.js app's lib/program-data.ts
// by scripts/generate-program-data.mjs. Never edit the JSON by hand and never
// restate these facts inline below — lib/program-data.ts is the source of
// truth for both the website copy and this chatbot.
const programData = require('./program-data.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Render puts the app behind a reverse proxy — without this, express-rate-limit
// sees the proxy's IP for every request instead of the visitor's.
app.set('trust proxy', 1);

// ---- Middleware ----
app.use(express.json());

// Fail closed: if ALLOWED_ORIGIN is unset, `origin: false` sends no CORS
// headers at all (browsers block cross-origin calls) rather than allowing
// every origin via '*'.
if (!process.env.ALLOWED_ORIGIN) {
  console.error(
    'ALLOWED_ORIGIN is not set — cross-origin requests will be refused. Set it to the site origin, e.g. https://tjrcs.net'
  );
}
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || false,
  })
);

// Limit form submissions to 10 per 15 minutes per IP to block spam/abuse
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again later.' },
});

// A chat turn is far cheaper than a form email but happens many times per
// visit, so it gets its own, more permissive bucket than formLimiter.
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please give it a few minutes and try again.' },
});

// ---- Mailer (Resend) ----
// tjrcs.net is verified at https://resend.com/domains, so we can send from
// any address on the domain. forms@ doesn't need to be a real Zoho mailbox —
// replies go to the submitter via replyTo, and delivery goes to TO_EMAIL.
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'TJRCS Website <forms@tjrcs.net>';

// ---- Chatbot (Anthropic) ----
// Constructed lazily: `new Anthropic()` throws when no key is present, and a
// missing ANTHROPIC_API_KEY must not take down /api/inquiry or /api/subscribe.
const CHAT_MODEL = 'claude-haiku-4-5-20251001';
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 20;

// Yeriel emits this marker when a visitor wants to book time with Tamika.
// The booking URL itself is never sent to the model (see renderProgramFacts),
// so the model has no way to speak or invent the address. The marker is
// stripped here and surfaced to the widget as a `showBooking` flag, which the
// widget turns into a button using the URL from lib/program-data.ts.
const BOOKING_MARKER = '[[BOOK_CONSULT]]';

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
} else {
  console.error('ANTHROPIC_API_KEY is not set — /api/chat will return 503 until it is.');
}

// Renders the Build & Launch facts out of program-data.json. Everything in
// here traces back to lib/program-data.ts, so program details can never drift
// between the website copy and what Yeriel says.
//
// Deliberately omits programData.consultationBookingUrl. Keeping the booking
// URL out of the prompt is what guarantees Yeriel can never print it or
// hallucinate a variation of it. The widget owns rendering that link.
function renderProgramFacts() {
  const p = programData;
  const phases = p.phases
    .map((ph) => `  Month ${ph.month}, ${ph.name}: "${ph.tagline}" ${ph.description}`)
    .join('\n');

  return [
    `PROGRAM: ${p.name} (${p.tagline})`,
    `Ages: ${p.ageRange}. Duration: ${p.duration}.`,
    `Summary: ${p.description}`,
    '',
    'THE FOUR PHASES:',
    phases,
    '',
    'WHAT THE PROGRAM INCLUDES:',
    `  ${p.structure.sessions}`,
    `  ${p.structure.groupSessions}`,
    `  ${p.structure.ventureDays}`,
    `  ${p.structure.journal}`,
    `  ${p.structure.closing}`,
    '',
    'PRICING:',
    `  Discovery Month: ${p.pricing.discoveryMonth.price} (${p.pricing.discoveryMonth.note})`,
    `  Full Program, installments: ${p.pricing.fullProgramInstallments.total} (${p.pricing.fullProgramInstallments.breakdown})`,
    `  Full Program, paid in full: ${p.pricing.fullProgramPaidInFull.total} (${p.pricing.fullProgramPaidInFull.breakdown})`,
    '',
    'WHO IT IS FOR:',
    ...p.whoItsFor.map((item) => `  ${item}`),
    '',
    'WHAT IT IS NOT:',
    ...p.whatItIsNot.map((item) => `  ${item}`),
  ].join('\n');
}

// Pure function of static data, so the string is byte-identical on every call.
// That keeps it cheap to rebuild per request and keeps the cached prefix stable.
function buildSystemPrompt() {
  return `You are Yeriel, the assistant for Tamika Jackson Recreation and Consulting Services (TJRCS) at tjrcs.net. You answer questions about the Build & Launch program.

${renderProgramFacts()}

LANGUAGE RULES (non-negotiable, no exceptions):
- Tamika's title is "Recreation Professional". Never call her a "recreation therapist" or "recreational therapist".
- You may say the program "applies therapeutic recreation principles". Never describe it as "recreation therapy" or call "therapeutic recreation" a credential or a service.
- Sessions are always "1-on-1". Never write "1:1".
- Never use em dashes. Use periods or commas instead.
- Refer to participants as "autistic young adults" or "neurodivergent young adults". Never use deficit language about them.

WHAT YOU DO:
- Answer questions about Build & Launch using only the facts listed above.
- If you are asked something the facts above do not cover, say so honestly and point the visitor to the inquiry form at tjrcs.net or to a weekly Instagram Live info session. Never guess, never estimate, and never invent program details, dates, or prices.
- Guide interested visitors toward the inquiry form or an info session.
- Stay focused on Build & Launch. TJRCS also offers STEM Birthday Parties, Recreation Professional Services, and AI Consulting for Care Facilities. If someone asks about those, acknowledge briefly that TJRCS offers them and ask which service they are interested in, then point them to the inquiry form.
- Never give clinical or medical advice. Never claim you can book a session, reserve a spot, or take payment. Those happen through the inquiry form and directly with Tamika.

BOOKING A CONSULTATION:
- When someone asks about booking, scheduling, setting up a call, meeting, or talking with Tamika directly, tell them warmly that Tamika offers a free 1-on-1 consultation. Say briefly what it is: a relaxed conversation where they can ask questions and work out together whether Build & Launch is the right fit, with no obligation and no sales pitch.
- End that reply with the marker ${BOOKING_MARKER} as the very last thing you write.
- The website turns that marker into a button the visitor can click to book, so write the reply as though the button is already sitting underneath it. Do not describe the button, do not write out a link, and never mention or invent a web address. You do not know the booking address and must not guess at one.
- Use the marker only when booking, scheduling, or speaking with Tamika has genuinely come up. Do not attach it to unrelated answers.

TONE: Warm, direct, and free of sales pressure. Keep answers short and plain. It is fine to say you do not know.`;
}

// ---- Helpers ----
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Logs a submission to the Google Sheet via an Apps Script Web App.
// Never throws — a logging failure should not block the email from going out.
async function logToSheet(payload) {
  if (!process.env.SHEETS_WEBHOOK_URL) return;
  try {
    const res = await fetch(process.env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, secret: process.env.SHEETS_SHARED_SECRET }),
      redirect: 'follow',
    });
    if (!res.ok) {
      console.error('Sheet logging returned status', res.status);
    }
  } catch (err) {
    console.error('Sheet logging failed:', err.message);
  }
}

// ---- Routes ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Single inquiry endpoint — used by BOTH forms on tjrcs.net:
//   1. Homepage "Build & Launch" inquiry form
//      fields: inquiry-name, inquiry-email, inquiry-role, inquiry-about, inquiry-referral
//   2. /contact page general inquiry form
//      fields: inquiry-name, inquiry-email, inquiry-service, inquiry-where-now, inquiry-how-heard
//
// Both forms should POST here with this shape:
//   {
//     source: "Build & Launch Inquiry (Homepage)" | "Contact Page Inquiry",
//     name, email,
//     category,   // the selected role or service
//     message,    // the "about" / "where now" textarea
//     referral,   // the "how did you hear about us" field
//   }
app.post('/api/inquiry', formLimiter, async (req, res) => {
  const { source, name, email, category, message, referral } = req.body || {};

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Name and a valid email are required.' });
  }
  if (String(name).length > 100) {
    return res.status(400).json({ error: 'Name must be 100 characters or fewer.' });
  }
  if (message && String(message).length > 500) {
    return res.status(400).json({ error: 'Message must be 500 characters or fewer.' });
  }
  if (referral && String(referral).length > 500) {
    return res.status(400).json({ error: 'The "how did you hear about us" field must be 500 characters or fewer.' });
  }

  const formLabel = source || 'Website Inquiry';

  try {
    const [emailResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New inquiry (${formLabel}) from ${name}`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Form:</strong> ${escapeHtml(formLabel)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Category:</strong> ${escapeHtml(category || 'Not specified')}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message || 'None').replace(/\n/g, '<br>')}</p>
          <p><strong>How they heard about us:</strong> ${escapeHtml(referral || 'Not specified')}</p>
        `,
      }),
      logToSheet({
        source: formLabel,
        name,
        email,
        category: category || '',
        message: message || '',
        referral: referral || '',
      }),
    ]);
    // Resend resolves (rather than rejects) on API-level failures, e.g. an
    // unverified domain or bad API key — surface those as errors too.
    if (emailResult.error) throw new Error(emailResult.error.message);
    res.json({ success: true, message: 'Thanks! Your inquiry has been sent.' });
  } catch (err) {
    console.error('Inquiry email failed:', err.message);
    res.status(500).json({ error: 'Something went wrong sending your inquiry. Please try again.' });
  }
});

// Lightweight signup endpoint — for the small "Keep me in the loop" /
// "Send me the invite link" capture forms (first name + email only).
app.post('/api/subscribe', formLimiter, async (req, res) => {
  const { source, name, email } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (name && String(name).length > 100) {
    return res.status(400).json({ error: 'Name must be 100 characters or fewer.' });
  }

  const formLabel = source || 'Newsletter Signup';

  try {
    const [emailResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New signup (${formLabel})${name ? ` — ${name}` : ''}`,
        html: `
          <h2>New Signup</h2>
          <p><strong>Form:</strong> ${escapeHtml(formLabel)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        `,
      }),
      logToSheet({
        source: formLabel,
        name: name || '',
        email,
        category: 'Signup',
        message: '',
        referral: '',
      }),
    ]);
    if (emailResult.error) throw new Error(emailResult.error.message);
    res.json({ success: true, message: "Thanks! You're on the list." });
  } catch (err) {
    console.error('Subscribe email failed:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Chat endpoint powering the Yeriel widget.
// Expects: { message: string, history?: [{ role: "user"|"assistant", content: string }] }
// Returns: { reply: string }
//
// History is supplied by the browser, so it is untrusted input: it gets
// filtered, length-capped, and trimmed to the most recent turns before it
// reaches the API. The system prompt is always rebuilt server-side and can
// never be overridden by the client.
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message, history } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A message is required.' });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return res
      .status(400)
      .json({ error: `Message must be ${MAX_MESSAGE_CHARS} characters or fewer.` });
  }
  if (history !== undefined && !Array.isArray(history)) {
    return res.status(400).json({ error: 'History must be an array if provided.' });
  }
  if (!anthropic) {
    return res
      .status(503)
      .json({ error: 'The chat assistant is not available right now. Please use the inquiry form.' });
  }

  // Keep only well-formed turns, then take the most recent ones to bound cost.
  const cleanHistory = (Array.isArray(history) ? history : [])
    .filter(
      (turn) =>
        turn &&
        (turn.role === 'user' || turn.role === 'assistant') &&
        typeof turn.content === 'string' &&
        turn.content.trim() &&
        turn.content.length <= MAX_MESSAGE_CHARS
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((turn) => ({ role: turn.role, content: turn.content }));

  // The Messages API requires the first turn to be from the user, so drop any
  // leading assistant turns left over after trimming.
  while (cleanHistory.length && cleanHistory[0].role !== 'user') {
    cleanHistory.shift();
  }

  try {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: [...cleanHistory, { role: 'user', content: message }],
    });

    // response.content is a list of blocks; concatenate the text ones.
    const raw = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    const showBooking = raw.includes(BOOKING_MARKER);
    // Strip every occurrence of the marker, then tidy the whitespace it leaves
    // behind, so the marker itself can never reach the browser.
    const reply = raw.split(BOOKING_MARKER).join('').replace(/\n{3,}/g, '\n\n').trim();

    if (!reply) {
      console.error('Anthropic returned no text. stop_reason:', response.stop_reason);
      return res
        .status(502)
        .json({ error: "Sorry, I couldn't answer that. Please try rephrasing." });
    }

    res.json({ reply, showBooking });
  } catch (err) {
    // Typed SDK errors, most specific first.
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic auth failed — check ANTHROPIC_API_KEY:', err.message);
      return res
        .status(503)
        .json({ error: 'The chat assistant is not available right now. Please use the inquiry form.' });
    }
    if (err instanceof Anthropic.RateLimitError) {
      console.error('Anthropic rate limit hit:', err.message);
      return res
        .status(429)
        .json({ error: "We're getting a lot of questions right now. Please try again in a moment." });
    }
    if (err instanceof Anthropic.APIConnectionError) {
      console.error('Could not reach Anthropic:', err.message);
      return res
        .status(504)
        .json({ error: 'The chat assistant is taking too long to respond. Please try again.' });
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
      return res
        .status(502)
        .json({ error: 'Something went wrong answering that. Please try again.' });
    }
    console.error('Unexpected chat failure:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ---- Fallback error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`TJRCS backend listening on port ${PORT}`);
});
