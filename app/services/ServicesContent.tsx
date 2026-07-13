import Link from 'next/link';
import type { CSSProperties } from 'react';
import { servicesFaq } from '@/lib/schema';

const ACCENT_BAR: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '5px',
  background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)',
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

const SERVICE_HEADING: CSSProperties = {
  fontFamily: 'var(--font-montserrat)',
  fontWeight: 800,
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  lineHeight: 1.15,
  color: '#1C3B3A',
  marginBottom: '20px',
};

const SERVICE_BODY: CSSProperties = {
  fontFamily: 'var(--font-lato)',
  fontSize: '22px',
  lineHeight: 1.8,
  color: 'rgba(28,59,58,0.75)',
  maxWidth: '680px',
  marginBottom: '36px',
};

const TEXT_LINK: CSSProperties = {
  fontFamily: 'var(--font-lato)',
  fontSize: '17px',
  fontWeight: 600,
  color: '#E8924B',
  textDecoration: 'underline',
  textDecorationColor: '#E8924B',
  textUnderlineOffset: '4px',
};

export default function ServicesContent() {
  return (
    <main id="main-content">

      {/* ── 1. Page Header ── bg-cream ────────────────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>What I Offer</span>
        </div>

        <h1
          id="services-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.15,
            color: '#1C3B3A',
            marginBottom: '28px',
          }}
        >
          Ways we can work together
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
          Every program I run starts from the same place: knowing what&apos;s already working, not
          just what needs fixing. Here&apos;s how that shows up across the services I offer.
        </p>
      </section>

      {/* ── 2. Build & Launch ── bg-white ─────────────────────────────────── */}
      <section
        aria-labelledby="build-launch-heading"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <h2 id="build-launch-heading" style={SERVICE_HEADING}>
          Build &amp; Launch
        </h2>

        <p style={SERVICE_BODY}>
          A 4-month, 1:1 recreation-based entrepreneurship and career exploration program for
          autistic and neurodivergent young adults ages 15 to 30. Strengths-based, structured,
          and built around one person at a time.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/#get-started"
            className="inline-block bg-amber text-white font-heading font-bold text-[17px] px-8 py-4 rounded-md uppercase tracking-[1.5px] hover:bg-[#d4793a] transition-colors"
          >
            Send an inquiry
          </Link>
          <Link href="/" style={TEXT_LINK}>
            Learn more about Build &amp; Launch &rarr;
          </Link>
        </div>
      </section>

      {/* ── 3. STEM Birthday Parties ── bg-cream ──────────────────────────── */}
      <section
        aria-labelledby="stem-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <h2 id="stem-heading" style={SERVICE_HEADING}>
          STEM Birthday Parties (Ages 4&ndash;10)
        </h2>

        <p style={SERVICE_BODY}>
          Hands-on, themed birthday celebrations that bring science and discovery into the party
          itself. Built using the same recreation-based approach behind everything I do. Playful,
          structured, and genuinely engaging for kids.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-amber text-white font-heading font-bold text-[17px] px-8 py-4 rounded-md uppercase tracking-[1.5px] hover:bg-[#d4793a] transition-colors"
        >
          Send an inquiry
        </Link>
      </section>

      {/* ── 4. Recreation Professional Services ── bg-white ───────────────── */}
      <section
        aria-labelledby="rec-pro-heading"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <h2 id="rec-pro-heading" style={SERVICE_HEADING}>
          Recreation Professional Services
        </h2>

        <p style={SERVICE_BODY}>
          Program design, group facilitation, and recreation-based consulting for organizations
          and community settings, drawing on more than 15 years of experience building programs
          that help people discover what they&apos;re capable of.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-amber text-white font-heading font-bold text-[17px] px-8 py-4 rounded-md uppercase tracking-[1.5px] hover:bg-[#d4793a] transition-colors"
        >
          Send an inquiry
        </Link>
      </section>

      {/* ── 5. AI Consulting for Care Facilities ── bg-cream ──────────────── */}
      <section
        aria-labelledby="ai-consulting-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <h2 id="ai-consulting-heading" style={SERVICE_HEADING}>
          AI Consulting for Care Facilities
        </h2>

        <p style={SERVICE_BODY}>
          Practical support for care facilities looking to bring AI tools into their recreation
          programming, drawing on firsthand experience using AI to remove real barriers in
          this work.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-amber text-white font-heading font-bold text-[17px] px-8 py-4 rounded-md uppercase tracking-[1.5px] hover:bg-[#d4793a] transition-colors"
        >
          Send an inquiry
        </Link>
      </section>

      {/* ── 6. FAQ ── bg-white ────────────────────────────────────────────── */}
      <section
        aria-labelledby="faq-heading"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>Good to Know</span>
        </div>

        <h2 id="faq-heading" style={SERVICE_HEADING}>
          Frequently Asked Questions
        </h2>

        <div style={{ maxWidth: '760px' }}>
          {servicesFaq.map(({ question, answer }) => (
            <details
              key={question}
              style={{ borderBottom: '1px solid rgba(28,59,58,0.15)' }}
            >
              <summary
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  color: '#1C3B3A',
                  padding: '22px 0',
                  cursor: 'pointer',
                }}
              >
                {question}
              </summary>
              <p
                style={{
                  fontFamily: 'var(--font-lato)',
                  fontSize: '20px',
                  lineHeight: 1.8,
                  color: 'rgba(28,59,58,0.75)',
                  borderLeft: '3px solid #E8924B',
                  paddingLeft: '20px',
                  margin: '0 0 24px',
                }}
              >
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

    </main>
  );
}
