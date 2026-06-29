'use client';

import { useEffect, useState } from 'react';

export default function AboutContent() {

  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const heroText = 'A Recreation Professional, a founder.';
    const heroEl = document.getElementById('hero-typewriter');

    if (heroEl) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        heroEl.textContent = heroText;
        setCursorVisible(false);
        return;
      }

      const typeLoop = () => {
        let i = 0;
        heroEl.textContent = '';
        setCursorVisible(true);

        const typing = () => {
          if (i < heroText.length) {
            i++;
            heroEl.textContent = heroText.slice(0, i);
            setTimeout(typing, 120);
          } else {
            setTimeout(() => {
              setCursorVisible(false);
              setTimeout(() => {
                setCursorVisible(true);
                let j = heroText.length;
                const erasing = () => {
                  if (j > 0) {
                    j--;
                    heroEl.textContent = heroText.slice(0, j);
                    setTimeout(erasing, 55);
                  } else {
                    setCursorVisible(false);
                    setTimeout(typeLoop, 600);
                  }
                };
                erasing();
              }, 2700);
            }, 800);
          }
        };
        typing();
      };

      typeLoop();
    }

    const quotes = [
      { id: 'quote-a', cursorId: 'cursor-a', text: 'It felt like it was made for me.' },
      {
        id: 'quote-b',
        cursorId: 'cursor-b',
        text: "It didn't fix anything. It removed a barrier I'd been quietly working around my whole life.",
      },
      {
        id: 'quote-c',
        cursorId: 'cursor-c',
        text: "That's the thing I had to find my own way to. I wanted to build the door.",
      },
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    quotes.forEach(({ id, cursorId, text }) => {
      const el = document.getElementById(id);
      const cursor = document.getElementById(cursorId);
      if (!el || !cursor) return;

      if (prefersReducedMotion) {
        el.textContent = text;
        cursor.style.display = 'none';
        return;
      }

      cursor.style.opacity = '0';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              cursor.style.opacity = '1';
              cursor.style.animation = 'blink 0.75s step-end infinite';
              let i = 0;
              const tick = () => {
                if (i <= text.length) {
                  el.textContent = text.slice(0, i);
                  i++;
                  setTimeout(tick, 45);
                }
              };
              tick();
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(el);
    });
  }, []);

  return (
    <main id="main-content">

      {/* ── 1. Hero / Opening ── bg-cream ───────────────────────────────── */}
      <section
        aria-label="Introduction"
        className="relative overflow-hidden bg-[#F9F4EC] pt-20 pb-10 px-[5%]"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />

{/* Headline */}
        <h1
          className="font-heading"
          style={{ fontWeight: 800, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', lineHeight: 1.12, color: '#1C3B3A', letterSpacing: '-0.5px', marginBottom: '32px' }}
        >
          I&apos;m Tamika Jackson.<br />
          <span style={{ display: 'block', color: '#E8924B', minHeight: '1.12em', fontSize: 'clamp(2.02rem, 3.96vw, 3.96rem)', lineHeight: 1.12 }}>
            <span id="hero-typewriter"></span>{cursorVisible && (
              <span style={{
                display: 'inline-block',
                width: '3px',
                height: '0.85em',
                background: '#E8924B',
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink 0.75s step-end infinite',
              }} aria-hidden="true" />
            )}
          </span>
        </h1>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 300, fontSize: '22px', lineHeight: 1.8, color: '#3a4a3a', maxWidth: '680px', marginBottom: 0 }}>
            And someone who spent most of her life being told, in one way or another, what she needed to fix about herself.
          </p>
          <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 300, fontSize: '22px', lineHeight: 1.8, color: '#3a4a3a', maxWidth: '680px', marginBottom: 0 }}>
            Build &amp; Launch exists because I decided to stop building programs around what&apos;s hard. And started building one around what&apos;s already there.
          </p>
        </div>


      </section>

      {/* ── 2. The Origin ── bg-white ───────────────────────────────────── */}
      <section
        aria-label="The origin story"
        className="relative overflow-hidden bg-white py-20"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />
        <div className="px-[5%] space-y-6">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ color: '#E8924B', fontSize: '16px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              The origin
            </span>
          </div>

          {/* Two-column grid: body content left, photo right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div className="space-y-6">
              <p className="text-teal/75 text-[22px] leading-[1.8]">
                I didn&apos;t plan to do this work.
              </p>
              <p className="text-teal/75 text-[22px] leading-[1.8]">
                I went to school to be a chemist. First at college for chemical engineering technology, then university in Toronto to complete my degree. I had a plan. I had a path.
              </p>
              <p className="text-teal/75 text-[22px] leading-[1.8]">
                While I was finishing that degree, I took a part-time job at a retirement home, just to pay the bills. When I graduated and the chemistry positions weren&apos;t coming, my manager asked me a question I wasn&apos;t expecting.
              </p>

              {/* Pullquote 1 */}
              <blockquote style={{ background: '#F9F4EC', borderLeft: '3px solid #E8924B', padding: '24px 32px', margin: '28px 0' }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '22px', color: '#1C3B3A', lineHeight: 1.4, fontStyle: 'normal', margin: 0 }}>
                  &ldquo;Would you like to be an activity assistant?&rdquo;
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontStyle: 'italic', fontSize: '16px', color: '#9BB5A8', margin: 0, marginTop: '10px' }}>
                  a question that changed everything
                </p>
              </blockquote>

              <p className="text-teal/75 text-[22px] leading-[1.8]">
                I said no. I told her I was a chemistry graduate. I had plans. She looked at me with the patience of someone who already knew the answer and said:
              </p>

              {/* Pullquote 2 */}
              <blockquote style={{ background: '#F9F4EC', borderLeft: '3px solid #E8924B', padding: '24px 32px', margin: '28px 0' }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '22px', color: '#1C3B3A', lineHeight: 1.4, fontStyle: 'normal', margin: 0 }}>
                  &ldquo;But you don&apos;t have a job. And in the meantime, you can make extra money.&rdquo;
                </p>
              </blockquote>

              <p className="text-teal/75 text-[22px] leading-[1.8]">
                So I said yes.
              </p>
              <p className="text-teal/75 text-[22px] leading-[1.8]">
                That moment changed everything. I found something in that role I hadn&apos;t expected to find anywhere, something intrinsically valuable. A way of working that took everything I loved about life, all of my ideas, all of who I am as a person, and wrapped it into one purpose.
              </p>
            </div>

            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tamika-painting.png"
              alt="Tamika Jackson leading a watercolour painting session"
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', aspectRatio: '4/5', display: 'block' }}
            />
          </div>

          {/* Variation A — typewriter quote */}
          <div style={{
            position: 'relative',
            background: '#1C3B3A',
            borderRadius: '10px',
            padding: '32px 40px',
            overflow: 'hidden',
            marginTop: '16px',
          }}>
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: '4px',
              background: '#E8924B',
            }} />
            <p style={{ margin: 0 }}>
              <span id="quote-a" style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 700,
                fontSize: '32px',
                color: '#F9F4EC',
                lineHeight: 1.35
              }}></span><span id="cursor-a" style={{
                display: 'inline-block',
                width: '3px',
                height: '0.85em',
                background: '#F9F4EC',
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink 0.75s step-end infinite',
                opacity: 0,
              }} aria-hidden="true"></span>
            </p>
          </div>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I&apos;ve spent more than 15 years since then building programs that help people discover what they&apos;re capable of, applying therapeutic recreation principles across senior care and community settings. And somewhere along the way, I stopped thinking of this work as something I fell into. I started thinking of it as something I was guided toward.
          </p>

        </div>
      </section>

      {/* ── 3. The Neurodivergent Thread ── bg-cream ────────────────────── */}
      <section
        aria-label="The neurodivergent thread"
        className="relative overflow-hidden bg-[#F9F4EC] py-20"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />
        <div className="px-[5%] space-y-6">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ color: '#E8924B', fontSize: '16px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              The neurodivergent thread
            </span>
          </div>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I&apos;m also neurodivergent myself. And for most of my life, I didn&apos;t talk about that.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            Not because I was ashamed of it. But because the conversation around neurodivergence, in my experience, almost always went the same direction. Toward what was hard. Toward the challenges, the workarounds, the techniques for managing the things that didn&apos;t come easily.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I spent years getting very good at exactly that: managing. Developing coping strategies. Compensating. Making sure nobody could see the places where things were harder for me than they looked.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            What I didn&apos;t do, what almost nobody encouraged me to do, was pay the same attention to my strengths. The things that came more naturally. The interests that lit something up. The parts of me that were already ready to grow. Those didn&apos;t get the same room.
          </p>

          <hr aria-hidden="true" style={{ width: '60px', height: '1px', background: '#9BB5A8', border: 'none' }} />

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            And then AI came into my life. And something shifted.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            For the first time, I had a tool that could meet me where I actually was. I could speak my ideas, even when they weren&apos;t perfectly organized, even when the words didn&apos;t come out in the order I meant them, and have them shaped into something the world could see. My thoughts. My dreams. My voice. Without having to first pass them through every workaround I&apos;d spent years building.
          </p>

          {/* Variation B — split amber/image panel */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderRadius: '10px',
            overflow: 'hidden',
            minHeight: '400px',
          }}>
            <div style={{
              background: '#E8924B',
              padding: '32px',
              paddingTop: '40px',
              paddingBottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 800,
                fontSize: '28px',
                color: 'rgba(255,255,255,0.2)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>&ldquo;</div>
              <p style={{ margin: 0 }}>
                <span id="quote-b" style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 800,
                  fontSize: '36px',
                  color: '#fff',
                  lineHeight: 1.4,
                }}></span><span id="cursor-b" style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: '#fff',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                }}></span>
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tamika-listening.png"
              alt="Tamika Jackson in a one-on-one conversation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            And when I felt what that was like. I knew immediately who else needed to feel it.
          </p>

        </div>
      </section>

      {/* ── 4. Why Build & Launch ── bg-teal ────────────────────────────── */}
      <section
        aria-label="Why Build and Launch exists"
        className="relative overflow-hidden bg-[#1C3B3A] py-20"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />
        <div className="px-[5%] space-y-6">

          {/* Eyebrow — cream on dark */}
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ color: '#F9F4EC', fontSize: '16px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              Why Build &amp; Launch
            </span>
          </div>

          {/* Two-column grid: photo left, body paragraphs right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tamika-teaching.png"
              alt="Tamika Jackson working alongside a participant at a screen"
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', aspectRatio: '4/5', display: 'block' }}
            />
            <div className="space-y-6">
              <p className="text-white/80 text-[22px] leading-[1.8]">
                I built Build &amp; Launch for the young adults who are still living what I lived.
              </p>
              <p className="text-white/80 text-[22px] leading-[1.8]">
                The ones whose challenges have gotten all the attention: the IEPs, the accommodations, the strategies, the goals built around overcoming. The ones whose strengths, interests, and natural abilities have been noted and then quietly set aside in favour of what needs to be managed.
              </p>
              <p className="text-white/80 text-[22px] leading-[1.8]">
                I wanted to build the program I wish had existed for me. Not one that starts with what&apos;s hard and works backward. One that starts with who you already are and builds forward from there.
              </p>
              <p className="text-white/80 text-[22px] leading-[1.8]">
                The business is the framework. The career exploration is the vehicle. But what Build &amp; Launch is really about, underneath all of it, is giving a young adult the experience of being seen for what they&apos;re capable of, not just what they&apos;re working on.
              </p>
            </div>
          </div>

          {/* Variation C — ghost-number layout */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            padding: '24px 0',
            borderTop: '1px solid rgba(249,244,236,0.15)',
            borderBottom: '1px solid rgba(249,244,236,0.15)',
          }}>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              fontSize: '72px',
              color: '#F9F4EC',
              lineHeight: 1,
              opacity: 0.12,
              flexShrink: 0,
              userSelect: 'none',
            }}>&ldquo;</div>
            <div style={{ paddingTop: '6px' }}>
              <p style={{ margin: 0 }}>
                <span id="quote-c" style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 700,
                  fontSize: '36px',
                  color: '#E8924B',
                  lineHeight: 1.4
                }}></span><span id="cursor-c" style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.85em',
                  background: '#E8924B',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  opacity: 0,
                }} aria-hidden="true"></span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. How She Works ── bg-white ────────────────────────────────── */}
      <section
        aria-label="How Tamika works"
        className="relative overflow-hidden bg-white py-20"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ color: '#E8924B', fontSize: '16px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              How Build &amp; Launch Works
            </span>
          </div>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            Every participant who comes into Build &amp; Launch gets a program that is genuinely built around them.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            Not adapted from a generic template. Not modified to accommodate differences. Built from the first session around their strengths, their communication style, their interests, and their pace.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            Before every session, I review what I know about each participant and adjust accordingly. The structure stays consistent, because predictability matters, and I know firsthand what session-entry anxiety feels like, but the content is entirely theirs.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I&apos;m not here to tell anyone what their future should look like. I&apos;m here to help them figure out what fits, and then build the skills and confidence to move toward it.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            That&apos;s what applying therapeutic recreation principles well actually looks like in practice.
          </p>

        </div>
      </section>

      {/* ── 6. Sign-off / CTA ── bg-teal ────────────────────────────────── */}
      <section
        aria-label="Continue the conversation"
        className="relative overflow-hidden bg-[#1C3B3A] py-20"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ color: '#F9F4EC', fontSize: '16px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              Let&apos;s continue the conversation
            </span>
          </div>

          <p className="text-white/80 text-[22px] leading-[1.8]">
            If you&apos;ve read this far, whether you&apos;re a young adult wondering if this is for you or a parent trying to figure out if Tamika is the right person to trust, I&apos;d love to continue the conversation.
          </p>
          <p className="text-white/80 text-[22px] leading-[1.8]">
            Come to an Instagram Live session. Bring your questions. Bring your young adult if you&apos;d like.
          </p>
          <p className="text-white/80 text-[22px] leading-[1.8]">
            No pressure. No pitch. Just an honest conversation about whether Build &amp; Launch is the right fit for where you are right now.
          </p>

          <div>
            <a
              href="/contact"
              className="inline-block bg-[#E8924B] text-white font-semibold text-[17px] px-8 py-4 rounded-md hover:bg-[#d4793a] transition-colors"
            >
              Fill out the inquiry form
            </a>
          </div>

          <p style={{ fontFamily: 'var(--font-lato)', fontSize: '14px', color: '#9BB5A8', lineHeight: 1.8 }}>
            Or join a weekly Instagram Live info session, no sign-up required.
          </p>

        </div>
      </section>

    </main>
  );
}
