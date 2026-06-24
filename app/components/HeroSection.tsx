'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { text: "Your future doesn't", teal: true },
  { text: "have to look like",   teal: true },
  { text: "everyone else's.",    teal: true },
  { text: "Let's build the one", teal: false },
  { text: "that fits you.",      teal: false },
] as const;

const TOTAL_CHARS = LINES.reduce((sum, l) => sum + l.text.length, 0);

// Map a 0-based char index to its line index
function getLineForChar(charIdx: number): number {
  let cumulative = 0;
  for (let i = 0; i < LINES.length; i++) {
    cumulative += LINES[i].text.length;
    if (charIdx < cumulative) return i;
  }
  return LINES.length - 1;
}

// Which line should the cursor sit on given how many chars have been typed
function getCursorLine(typedCount: number): number {
  if (typedCount === 0) return 0;
  if (typedCount >= TOTAL_CHARS) return LINES.length - 1;
  let cumulative = 0;
  for (let i = 0; i < LINES.length; i++) {
    cumulative += LINES[i].text.length;
    if (typedCount <= cumulative) return i;
  }
  return LINES.length - 1;
}

export default function HeroSection() {
  const [typedCount,    setTypedCount]    = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [eyebrowIn,     setEyebrowIn]     = useState(false);
  const [subIn,         setSubIn]         = useState(false);
  const [buttonsIn,     setButtonsIn]     = useState(false);
  const [trustIn,       setTrustIn]       = useState(false);

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      ids.push(id);
    };

    // 700ms page-load delay before anything starts
    after(() => {
      setEyebrowIn(true);
      setCursorVisible(true);

      // Pre-schedule every character with line-break pauses
      let elapsed = 0;
      let currentLine = -1;

      for (let i = 0; i < TOTAL_CHARS; i++) {
        const lineIdx = getLineForChar(i);
        if (lineIdx !== currentLine && i > 0) elapsed += 120; // pause between lines
        currentLine = lineIdx;
        const count = i + 1;
        after(() => setTypedCount(count), elapsed);
        elapsed += 75;
      }

      // After typing: hide cursor, then cascade fade-ins
      after(() => setCursorVisible(false),  elapsed + 500);
      after(() => setSubIn(true),           elapsed + 500 + 100);
      after(() => setButtonsIn(true),       elapsed + 500 + 350);
      after(() => setTrustIn(true),         elapsed + 500 + 600);
    }, 700);

    return () => { ids.forEach(clearTimeout); };
  }, []);

  const cursorLine = getCursorLine(typedCount);

  return (
    <section className="relative overflow-hidden bg-[#F9F4EC]" style={{ minHeight: '620px' }}>

      {/* Left accent bar — amber → teal gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[5px] z-20"
        style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div
        className="relative z-10 flex items-center py-20"
        style={{ minHeight: '620px', paddingLeft: '5%', paddingRight: '5%' }}
      >
        <div style={{ maxWidth: '100%', width: '100%' }}>

          {/* Eyebrow — fades up on load */}
          <div
            className="transition-all duration-700"
            style={{ opacity: eyebrowIn ? 1 : 0, transform: eyebrowIn ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[2px] bg-amber shrink-0" style={{ width: '28px' }} aria-hidden="true" />
              <span
                className="text-amber uppercase font-semibold"
                style={{ fontSize: '18px', letterSpacing: '4px' }}
              >
                The Build &amp; Launch Program
              </span>
            </div>
          </div>

          {/* H1 — typewriter */}
          <h1
            className="font-heading font-extrabold mb-8"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', lineHeight: 1.12 }}
            aria-label="Your future doesn't have to look like everyone else's. Let's build the one that fits you."
          >
            {LINES.map((line, lineIdx) => {
              const charsBeforeLine = LINES.slice(0, lineIdx).reduce((sum, l) => sum + l.text.length, 0);
              const charsToShow = Math.max(0, Math.min(line.text.length, typedCount - charsBeforeLine));
              const visible = line.text.slice(0, charsToShow);
              const cursorHere = cursorLine === lineIdx && cursorVisible;

              return (
                <span
                  key={lineIdx}
                  className="block"
                  style={{ color: line.teal ? '#1C3B3A' : '#E8924B' }}
                  aria-hidden="true"
                >
                  {visible}
                  {cursorHere && (
                    <span style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '0.85em',
                      backgroundColor: '#1C3B3A',
                      marginLeft: '2px',
                      verticalAlign: 'middle',
                      animation: 'blink 0.75s step-end infinite',
                    }} />
                  )}
                </span>
              );
            })}
          </h1>

          {/* Subheadline — fades in after typing */}
          <div
            className="transition-all duration-700 mb-10"
            style={{ opacity: subIn ? 1 : 0, transform: subIn ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <p className="font-sans font-normal" style={{ fontSize: '22px', lineHeight: 1.8, color: '#3a4a3a', maxWidth: '680px' }}>
              A 4-month recreation-based entrepreneurship and career exploration program for autistic and neurodivergent young adults &mdash; 1:1, strengths-based, and designed around you from day one.
            </p>
          </div>

          {/* CTA buttons — fades in */}
          <div
            className="transition-all duration-700 mb-10"
            style={{ opacity: buttonsIn ? 1 : 0, transform: buttonsIn ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-block bg-amber text-white font-semibold text-[17px] px-8 py-4 rounded-md text-center shadow-md hover:bg-amber/90 transition-colors"
              >
                Find out if this is for you
              </a>
              <a
                href="#contact"
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
            <div className="flex items-center gap-3 text-teal/55 text-[17px]">
              <span>Ages 15&ndash;30</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal/30" aria-hidden="true" />
              <span>1:1 sessions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal/30" aria-hidden="true" />
              <span>Vaughan, Ontario</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
