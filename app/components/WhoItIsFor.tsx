'use client';

import { useEffect, useRef, useState } from 'react';

const LEFT_BULLETS = [
  "You're autistic, neurodivergent, or identify that way — with or without a formal diagnosis",
  "You've spent more time working around your challenges than building on your strengths",
  "You want a space that's consistent, predictable, and genuinely built around who you are",
  "You're ready to explore what a career could look like on your own terms",
] as const;

const RIGHT_BULLETS = [
  "You want something that takes your young adult seriously — not a program that manages them, but one that genuinely invests in who they are and where they're going",
  "Build & Launch is structured, professionally delivered, and grounded in therapeutic recreation principles",
  "Every session follows a consistent format — nothing significant happens without advance notice",
  "Your young adult is supported at every stage",
] as const;

type BulletState = { dotVisible: boolean; text: string };

function blank(count: number): BulletState[] {
  return Array.from({ length: count }, () => ({ dotVisible: false, text: '' }));
}

const DOT = (
  <span
    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E8924B', flexShrink: 0, marginTop: '6px', display: 'inline-block' }}
    aria-hidden="true"
  />
);

export default function WhoItIsFor() {
  const sectionRef  = useRef<HTMLElement>(null);
  const tidsRef     = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [left,  setLeft]  = useState<BulletState[]>(blank(LEFT_BULLETS.length));
  const [right, setRight] = useState<BulletState[]>(blank(RIGHT_BULLETS.length));

  useEffect(() => {
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      tidsRef.current.push(id);
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setLeft(LEFT_BULLETS.map(text  => ({ dotVisible: true, text })));
      setRight(RIGHT_BULLETS.map(text => ({ dotVisible: true, text })));
      return;
    }

    function typePair(pairIdx: number) {
      if (pairIdx >= LEFT_BULLETS.length) return;

      const lText = LEFT_BULLETS[pairIdx];
      const rText = RIGHT_BULLETS[pairIdx];

      // Show dots for this pair immediately
      setLeft(prev  => { const n = [...prev]; n[pairIdx] = { ...n[pairIdx], dotVisible: true }; return n; });
      setRight(prev => { const n = [...prev]; n[pairIdx] = { ...n[pairIdx], dotVisible: true }; return n; });

      let leftDone  = false;
      let rightDone = false;

      const tryNext = () => {
        if (leftDone && rightDone) after(() => typePair(pairIdx + 1), 200);
      };

      // Type left bullet
      for (let i = 1; i <= lText.length; i++) {
        const slice  = lText.slice(0, i);
        const isLast = i === lText.length;
        after(() => {
          setLeft(prev => { const n = [...prev]; n[pairIdx] = { ...n[pairIdx], text: slice }; return n; });
          if (isLast) { leftDone = true; tryNext(); }
        }, i * 30);
      }

      // Type right bullet
      for (let i = 1; i <= rText.length; i++) {
        const slice  = rText.slice(0, i);
        const isLast = i === rText.length;
        after(() => {
          setRight(prev => { const n = [...prev]; n[pairIdx] = { ...n[pairIdx], text: slice }; return n; });
          if (isLast) { rightDone = true; tryNext(); }
        }, i * 30);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          typePair(0);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      tidsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-20">
      <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
      <div className="px-[5%]">
        <h2 className="font-heading font-bold text-teal text-[36px] mb-14">Who this is for</h2>
        <div className="grid gap-8 md:grid-cols-2 items-stretch">

          {/* Left card — young adult */}
          <div style={{ background: '#FFFFFF', border: '2px solid rgba(28,59,58,0.3)', borderRadius: '12px', padding: '28px', height: '100%' }}>
            <h3 className="font-heading font-semibold text-teal text-[26px] mb-3">
              If you&apos;re a young adult between 15 and 30
            </h3>
            <div style={{ width: '100%', height: '1px', background: '#E8924B', opacity: 0.6, marginBottom: '20px' }} aria-hidden="true" />
            <ul className="space-y-5" aria-live="polite">
              {left.map(({ dotVisible, text }, i) =>
                !dotVisible ? null : (
                  <li key={i} className="flex gap-3 items-start" style={{ color: '#1C3B3A', fontSize: '22px', lineHeight: 1.8 }}>
                    {DOT}
                    <span>{text}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right card — parent/caregiver */}
          <div style={{ background: '#FFFFFF', border: '2px solid rgba(28,59,58,0.3)', borderRadius: '12px', padding: '28px', height: '100%' }}>
            <h3 className="font-heading font-semibold text-teal text-[26px] mb-3">
              If you&apos;re a parent, caregiver, or support person
            </h3>
            <div style={{ width: '100%', height: '1px', background: '#E8924B', opacity: 0.6, marginBottom: '20px' }} aria-hidden="true" />
            <ul className="space-y-5 mb-6" aria-live="polite">
              {right.map(({ dotVisible, text }, i) =>
                !dotVisible ? null : (
                  <li key={i} className="flex gap-3 items-start" style={{ color: '#1C3B3A', fontSize: '22px', lineHeight: 1.8 }}>
                    {DOT}
                    <span>{text}</span>
                  </li>
                )
              )}
            </ul>
            <p className="text-teal/55 italic border-l-2 border-teal pl-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              This is a private-pay program. It is not a clinical service, and it is not a substitute for therapy or regulated professional support. It is a recreation-based mentorship program delivered by a recreation professional who has lived a version of this journey herself.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
