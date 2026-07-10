'use client';

import { useState, type FormEvent } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function NewsletterCaptureForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Homepage Newsletter',
          name: firstName,
          email,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('submitted');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'submitted') {
    return (
      <p role="status" className="text-cream text-[22px]">
        Thank you — keep an eye on your inbox for the next invite link.
      </p>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit} noValidate>
      <input
        id="capture-firstname"
        type="text"
        required
        autoComplete="given-name"
        aria-label="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="flex-1 bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
        placeholder="First name"
      />
      <input
        id="capture-email"
        type="email"
        required
        autoComplete="email"
        aria-label="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
        placeholder="Email address"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-amber text-white font-semibold text-[17px] px-6 py-3 rounded-md hover:bg-amber/90 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Keep me in the loop'}
      </button>
      {status === 'error' && (
        <p role="alert" className="text-amber text-[16px] sm:basis-full">{errorMessage}</p>
      )}
    </form>
  );
}
