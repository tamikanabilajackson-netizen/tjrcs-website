import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Tamika Jackson — Build & Launch | TJRCS',
  description:
    'Learn about Tamika Jackson, Recreation Professional and founder of Build & Launch — a strengths-first career exploration program for autistic and neurodivergent young adults.',
};

export default function AboutPage() {
  return (
    <main id="main-content">

      {/* ── 1. Hero / Opening ── bg-cream ───────────────────────────────── */}
      <section
        aria-label="Introduction"
        className="relative overflow-hidden bg-[#F9F4EC] py-20"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%]">
          <h1
            className="font-heading font-bold text-teal"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.15, marginBottom: '16px' }}
          >
            I&apos;m Tamika Jackson.
          </h1>
          <p
            className="font-heading text-teal"
            style={{ fontWeight: 600, fontSize: 'clamp(20px, 2.8vw, 28px)', lineHeight: 1.4, marginBottom: '32px' }}
          >
            A Recreation Professional, a founder, and someone who spent most of her life being told, in one way or another, what she needed to fix about herself.
          </p>
          <div
            aria-hidden="true"
            style={{ width: '40px', height: '2px', background: '#E8924B', marginBottom: '32px' }}
          />
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            Build &amp; Launch exists because I decided to stop building programs around what&apos;s hard. And started building one around what&apos;s already there.
          </p>
        </div>
      </section>

      {/* ── 2. The Origin ── bg-white ───────────────────────────────────── */}
      <section
        aria-label="The origin story"
        className="relative overflow-hidden bg-white py-20"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ color: '#E8924B', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              The origin
            </span>
          </div>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I didn&apos;t plan to do this work.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I went to school to be a chemist. First at college for chemical engineering technology, then university in Toronto to complete my degree. I had a plan. I had a path.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            While I was finishing that degree, I took a part-time job at a retirement home, just to pay the bills. When I graduated and the chemistry positions weren&apos;t coming, my manager asked me a question I wasn&apos;t expecting.
          </p>

          {/* Pullquote 1 — large, cream background */}
          <blockquote style={{ borderLeft: '3px solid #E8924B', background: '#F9F4EC', padding: '24px 32px', borderRadius: '0 8px 8px 0' }}>
            <p className="font-heading font-bold text-teal text-[26px]" style={{ lineHeight: 1.35, marginBottom: '12px' }}>
              &ldquo;Would you like to be an activity assistant?&rdquo;
            </p>
            <p style={{ fontFamily: 'var(--font-lato)', fontStyle: 'italic', fontSize: '16px', color: '#9BB5A8', margin: 0 }}>
              a question that changed everything
            </p>
          </blockquote>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            I said no. I told her I was a chemistry graduate. I had plans. She looked at me with the patience of someone who already knew the answer and said:
          </p>

          {/* Pullquote 2 — smaller inline, amber italic */}
          <blockquote style={{ borderLeft: '3px solid #E8924B', paddingLeft: '20px' }}>
            <p style={{ fontFamily: 'var(--font-lato)', fontStyle: 'italic', fontSize: '20px', color: '#E8924B', lineHeight: 1.5, margin: 0 }}>
              &ldquo;But you don&apos;t have a job. And in the meantime, you can make extra money.&rdquo;
            </p>
          </blockquote>

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            So I said yes.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            That moment changed everything. I found something in that role I hadn&apos;t expected to find anywhere, something intrinsically valuable. A way of working that took everything I loved about life, all of my ideas, all of who I am as a person, and wrapped it into one purpose.
          </p>

          {/* Pullquote 3 — large, cream background */}
          <blockquote style={{ borderLeft: '3px solid #E8924B', background: '#F9F4EC', padding: '24px 32px', borderRadius: '0 8px 8px 0' }}>
            <p className="font-heading font-bold text-teal text-[26px]" style={{ lineHeight: 1.35, margin: 0 }}>
              &ldquo;It felt like it was made for me.&rdquo;
            </p>
          </blockquote>

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
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ color: '#E8924B', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
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

          {/* Sage rule */}
          <hr aria-hidden="true" style={{ width: '60px', height: '1px', background: '#9BB5A8', border: 'none' }} />

          <p className="text-teal/75 text-[22px] leading-[1.8]">
            And then AI came into my life. And something shifted.
          </p>
          <p className="text-teal/75 text-[22px] leading-[1.8]">
            For the first time, I had a tool that could meet me where I actually was. I could speak my ideas, even when they weren&apos;t perfectly organized, even when the words didn&apos;t come out in the order I meant them, and have them shaped into something the world could see. My thoughts. My dreams. My voice. Without having to first pass them through every workaround I&apos;d spent years building.
          </p>

          {/* Large pullquote */}
          <blockquote style={{ borderLeft: '3px solid #E8924B', paddingLeft: '24px' }}>
            <p className="font-heading font-bold text-teal text-[26px]" style={{ lineHeight: 1.4, margin: 0 }}>
              It didn&apos;t fix anything. It removed a barrier I&apos;d been quietly working around my whole life.
            </p>
          </blockquote>

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
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ color: '#F9F4EC', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              Why Build &amp; Launch
            </span>
          </div>

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

          {/* Large pullquote — amber on dark */}
          <blockquote style={{ borderLeft: '3px solid #E8924B', paddingLeft: '24px' }}>
            <p className="font-heading font-bold text-[26px]" style={{ color: '#E8924B', lineHeight: 1.4, margin: 0 }}>
              That&apos;s the thing I had to find my own way to. I wanted to build the door.
            </p>
          </blockquote>

        </div>
      </section>

      {/* ── 5. How She Works ── bg-white ────────────────────────────────── */}
      <section
        aria-label="How Tamika works"
        className="relative overflow-hidden bg-white py-20"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#E8924B', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ color: '#E8924B', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
              How she works
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
        <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
        <div className="px-[5%] space-y-6">

          <div className="flex items-center gap-3 mb-5">
            <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ color: '#F9F4EC', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
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
