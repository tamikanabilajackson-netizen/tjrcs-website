'use client';

import { useState, type FormEvent } from 'react';

type FormState = {
  name: string;
  email: string;
  role: string;
  about: string;
  referral: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function BuildLaunchInquiryForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    role: '',
    about: '',
    referral: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Build & Launch Inquiry (Homepage)',
          name: form.name,
          email: form.email,
          category: form.role,
          message: form.about,
          referral: form.referral,
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
      <div role="status" className="mb-16 text-cream">
        <p className="font-heading font-semibold text-[26px] mb-2">
          Thank you — Tamika will be in touch soon.
        </p>
        <p className="text-cream/75 text-[22px] leading-[1.8]">Keep an eye on your inbox.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6 mb-16" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="inquiry-name" className="block text-cream text-lg font-medium mb-2">Name</label>
        <input
          id="inquiry-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="inquiry-email" className="block text-cream text-lg font-medium mb-2">Email</label>
        <input
          id="inquiry-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="inquiry-role" className="block text-cream text-lg font-medium mb-2">Who is inquiring</label>
        <select
          id="inquiry-role"
          required
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
          className="w-full bg-white/10 border border-cream/25 text-cream rounded-md px-4 py-3 focus:border-cream/55 transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="text-teal bg-white">Select one</option>
          <option value="young-adult" className="text-teal bg-white">I&apos;m a young adult interested in the program</option>
          <option value="parent" className="text-teal bg-white">I&apos;m a parent or caregiver</option>
          <option value="together" className="text-teal bg-white">We&apos;re reaching out together</option>
        </select>
      </div>
      <div>
        <label htmlFor="inquiry-about" className="block text-cream text-lg font-medium mb-2">
          Tell us about where you or your young adult is right now{" "}
          <span className="text-cream/45 font-normal">(optional)</span>
        </label>
        <textarea
          id="inquiry-about"
          rows={4}
          value={form.about}
          onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
          className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors resize-none"
          placeholder="Share as much or as little as you'd like."
        />
      </div>
      <div>
        <label htmlFor="inquiry-referral" className="block text-cream text-lg font-medium mb-2">
          How did you hear about Build &amp; Launch{" "}
          <span className="text-cream/45 font-normal">(optional)</span>
        </label>
        <input
          id="inquiry-referral"
          type="text"
          value={form.referral}
          onChange={e => setForm(f => ({ ...f, referral: e.target.value }))}
          className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
          placeholder="Instagram, word of mouth, etc."
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-amber text-[18px]">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-amber text-white font-semibold text-[17px] px-8 py-4 rounded-md hover:bg-amber/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send my inquiry'}
      </button>
    </form>
  );
}
