import type { CSSProperties } from 'react';

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

const H2_STYLE: CSSProperties = {
  fontFamily: 'var(--font-montserrat)',
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: 1.3,
  color: '#1C3B3A',
  marginTop: '48px',
  marginBottom: '16px',
};

const P_STYLE: CSSProperties = {
  fontFamily: 'var(--font-lato)',
  fontSize: '18px',
  lineHeight: 1.8,
  color: 'rgba(28,59,58,0.8)',
  marginBottom: '16px',
};

const DOT = (
  <span
    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E8924B', flexShrink: 0, marginTop: '10px', display: 'inline-block' }}
    aria-hidden="true"
  />
);

type Section = {
  id: string;
  heading: string;
  intro?: string;
  paragraphs?: string[];
  list?: string[];
  closing?: string;
};

const SECTIONS: Section[] = [
  {
    id: 'who-we-are',
    heading: '1. Who We Are',
    paragraphs: [
      'Tamika Jackson Recreation and Consulting Services (TJRCS) is a sole proprietorship operated by Tamika Jackson, a Recreation Professional, based in Vaughan, Ontario, and serving clients across the Greater Toronto Area and online. This policy explains what personal information we collect through tjrcs.net, including through our chatbot Yeriel, why we collect it, how it is stored, and how you can reach us with questions.',
    ],
  },
  {
    id: 'information-we-collect',
    heading: '2. Information We Collect',
    list: [
      'Contact details you provide directly: your name, email address, and anything you type into our inquiry form, our newsletter signup, or the Yeriel chatbot.',
      'Booking details: if you schedule a free 1-on-1 consultation, our booking platform collects your name, email, and appointment time.',
      'Payment details: if you enroll in a program, payment is processed directly by PayPal. We do not collect or store your card or banking information ourselves.',
      'General site usage: we use privacy-focused analytics that does not use cookies and does not collect personally identifying information about how visitors move through the site.',
    ],
  },
  {
    id: 'why-we-collect-it',
    heading: '3. Why We Collect It',
    intro: 'We collect this information to:',
    list: [
      'Respond to your inquiry and answer your questions about Build & Launch or our other services',
      'Send you information you asked for, such as invite links or program details',
      'Confirm and manage 1-on-1 consultations you book',
      'Process program payments through PayPal',
      'Improve the site and the Yeriel chatbot based on general, non-identifying usage patterns',
    ],
    closing:
      'We do not sell your personal information, and we do not use it for purposes beyond what is described here without asking you first.',
  },
  {
    id: 'how-stored',
    heading: '4. How Your Information Is Stored',
    paragraphs: [
      "Depending on where you provide it, your information may be stored with trusted third-party service providers, including email delivery, scheduling, payment processing, and AI chatbot services. Some of these providers are located outside Canada, which means your information may be processed in another country, subject to that country's laws.",
      'The specific service providers we use are available on request. Contact tamika@tjrcs.net if you would like this information.',
    ],
  },
  {
    id: 'how-long',
    heading: '5. How Long We Keep It',
    paragraphs: [
      'We keep your information only as long as needed to respond to your inquiry, deliver the service you requested, or meet our own record-keeping and legal obligations. If you ask us to delete your information and we have no ongoing reason to keep it, we will.',
    ],
  },
  {
    id: 'how-we-protect',
    heading: '6. How We Protect It',
    paragraphs: [
      'We take reasonable steps to protect your information, including using established service providers, limiting access to your information to Tamika Jackson and any TJRCS staff members who need it to do their work, and using secure, authenticated connections between our systems. No online system can guarantee perfect security, but we work to keep your information as safe as reasonably possible.',
    ],
  },
  {
    id: 'yeriel-chatbot',
    heading: '7. The Yeriel Chatbot',
    paragraphs: [
      "When you open the Yeriel chatbot or type a message into it, we ask for your name and email so we can follow up if it would be helpful. Your conversation with Yeriel is processed by Anthropic's Claude to generate a response, and is not reviewed by a person unless you choose to book a consultation or reach out directly. Yeriel is a support tool and is not a substitute for speaking directly with Tamika Jackson or a member of the TJRCS team.",
    ],
  },
  {
    id: 'participants-under-18',
    heading: '8. Information About Participants Under 18',
    paragraphs: [
      'Build & Launch serves participants ages 15 to 30. If you are a parent or guardian submitting information on behalf of someone under 18, we treat that information the same way as information submitted about an adult participant, and it remains subject to the consent and guardian framework described in our program agreements.',
    ],
  },
  {
    id: 'your-rights',
    heading: '9. Your Rights',
    intro: 'Under Canadian privacy law, you have the right to:',
    list: [
      'Ask what personal information we have about you',
      'Ask us to correct inaccurate information',
      'Ask us to delete your information, where we have no legal or business reason to keep it',
      'Withdraw consent to future contact at any time',
    ],
    closing:
      'To make any of these requests, contact Tamika Jackson or the TJRCS team at tamika@tjrcs.net.',
  },
  {
    id: 'changes',
    heading: '10. Changes to This Policy',
    paragraphs: [
      'We may update this policy as our services or tools change. The effective date at the top of this page reflects the most recent update.',
    ],
  },
  {
    id: 'contact-us',
    heading: '11. Contact Us',
    paragraphs: [
      'Questions about this policy or how your information is handled can be sent to tamika@tjrcs.net, and will be handled by Tamika Jackson or an authorized member of the TJRCS team.',
    ],
  },
];

export default function PrivacyContent() {
  return (
    <main id="main-content">

      {/* ── 1. Page Header ── bg-cream ────────────────────────────────────── */}
      <section
        aria-labelledby="privacy-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>Legal</span>
        </div>

        <h1
          id="privacy-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.15,
            color: '#1C3B3A',
            marginBottom: '20px',
          }}
        >
          Privacy Policy
        </h1>

        <dl
          className="flex flex-col gap-1 mb-8"
          style={{
            fontFamily: 'var(--font-lato)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'rgba(28,59,58,0.75)',
          }}
        >
          <div className="flex gap-2">
            <dt className="font-bold">Business:</dt>
            <dd>Tamika Jackson Recreation and Consulting Services</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-bold">Effective Date:</dt>
            <dd>August 23, 2026</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-bold">Website:</dt>
            <dd>tjrcs.net</dd>
          </div>
        </dl>

        <a
          href="/documents/TJRCS_Privacy_Policy.pdf"
          className="inline-flex items-center gap-2 font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 rounded"
          style={{ color: '#1C3B3A', outlineColor: '#E8924B' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M4 19h16" />
          </svg>
          Download as PDF
        </a>
      </section>

      {/* ── 2. Policy body ── bg-white ───────────────────────────────────── */}
      <section
        aria-label="Privacy policy details"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="max-w-[820px]">
          {SECTIONS.map((section) => (
            <div key={section.id}>
              <h2 style={H2_STYLE}>{section.heading}</h2>

              {section.intro && <p style={P_STYLE}>{section.intro}</p>}

              {section.paragraphs?.map((text, i) => (
                <p key={i} style={P_STYLE}>
                  {text}
                </p>
              ))}

              {section.list && (
                <ul className="space-y-3 mb-4">
                  {section.list.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-start"
                      style={{ fontFamily: 'var(--font-lato)', fontSize: '18px', lineHeight: 1.8, color: 'rgba(28,59,58,0.8)' }}
                    >
                      {DOT}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.closing && <p style={P_STYLE}>{section.closing}</p>}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
