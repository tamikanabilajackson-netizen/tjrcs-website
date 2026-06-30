'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';

type InquiryForm = {
  name: string;
  email: string;
  service: string;
  otherService: string;
  whereAreYouNow: string;
  howDidYouHear: string;
};

type CaptureForm = {
  firstName: string;
  email: string;
};

const INPUT_STYLE: CSSProperties = {
  display: 'block',
  width: '100%',
  fontFamily: 'var(--font-lato)',
  fontSize: '18px',
  lineHeight: 1.6,
  color: '#1C3B3A',
  background: '#fff',
  border: '1px solid rgba(28,59,58,0.25)',
  borderRadius: '6px',
  padding: '12px 16px',
  marginTop: '6px',
};

const LABEL_STYLE: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-lato)',
  fontWeight: 700,
  fontSize: '16px',
  color: '#1C3B3A',
};

const EYEBROW_LINE: CSSProperties = {
  display: 'inline-block',
  width: '50px',
  height: '2px',
  background: '#E8924B',
  flexShrink: 0,
};

const EYEBROW_TEXT: CSSProperties = {
  color: '#E8924B',
  fontSize: '16px',
  fontFamily: 'var(--font-lato)',
  fontWeight: 600,
  letterSpacing: '4px',
  textTransform: 'uppercase',
};

const ACCENT_BAR: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '5px',
  background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)',
};

