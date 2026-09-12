'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

// Mirrors the backend's own check in server.js so the two never disagree.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormProps = {
  /** Short heading above the fields. */
  heading: string;
  /** One line of context under the heading. */
  intro: string;
  /** Called with trimmed values once validation passes. */
  onSubmit: (name: string, email: string) => void;
  onSkip: () => void;
  /** Distinguishes the gate instance from the exit instance for input ids. */
  idPrefix: string;
};

export default function YerielLeadForm({
  heading,
  intro,
  onSubmit,
  onSkip,
  idPrefix,
}: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<'name' | 'email' | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const errorId = `${idPrefix}-error`;

  // The form replaces the chat body when it appears, so move focus to the
  // first field rather than leaving it on whatever triggered the change.
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError('name');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('email');
      return;
    }
    setError(null);
    onSubmit(name.trim(), email.trim());
  }

  const fieldClass =
    'w-full rounded-lg border bg-white px-3 py-2.5 font-sans text-[16px] leading-[1.5] text-[#1C3B3A] placeholder:text-[#1C3B3A]/45';

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      <h3 className="font-heading text-[18px] font-bold leading-snug text-[#1C3B3A]">{heading}</h3>
      <p className="mt-1.5 font-sans text-[15px] leading-[1.6] text-[#1C3B3A]/70">{intro}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
        <div>
          <label
            htmlFor={nameId}
            className="mb-1 block font-heading text-[13px] font-bold uppercase tracking-[1px] text-[#1C3B3A]/70"
          >
            Name
          </label>
          <input
            id={nameId}
            ref={nameRef}
            type="text"
            value={name}
            autoComplete="given-name"
            maxLength={100}
            aria-invalid={error === 'name'}
            aria-describedby={error ? errorId : undefined}
            onChange={(e) => {
              setName(e.target.value);
              if (error === 'name') setError(null);
            }}
            placeholder="Your name"
            className={`${fieldClass} ${error === 'name' ? 'border-[#E8924B]' : 'border-[#9BB5A8]'}`}
          />
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="mb-1 block font-heading text-[13px] font-bold uppercase tracking-[1px] text-[#1C3B3A]/70"
          >
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={email}
            autoComplete="email"
            maxLength={200}
            aria-invalid={error === 'email'}
            aria-describedby={error ? errorId : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error === 'email') setError(null);
            }}
            placeholder="you@example.com"
            className={`${fieldClass} ${error === 'email' ? 'border-[#E8924B]' : 'border-[#9BB5A8]'}`}
          />
        </div>

        {error && (
          <p id={errorId} role="alert" className="font-sans text-[14px] leading-snug text-[#1C3B3A]">
            {error === 'name'
              ? 'Please add your name so Tamika knows who to reply to.'
              : 'Please check that email address, it does not look quite right.'}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#E8924B] px-4 py-2.5 font-heading text-[15px] font-bold text-white transition-colors hover:bg-[#d4793a]"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="mx-auto block rounded px-2 py-1 font-sans text-[14px] text-[#1C3B3A]/60 underline underline-offset-4 transition-colors hover:text-[#1C3B3A]"
        >
          Skip for now
        </button>
      </form>
    </div>
  );
}
