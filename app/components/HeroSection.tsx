'use client';

import { useEffect, useState } from 'react';

const LINE1 = "Your future doesn't have to look like everyone else's.";

const LINE2_PHRASES = [
  "Let's build it.",
  "Build the one that fits you.",
  "Let's build the future that fits you.",
] as const;

export default function HeroSection() {
  const [line2Text,     setLine2Text]     = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);
  const [eyebrowIn,     setEyebrowIn]     = useState(false);
  const [buttonsIn,     setButtonsIn]     = useState(false);
  const [trustIn,       setTrustIn]       = useState(false);

  useEffect(() => {
    const tids: ReturnType<typeof setTimeout>[] = [];
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      tids.push(id);
    };

    let phraseIdx = 0;
    let charCount = 0;
    let isErasing = false;
    let firstPhraseComplete = false;

    function tick() {
      const phrase = LINE2_PHRASES[phraseIdx];

      if (!isErasing) {
        charCount++;
        setLine2Text(phrase.slice(0, charCount));

        if (charCount === phrase.length) {
          if (!firstPhraseComplete) {
            firstPhraseComplete = true;
            after(() => setButtonsIn(true), 100);
            after(() => setTrustIn(true),   350);
          }
          isErasing = true;
          after(tick, 3500);
        } else {
          after(tick, 75);
        }
      } else {
        charCount--;
        setLine2Text(phrase.slice(0, charCount));

        if (charCount === 0) {
          isErasing = false;
          phraseIdx = (phraseIdx + 1) % LINE2_PHRASES.length;
          after(tick, 400);
        } else {
          after(tick, 40);
        }
      }
    }

    after(() => {
      setEyebrowIn(true);
      setCursorVisible(true);
      tick();
    }, 700);

    return () => { tids.forEach(clearTimeout); };
  }, []);

  return (
    <section className="relative bg-[#F9F4EC]" style={{ minHeight: '700px', overflow: 'visible' }}>

      {/* Left accent bar — amber → teal gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[5px] z-20"
        style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div
        className="relative z-10 flex items-center py-20"
        style={{ minHeight: '700px', paddingLeft: '5%', paddingRight: '5%', overflow: 'visible' }}
      >
        <div style={{ maxWidth: '100%', width: '100%' }}>

          {/* Eyebrow — fades up on load */}
          <div
            className="transition-all duration-700"
            style={{ opacity: eyebrowIn ? 1 : 0, transform: eyebrowIn ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[2px] bg-amber shrink-0" style={{ width: '50px' }} aria-hidden="true" />
              <span
                className="text-amber uppercase font-semibold"
                style={{ fontSize: '22px', letterSpacing: '4px' }}
              >
                The Build &amp; Launch Program
              </span>
            </div>
          </div>

          {/* H1 — Line 1 static, Line 2 looping typewriter */}
          <h1
            className="font-heading font-extrabold mb-8"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', lineHeight: 1.12, wordWrap: 'break-word', overflow: 'visible' }}
          >
            <span className="block" style={{ color: '#1C3B3A' }}>
              {LINE1}
            </span>
            <span className="block" style={{ color: '#E8924B', minHeight: '1.12em' }} aria-live="polite">
              {line2Text}
              {cursorVisible && (
                <span style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.85em',
                  backgroundColor: '#E8924B',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink 0.75s step-end infinite',
                }} aria-hidden="true" />
              )}
            </span>
          </h1>

          {/* Subheadline — static, always visible */}
          <div className="mb-10">
            <p className="font-sans font-normal" style={{ fontSize: '22px', lineHeight: 1.8, color: '#3a4a3a', maxWidth: '680px' }}>
              A 4-month recreation-based entrepreneurship and career exploration program for autistic and neurodivergent young adults: 1:1, strengths-based, and designed around you from day one.
            </p>
          </div>

          {/* CTA buttons — fades in */}
          <div
            className="transition-all duration-700 mb-10"
            style={{ opacity: buttonsIn ? 1 : 0, transform: buttonsIn ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#get-started"
                className="inline-block bg-amber text-white font-semibold text-[17px] px-8 py-4 rounded-md text-center shadow-md hover:bg-amber/90 transition-colors"
              >
                Find out if this is for you
              </a>
              <a
                href="#get-started"
                className="inline-block border-2 border-teal text-teal font-semibold text-[17px] px-8 py-4 rounded-md text-center hover:bg-teal hover:text-cream transition-colors"
              >
                Join an info session
              </a>
            </div>
          </div>

          {/* Trust bar — fades in last */}
          <div
            className="transition-all duration-700"
            style={{ opacity: trustIn ? 1 : 0, transform: trustIn ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <div className="flex items-center gap-3 text-teal/55 text-[17px]" style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
              <span>Ages 15&ndash;30</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal/30" aria-hidden="true" />
              <span>1:1 sessions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal/30" aria-hidden="true" />
              <span>Ajax, Pickering, Markham, Oshawa, Vaughan in Ontario, Canada</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