export default function ContactContent() {
  const [form, setForm] = useState<InquiryForm>({
    name: '',
    email: '',
    service: '',
    otherService: '',
    whereAreYouNow: '',
    howDidYouHear: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [capture, setCapture] = useState<CaptureForm>({ firstName: '', email: '' });
  const [captureSubmitted, setCaptureSubmitted] = useState(false);

  const otherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (form.service === 'Other' && otherInputRef.current) {
      otherInputRef.current.focus();
    }
  }, [form.service]);

  function handleInquirySubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Inquiry form submitted:', form);
    setSubmitted(true);
  }

  function handleCaptureSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Email capture submitted:', capture);
    setCaptureSubmitted(true);
  }

  return (
    <main id="main-content">

      {/* ── 1. Page Header ── bg-cream ────────────────────────────────────── */}
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>Get in Touch</span>
        </div>

        <h1
          id="contact-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.15,
            color: '#1C3B3A',
            marginBottom: '28px',
          }}
        >
          Let&apos;s find the right fit for you
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-lato)',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: 1.8,
            color: 'rgba(28,59,58,0.75)',
            maxWidth: '720px',
          }}
        >
          Whether you&apos;re exploring Build &amp; Launch or want to learn about another way I can
          support you or your organization, the first step is simple — fill out the short form below
          and tell me a bit about what you&apos;re looking for. I&apos;ll personally follow up, usually
          within two business days.
        </p>

        <p style={{ fontFamily: 'var(--font-lato)', fontSize: '17px', color: 'rgba(28,59,58,0.6)', marginTop: '24px' }}>
          Already know you&apos;re here for Build &amp; Launch?{' '}
          <Link
            href="/#get-started"
            style={{ color: '#E8924B', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            Go straight to that form
          </Link>
        </p>
      </section>

      {/* ── 2. Inquiry Form ── bg-white ───────────────────────────────────── */}
      <section
        aria-labelledby="inquiry-heading"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>Inquiry Form</span>
        </div>

        <h2
          id="inquiry-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight: 1.2,
            color: '#1C3B3A',
            marginBottom: '32px',
          }}
        >
          Send your inquiry
        </h2>

        {/* Form card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(28,59,58,0.12)',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(28,59,58,0.08)',
            padding: 'clamp(24px, 5%, 48px)',
            maxWidth: '760px',
          }}
        >
          {submitted ? (
            <div role="status" style={{ padding: '32px 0', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: '#1C3B3A',
                  marginBottom: '12px',
                }}
              >
                Thank you — Tamika will be in touch within two business days.
              </p>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: '18px', color: 'rgba(28,59,58,0.65)' }}>
                Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} noValidate>

              {/* Name */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="inquiry-name" style={LABEL_STYLE}>
                  Your name{' '}
                  <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  aria-required="true"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={INPUT_STYLE}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="inquiry-email" style={LABEL_STYLE}>
                  Your email address{' '}
                  <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={INPUT_STYLE}
                />
              </div>

              {/* Service select */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="inquiry-service" style={LABEL_STYLE}>
                  Which service are you interested in?{' '}
                  <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                </label>
                <select
                  id="inquiry-service"
                  required
                  aria-required="true"
                  value={form.service}
                  onChange={e => {
                    const service = e.target.value;
                    setForm(f => ({ ...f, service, otherService: service === 'Other' ? f.otherService : '' }));
                  }}
                  style={{ ...INPUT_STYLE, appearance: 'auto' as CSSProperties['appearance'] }}
                >
                  <option value="" disabled>Select a service…</option>
                  <option value="Build & Launch">Build &amp; Launch</option>
                  <option value="STEM Birthday Parties (Ages 4–10)">STEM Birthday Parties (Ages 4–10)</option>
                  <option value="Recreation Professional Services">Recreation Professional Services</option>
                  <option value="AI Consulting for Care Facilities">AI Consulting for Care Facilities</option>
                  <option value="Other">Other</option>
                </select>

                {form.service === 'Other' && (
                  <div style={{ marginTop: '16px' }}>
                    <label htmlFor="inquiry-other-service" style={LABEL_STYLE}>
                      Tell us what you&apos;re looking for{' '}
                      <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                    </label>
                    <input
                      id="inquiry-other-service"
                      ref={otherInputRef}
                      type="text"
                      required
                      aria-required="true"
                      value={form.otherService}
                      onChange={e => setForm(f => ({ ...f, otherService: e.target.value }))}
                      style={INPUT_STYLE}
                    />
                  </div>
                )}
              </div>

              {/* Where are you now — optional textarea */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="inquiry-where-now" style={LABEL_STYLE}>
                  Tell us a bit more about what you&apos;re looking for{' '}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'rgba(28,59,58,0.5)',
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  id="inquiry-where-now"
                  rows={5}
                  value={form.whereAreYouNow}
                  onChange={e => setForm(f => ({ ...f, whereAreYouNow: e.target.value }))}
                  style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              {/* How did you hear — optional text input */}
              <div style={{ marginBottom: '36px' }}>
                <label htmlFor="inquiry-how-heard" style={LABEL_STYLE}>
                  How did you hear about us?{' '}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'rgba(28,59,58,0.5)',
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  id="inquiry-how-heard"
                  type="text"
                  value={form.howDidYouHear}
                  onChange={e => setForm(f => ({ ...f, howDidYouHear: e.target.value }))}
                  style={INPUT_STYLE}
                />
              </div>

              {/* Primary submit button */}
              <button
                type="submit"
                style={{
                  background: '#E8924B',
                  color: '#fff',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 700,
                  fontSize: '17px',
                  padding: '14px 36px',
                  borderRadius: '6px',
                  border: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d4793a')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8924B')}
              >
                Send my inquiry
              </button>

            </form>
          )}
        </div>
      </section>

      {/* ── 3. Email Capture ── sage tint background ──────────────────────── */}
      <section
        aria-labelledby="capture-heading"
        className="relative overflow-hidden py-20 px-[5%]"
        style={{ background: 'rgba(155,181,168,0.13)' }}
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div style={{ maxWidth: '680px' }}>
          <h2
            id="capture-heading"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              lineHeight: 1.25,
              color: '#1C3B3A',
              marginBottom: '16px',
            }}
          >
            Just want the invite link for now?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: '20px',
              lineHeight: 1.8,
              color: 'rgba(28,59,58,0.75)',
              marginBottom: '32px',
            }}
          >
            That&apos;s completely fine. Enter your first name and email below and you&apos;ll receive
            a standing weekly invite to our Instagram Live info sessions — no inbox flooding, no
            commitment, just an open door whenever you&apos;re ready.
          </p>

          {/* Bordered card */}
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(155,181,168,0.5)',
              borderRadius: '10px',
              padding: 'clamp(20px, 4%, 36px)',
            }}
          >
            {captureSubmitted ? (
              <div role="status">
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#1C3B3A',
                  }}
                >
                  Thank you — Tamika will be in touch within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCaptureSubmit} noValidate>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ flex: '1 1 220px' }}>
                    <label htmlFor="capture-firstname" style={LABEL_STYLE}>
                      First name{' '}
                      <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                    </label>
                    <input
                      id="capture-firstname"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="given-name"
                      value={capture.firstName}
                      onChange={e => setCapture(c => ({ ...c, firstName: e.target.value }))}
                      style={INPUT_STYLE}
                    />
                  </div>
                  <div style={{ flex: '1 1 220px' }}>
                    <label htmlFor="capture-email" style={LABEL_STYLE}>
                      Email address{' '}
                      <span aria-hidden="true" style={{ color: '#E8924B' }}>*</span>
                    </label>
                    <input
                      id="capture-email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={capture.email}
                      onChange={e => setCapture(c => ({ ...c, email: e.target.value }))}
                      style={INPUT_STYLE}
                    />
                  </div>
                </div>

                {/* Secondary / ghost button */}
                <button
                  type="submit"
                  style={{
                    background: 'transparent',
                    color: '#1C3B3A',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 700,
                    fontSize: '16px',
                    padding: '12px 32px',
                    borderRadius: '6px',
                    border: '2px solid rgba(28,59,58,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#E8924B';
                    e.currentTarget.style.color = '#E8924B';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(28,59,58,0.4)';
                    e.currentTarget.style.color = '#1C3B3A';
                  }}
                >
                  Send me the invite link
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Legal Disclaimer ── above site footer ──────────────────────── */}
      <section aria-label="Legal information" className="bg-[#F9F4EC] py-8 px-[5%]">
        <p
          style={{
            fontFamily: 'var(--font-lato)',
            fontStyle: 'italic',
            fontSize: '14px',
            lineHeight: 1.75,
            color: '#7a9a95',
            maxWidth: '760px',
          }}
        >
          Build &amp; Launch is a private-pay program operated as a sole proprietorship in Ontario,
          Canada. It is not a clinical service and is not covered by OHIP or insurance. For questions
          about whether this program is appropriate alongside existing clinical support, please consult
          your healthcare provider.
        </p>
      </section>

    </main>
  );
}
