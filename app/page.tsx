import HeroSection from './components/HeroSection';
import WhoItIsFor from './components/WhoItIsFor';
import BuildLaunchInquiryForm from './components/BuildLaunchInquiryForm';
import NewsletterCaptureForm from './components/NewsletterCaptureForm';
import { localBusinessSchema, jsonLdHtml } from '@/lib/schema';
import { buildAndLaunchProgram } from '@/lib/program-data';

// Strips the " CAD" suffix from a canonical program-data price string for
// display, since the site's pricing cards show bare dollar amounts.
const cadAmount = (price: string) => price.replace(/\s*CAD$/, '');

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(localBusinessSchema)} />
      <main id="main-content">
        <HeroSection />

        {/* 2. The Gap */}
        <section className="relative overflow-hidden w-full bg-[#1C3B3A] py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="relative z-10 space-y-6">
            <div className="relative" style={{ overflow: 'visible' }}>
              {/* ✦ Sparkle stars — 5 amber, 3 sage */}
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-16px', left: '2%',  fontSize: '22px', color: '#E8924B', '--star-dur': '2.4s', '--star-delay': '0s'   } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-12px', left: '26%', fontSize: '14px', color: '#9BB5A8', '--star-dur': '3.8s', '--star-delay': '1.5s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-10px', left: '55%', fontSize: '28px', color: '#E8924B', '--star-dur': '2.8s', '--star-delay': '0.8s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '6px',   left: '90%', fontSize: '12px', color: '#9BB5A8', '--star-dur': '4.5s', '--star-delay': '2.3s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '28px',  left: '-1%', fontSize: '16px', color: '#9BB5A8', '--star-dur': '2.6s', '--star-delay': '3.0s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-14px', left: '10%', fontSize: '18px', color: '#E8924B', '--star-dur': '3.2s', '--star-delay': '0.4s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-10px', left: '44%', fontSize: '10px', color: '#E8924B', '--star-dur': '1.8s', '--star-delay': '2.8s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: '72%', fontSize: '24px', color: '#E8924B', '--star-dur': '3.6s', '--star-delay': '1.2s' } as React.CSSProperties}>✦</span>
              <h2 className="font-heading font-bold text-white text-[36px]">Where most programs start. And why we don&apos;t.</h2>
            </div>
            <p className="text-white/80 text-[22px] leading-[1.8]">
              Most neurodivergent young adults spend years developing techniques to manage what&apos;s hard. The challenges get all the attention: the strategies, the workarounds, the goals built around overcoming. The strengths? The things that come more naturally, the interests that light something up, the parts of a person that are already ready to grow. Those rarely get the same room.
            </p>
            <p className="text-white/80 text-[22px] leading-[1.8]">
              Build &amp; Launch starts from a different place entirely. Because knowing who you are and what you&apos;re already good at isn&apos;t just feel-good advice. It&apos;s the foundation of a career that actually fits.
            </p>
          </div>
        </section>

        {/* 3. What Build & Launch Is */}
        <section className="relative bg-white py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div>
            <h2 className="font-heading font-bold text-teal text-[36px] mb-8">What Build &amp; Launch is</h2>
            <p className="text-teal/75 text-[22px] leading-[1.8] mb-14">
              Build &amp; Launch is a 4-month, 1-on-1 mentorship and career exploration program that applies therapeutic recreation principles, designed specifically for autistic and neurodivergent young adults ages 15&ndash;30. Every session, every activity, and every goal is built around one person: you. Your interests. Your communication style. Your pace. Your strengths.
            </p>
            {/* Top row — 3 cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "16 weekly 1-on-1 sessions",
                  body: "In-person, approximately 60 minutes each. This is your space: consistent, predictable, and entirely focused on you.",
                },
                {
                  title: buildAndLaunchProgram.structure.groupSessions,
                  body: "Small, closed cohort. One focused on communication in business, one on personalities and selling principles. You'll know exactly what to expect before you arrive.",
                },
                {
                  title: buildAndLaunchProgram.structure.ventureDays,
                  body: "Real-world experience in your community, 4 to 6 hours each. Month 3 you explore with support. Month 4 you lead.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-cream rounded-lg p-7">
                  <h3 className="font-heading font-semibold text-teal text-[26px] mb-3">{card.title}</h3>
                  <p className="text-teal/70 text-[22px] leading-[1.8]">{card.body}</p>
                </div>
              ))}
            </div>
            {/* Bottom row — 2 cards, centered */}
            <div className="grid gap-5 sm:grid-cols-2 mt-5 lg:w-2/3 lg:mx-auto">
              {[
                {
                  title: `Your ${buildAndLaunchProgram.structure.journal}`,
                  body: "Yours from Session 1. Every session adds a page. By the end of the program it becomes a complete portfolio of your ideas, your brand, your strengths, and your story.",
                },
                {
                  title: "An end-of-program celebration",
                  body: "Because finishing something this real deserves to be marked.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-cream rounded-lg p-7">
                  <h3 className="font-heading font-semibold text-teal text-[26px] mb-3">{card.title}</h3>
                  <p className="text-teal/70 text-[22px] leading-[1.8]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. The Four Phases */}
        <section className="relative bg-teal py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div>
            <h2 className="font-heading font-bold text-cream text-[36px] mb-14">The four phases</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {buildAndLaunchProgram.phases.map((phase) => (
                <div key={phase.name} className="phase-card border border-cream/20 rounded-lg p-8">
                  <p className="text-amber text-lg font-medium mb-1 tracking-wide">Month {phase.month}</p>
                  <h3 className="phase-title font-heading font-semibold text-cream text-[26px] mb-3">{phase.name.toUpperCase()}</h3>
                  <p className="phase-tagline text-cream/90 font-medium mb-2 text-[22px] leading-[1.8]">{phase.tagline}</p>
                  <p className="phase-body text-cream/65 text-[22px] leading-[1.8]">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. The Journal */}
        <section className="relative bg-cream py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div>
            <div className="relative" style={{ overflow: 'visible' }}>
              {/* ✦ Sparkle stars — 5 amber, 3 sage */}
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-16px', left: '1%',  fontSize: '20px', color: '#E8924B', '--star-dur': '2.6s', '--star-delay': '0s'   } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-12px', left: '24%', fontSize: '12px', color: '#9BB5A8', '--star-dur': '4.2s', '--star-delay': '1.8s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '-10px', left: '52%', fontSize: '28px', color: '#E8924B', '--star-dur': '3.0s', '--star-delay': '0.6s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '4px',   left: '88%', fontSize: '14px', color: '#9BB5A8', '--star-dur': '4.5s', '--star-delay': '2.5s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', top: '24px',  left: '-1%', fontSize: '18px', color: '#9BB5A8', '--star-dur': '2.2s', '--star-delay': '3.0s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-14px', left: '12%', fontSize: '24px', color: '#E8924B', '--star-dur': '3.4s', '--star-delay': '0.3s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-10px', left: '46%', fontSize: '10px', color: '#E8924B', '--star-dur': '1.8s', '--star-delay': '2.1s' } as React.CSSProperties}>✦</span>
              <span className="star-sparkle" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: '70%', fontSize: '22px', color: '#E8924B', '--star-dur': '3.8s', '--star-delay': '1.4s' } as React.CSSProperties}>✦</span>
              <h2 className="font-heading font-bold text-teal text-[36px] mb-8">The Build &amp; Launch Journal</h2>
            </div>
            <div className="space-y-6 text-teal/75 text-[22px] leading-[1.8]">
              <p>
                From your very first session, you&apos;ll have a journal that&apos;s entirely yours. Every week it grows. An interest map. A strengths profile. Your business concept, your brand, your customer, your story: in your own words, built at your own pace across four months.
              </p>
              <p>
                By the time you reach your end-of-program celebration, it isn&apos;t just a journal anymore. It&apos;s a complete record of who you are, what you built, and where you&apos;re headed. A portfolio you created yourself, from the very first page.
              </p>
              <p>You take it with you when you go.</p>
            </div>
          </div>
        </section>

        <WhoItIsFor />

        {/* 7. About Tamika */}
        <section id="about" className="relative py-20 px-[5%]" style={{ background: '#9BB5A8' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ color: '#F9F4EC', fontSize: '15px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '3.5px', textTransform: 'uppercase' }}>
                  The Person Behind the Program
                </span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '42px', color: '#1C3B3A', marginBottom: '24px', lineHeight: 1.1 }}>
                Tamika Jackson
              </h2>

              {/* Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '22px', lineHeight: 1.8, color: '#F9F4EC' }}>
                  Tamika Jackson is a Recreation Professional with over 15 years of experience building programs that help people discover what they&apos;re capable of.
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '22px', lineHeight: 1.8, color: '#F9F4EC' }}>
                  She didn&apos;t plan for this work. She went to school to be a chemist. But a part-time job at a retirement home quietly changed everything. What she found there felt like something that was made for her.
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '22px', lineHeight: 1.8, color: '#F9F4EC' }}>
                  She is also neurodivergent herself. Build &amp; Launch exists because of that experience. Not despite it.
                </p>
              </div>

              {/* Link */}
              <a
                href="/about"
                style={{ color: '#F9F4EC', fontWeight: 600, textDecoration: 'underline', textDecorationColor: '#E8924B', textUnderlineOffset: '4px' }}
              >
                Read Tamika&apos;s full story &rarr;
              </a>
            </div>

            {/* Right: photo + badge */}
            <div style={{ position: 'relative' }}>
              <img
                src="/tamika.png"
                alt="Tamika Jackson"
                style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/5', display: 'block' }}
              />
              {/* Badge — overlaps bottom-left of photo */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '-16px',
                background: '#1C3B3A',
                borderRadius: '12px',
                padding: '14px 18px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '28px', color: '#E8924B', margin: 0, lineHeight: 1 }}>
                  15+
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontSize: '11px', color: '#F9F4EC', letterSpacing: '1px', margin: 0, marginTop: '6px', textTransform: 'uppercase' }}>
                  years of experience
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 8. The Investment */}
        <section className="relative bg-cream py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div>

            {/* Header */}
            <p className="text-amber uppercase tracking-[3px] text-[14px] font-semibold mb-3">The Investment</p>
            <h2 className="font-heading font-bold text-teal text-[36px] mb-5">
              Build &amp; Launch Program: Founding Family Pricing
            </h2>

            {/* Beta banner */}
            <div className="flex items-center gap-3 bg-teal rounded-full px-5 py-2 mb-5 w-fit">
              <span className="bg-amber text-white text-xs font-bold px-3 py-1 rounded-full">Beta Phase</span>
              <span className="text-cream text-[22px]">These rates are available to our founding families only, not available after launch</span>
            </div>

            {/* Subtext */}
            <p className="text-teal/75 text-[22px] leading-[1.8] mb-10">
              Three paths into the program. Every path starts with Discovery Month: a low-commitment entry point with the right to opt out after Month 1 at no further obligation.
            </p>

            {/* Cards */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-10">

              {/* Card 1 — Discovery Month */}
              <div className="pricing-card flex-1 flex flex-col bg-white border-2 border-sage rounded-xl p-8">
                <span className="bg-sage text-teal text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Try first</span>
                <h3 className="font-heading font-semibold text-teal text-[26px] mb-1">Discovery Month</h3>
                <p className="font-heading font-bold text-teal text-4xl mb-1">{cadAmount(buildAndLaunchProgram.pricing.discoveryMonth.price)}</p>
                <p className="text-teal/60 text-[22px] mb-5">Entry point: Month 1 only</p>
                <hr className="border-sage/30 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "4 weekly 1-on-1 sessions with Tamika",
                    `Your ${buildAndLaunchProgram.structure.journal}, starting Session 1`,
                    "Full Discover phase: strengths, interests, identity",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-teal/80 text-[22px] leading-[1.8]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-sage/10 rounded p-3 text-teal/65 text-[22px] italic mb-6">
                  Opt-out right: exit after Month 1. No further obligation.
                </div>
                <a
                  href="https://www.paypal.com/ncp/payment/HY4KT67VY6T7S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-teal text-teal font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-teal hover:text-cream transition-colors"
                >
                  Start with Discovery Month
                </a>
                <p className="text-teal/50 text-sm text-center mt-2">
                  Secure payment via PayPal
                </p>
                <p className="text-teal/60 text-sm text-center mt-2">
                  Not ready to pay yet?{" "}
                  <a href="#get-started" className="underline hover:text-teal">
                    Start the conversation
                  </a>{" "}
                  instead
                </p>
              </div>

              {/* Card 2 — Full Program Installments (featured) */}
              <div className="pricing-card-featured flex-1 flex flex-col bg-teal rounded-xl p-8">
                <span className="bg-amber text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Founding family rate</span>
                <h3 className="font-heading font-semibold text-cream text-[26px] mb-1">Full Program: Installments</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-heading font-bold text-cream text-4xl">{cadAmount(buildAndLaunchProgram.pricing.fullProgramInstallments.total)}</p>
                  <span className="text-cream/60 text-[22px]">total</span>
                </div>
                <p className="text-sage text-[22px] mb-5">4-month program, paid in stages</p>
                <div className="bg-black/20 border-l-4 border-amber rounded p-4 text-sage text-[22px] leading-[1.8] mb-5">
                  $200 at entry + 3 &times; $433 monthly
                </div>
                <hr className="border-cream/20 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "16 weekly 1-on-1 sessions with Tamika",
                    `${buildAndLaunchProgram.structure.groupSessions} (small closed cohort)`,
                    buildAndLaunchProgram.structure.ventureDays,
                    `${buildAndLaunchProgram.structure.journal}, yours to keep`,
                    buildAndLaunchProgram.structure.closing,
                    "Participation Support Profile reviewed before every session",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-cream text-[22px] leading-[1.8]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-black/20 rounded p-3 text-sage text-[22px] italic mb-6">
                  Opt-out right included: exit after Month 1 with no further obligation.
                </div>
                <a href="#get-started" className="block bg-amber text-white font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-amber/90 transition-colors">
                  Start the conversation
                </a>
              </div>

              {/* Card 3 — Full Program Paid in Full */}
              <div className="pricing-card flex-1 flex flex-col bg-white border-2 border-amber rounded-xl p-8">
                <span className="border border-amber text-amber text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Best value</span>
                <h3 className="font-heading font-semibold text-teal text-[26px] mb-1">Full Program: Paid in Full</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-heading font-bold text-teal text-4xl">{cadAmount(buildAndLaunchProgram.pricing.fullProgramPaidInFull.total)}</p>
                  <span className="text-amber text-[22px]">total</span>
                </div>
                <p className="text-teal/60 text-[22px] mb-5">Save $300 vs. the installment path</p>
                <div className="bg-amber/10 border-l-4 border-amber rounded p-4 text-teal/75 text-[22px] leading-[1.8] mb-5">
                  $200 at entry + $1,000 after Month 1
                </div>
                <hr className="border-amber/30 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Everything in the Installments plan",
                    "Full program locked in after Month 1",
                    "Lowest founding family rate, not available after launch",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-teal/80 text-[22px] leading-[1.8]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-sage/10 rounded p-3 text-teal/65 text-[22px] italic mb-6">
                  Opt-out right included: $200 entry is the only charge until Month 2.
                </div>
                <a href="#get-started" className="block border-2 border-amber text-amber font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-amber hover:text-white transition-colors">
                  Start the conversation
                </a>
              </div>

            </div>

            {/* Footer note */}
            <div className="bg-white border-l-4 border-sage p-5 text-teal/55 text-sm italic leading-relaxed">
              No hidden fees. No materials costs. No surprises. These are founding family rates, available to the first cohort only. This program is not covered by OHIP or insurance. It is a recreation-based mentorship program, not a clinical service.
            </div>

          </div>
        </section>

        {/* Section 9 — Testimonials */}
        <section className="relative py-20 px-[5%] bg-white">
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#E8924B] to-[#1C3B3A]" aria-hidden="true" />
          <div className="mb-4 flex items-center gap-3">
            <div className="w-7 h-[1px] bg-[#E8924B]"></div>
            <p className="text-amber uppercase tracking-[3px] text-[14px] font-semibold">Testimonials</p>
          </div>
          <h2 className="font-montserrat font-bold text-[#1C3B3A] text-[2.5rem] leading-[1.15] mb-8">What participants and families say</h2>
          <p className="text-[22px] leading-[1.8] text-[#1C3B3A] mb-6">Build & Launch is currently welcoming its founding cohort. Testimonials will be shared here as participants move through the program, with their full permission, in their own words.</p>
          <p className="text-[22px] leading-[1.8] text-[#1C3B3A] mb-8">In the meantime, the best way to get a real sense of the program is to join one of our weekly Instagram Live info sessions. Come with questions. Bring your young adult if you'd like. No commitment required.</p>
          <a href="#get-started" className="text-[#1C3B3A] font-semibold underline underline-offset-4 text-[18px]">Fill out the inquiry form to receive your invite link →</a>
        </section>

        {/* Section — Philosophy */}
        <section className="relative py-20 px-[5%] bg-[#F9F4EC]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#E8924B] to-[#1C3B3A]" aria-hidden="true" />
          <p className="text-amber uppercase tracking-[3px] text-[14px] font-semibold mb-10">
            FROM THE BUILD & LAUNCH PHILOSOPHY
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1 — cream */}
            <div className="bg-white border border-[#E8924B] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#E8924B] text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">Strengths first</span>
                <p className="text-[#1C3B3A] text-[18px] leading-[1.8] mb-4">Career planning that starts with what someone can't do isn't career planning. It's a ceiling. Build & Launch starts with what they love, and builds from there.</p>
                <p className="text-[#1C3B3A] text-[18px] leading-[1.8] italic mb-4">And somehow that turns into:</p>
                <ul className="space-y-2">
                  <li className="text-[#1C3B3A] text-[18px] leading-[1.8]"><span className="text-[#E8924B] mr-2">✓</span>Confidence</li>
                  <li className="text-[#1C3B3A] text-[18px] leading-[1.8]"><span className="text-[#E8924B] mr-2">✓</span>A real vision for the future</li>
                  <li className="text-[#1C3B3A] text-[18px] leading-[1.8]"><span className="text-[#E8924B] mr-2">✓</span>Something that's actually theirs</li>
                </ul>
              </div>
              <p className="text-[#9BB5A8] text-[11px] tracking-widest uppercase mt-8 pt-4 border-t border-[#9BB5A8]/30">Tamika Jackson Recreation and Consulting Services</p>
            </div>

            {/* Card 2 — deep teal */}
            <div className="bg-[#1C3B3A] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-white font-bold text-[15px] tracking-widest uppercase mb-6">YOUR YOUNG PERSON DOESN'T NEED ONE MORE WORKSHEET.</p>
                <p className="text-white text-[18px] leading-[1.8]">They need someone who sees their strengths before they see their diagnosis. That's what Build & Launch is for. A 4-month, 1-on-1 recreation-based program designed around who they already are.</p>
              </div>
              <p className="text-[#9BB5A8] text-[11px] tracking-widest uppercase mt-8 pt-4 border-t border-[#9BB5A8]/30">Tamika Jackson Recreation and Consulting Services</p>
            </div>

            {/* Card 3 — deep teal */}
            <div className="bg-[#1C3B3A] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#E8924B] text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">15+ years in recreation</span>
                <p className="text-white text-[18px] leading-[1.8]">15+ years in recreation taught me one thing families never expect to hear: Joy is a valid starting point. When we build from what a person genuinely loves, something shifts. They lean in. They try things. They start to imagine a future that's actually theirs.</p>
              </div>
              <p className="text-[#9BB5A8] text-[11px] tracking-widest uppercase mt-8 pt-4 border-t border-[#9BB5A8]/30">Tamika Jackson Recreation and Consulting Services</p>
            </div>

            {/* Card 4 — cream */}
            <div className="bg-white border border-[#E8924B] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-[#1C3B3A] font-bold text-[15px] tracking-widest uppercase mb-6">IF YOU'VE BEEN TOLD YOUR CHILD ISN'T READY:</p>
                <p className="text-[#1C3B3A] text-[18px] leading-[1.8]">I'd ask: ready by whose definition? Build & Launch meets participants exactly where they are: building confidence, exploring strengths, and taking real steps toward independence. We start with possibility, not limitations.</p>
              </div>
              <p className="text-[#9BB5A8] text-[11px] tracking-widest uppercase mt-8 pt-4 border-t border-[#9BB5A8]/30">Tamika Jackson Recreation and Consulting Services</p>
            </div>

          </div>
        </section>

        {/* 10. Get Started */}
        <section id="get-started" className="relative bg-teal py-20 px-[5%]">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div>
            <h2 className="font-heading font-bold text-cream text-[36px] mb-6">
              Let&apos;s find out if Build &amp; Launch is the right fit
            </h2>
            <p className="text-cream/75 text-[22px] leading-[1.8] mb-12">
              You don&apos;t need to have everything figured out before you reach out. That&apos;s what the conversation is for. Fill out the short form below and Tamika will personally follow up with an invite to the next weekly Instagram Live info session: a free, no-commitment space where you can hear more about the program, ask questions, and get a real sense of whether this is the right fit for you and your family. There&apos;s no sales pitch. No pressure. Just an honest conversation.
            </p>

            <BuildLaunchInquiryForm />

            <div className="border-t border-cream/20 pt-12">
              <h3 className="font-heading font-semibold text-cream text-[26px] mb-3">
                Not ready to fill out a form yet?
              </h3>
              <p className="text-cream/75 text-[22px] leading-[1.8] mb-8">
                Enter your email below to receive weekly Instagram Live invite links. No commitment, no inbox flooding. Just a standing invitation to come when you&apos;re ready.
              </p>
              <NewsletterCaptureForm />
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
