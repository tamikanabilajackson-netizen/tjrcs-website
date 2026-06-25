import HeroSection from './components/HeroSection';
import WhoItIsFor from './components/WhoItIsFor';

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />

        {/* 2. The Gap */}
        <section className="relative overflow-hidden w-full bg-[#1C3B3A] py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="relative z-10 px-[5%] space-y-6">
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
              <h2 className="font-heading font-bold text-white text-[36px]">Where most programs start &mdash; and why we don&apos;t</h2>
            </div>
            <p className="text-white/80 text-xl leading-[1.8]">
              Most neurodivergent young adults spend years developing techniques to manage what&apos;s hard. The challenges get all the attention &mdash; the strategies, the workarounds, the goals built around overcoming. The strengths? The things that come more naturally, the interests that light something up, the parts of a person that are already ready to grow &mdash; those rarely get the same room.
            </p>
            <p className="text-white/80 text-xl leading-[1.8]">
              Build &amp; Launch starts from a different place entirely. Because knowing who you are and what you&apos;re already good at isn&apos;t just feel-good advice. It&apos;s the foundation of a career that actually fits.
            </p>
          </div>
        </section>

        {/* 3. What Build & Launch Is */}
        <section className="relative bg-white py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">
            <h2 className="font-heading font-bold text-teal text-[36px] mb-8">What Build &amp; Launch is</h2>
            <p className="text-teal/75 text-xl leading-[1.8] mb-14">
              Build &amp; Launch is a 4-month, 1:1 mentorship and career exploration program that applies therapeutic recreation principles &mdash; designed specifically for autistic and neurodivergent young adults ages 15&ndash;30. Every session, every activity, and every goal is built around one person: you. Your interests. Your communication style. Your pace. Your strengths.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "16 weekly 1:1 sessions",
                  body: "In-person, approximately 60 minutes each. This is your space — consistent, predictable, and entirely focused on you.",
                },
                {
                  title: "2 virtual group sessions",
                  body: "Small, closed cohort. One focused on communication in business, one on personalities and selling principles. You'll know exactly what to expect before you arrive.",
                },
                {
                  title: "2 Community Venture Days",
                  body: "Real-world experience in your community — 4 to 6 hours each. Month 3 you explore with support. Month 4 you lead.",
                },
                {
                  title: "Your Build & Launch Journal",
                  body: "Yours from Session 1. Every session adds a page. By the end of the program it becomes a complete portfolio of your ideas, your brand, your strengths, and your story.",
                },
                {
                  title: "An end-of-program celebration",
                  body: "Because finishing something this real deserves to be marked.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-cream rounded-lg p-7">
                  <h3 className="font-heading font-semibold text-teal text-[26px] mb-3">{card.title}</h3>
                  <p className="text-teal/70 text-lg leading-[1.7]">{card.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-teal font-medium text-xl">
              $2,000 CAD &mdash; four monthly installments of $500
            </p>
          </div>
        </section>

        {/* 4. The Four Phases */}
        <section className="relative bg-teal py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">
            <h2 className="font-heading font-bold text-cream text-[36px] mb-14">The four phases</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  month: "Month 1",
                  name: "DISCOVER",
                  tagline: "Who you are is where we start.",
                  body: "Before anything gets built, we go deep on what makes you you.",
                },
                {
                  month: "Month 2",
                  name: "BUILD",
                  tagline: "Your idea, your voice, your brand.",
                  body: "You take your strongest idea and make it real.",
                },
                {
                  month: "Month 3",
                  name: "PRACTICE",
                  tagline: "Take it to the community.",
                  body: "This is where the work meets the world.",
                },
                {
                  month: "Month 4",
                  name: "LAUNCH",
                  tagline: "Show the world what you've built.",
                  body: "You lead. You present. You celebrate.",
                },
              ].map((phase) => (
                <div key={phase.name} className="phase-card border border-cream/20 rounded-lg p-8">
                  <p className="text-amber text-lg font-medium mb-1 tracking-wide">{phase.month}</p>
                  <h3 className="phase-title font-heading font-semibold text-cream text-[26px] mb-3">{phase.name}</h3>
                  <p className="phase-tagline text-cream/90 font-medium mb-2">{phase.tagline}</p>
                  <p className="phase-body text-cream/65 text-lg leading-[1.7]">{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. The Journal */}
        <section className="relative bg-cream py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">
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
            <div className="space-y-6 text-teal/75 text-xl leading-[1.8]">
              <p>
                From your very first session, you&apos;ll have a journal that&apos;s entirely yours. Every week it grows. An interest map. A strengths profile. Your business concept, your brand, your customer, your story &mdash; in your own words, built at your own pace across four months.
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
        <section id="about" className="relative" style={{ background: '#9BB5A8', padding: '80px 64px' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span style={{ display: 'inline-block', width: '50px', height: '2px', background: '#F9F4EC', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ color: '#F9F4EC', fontSize: '13px', fontFamily: 'var(--font-lato)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
                  The Person Behind the Program
                </span>
              </div>

              {/* Accent bar */}
              <div style={{ width: '48px', height: '3px', background: '#E8924B', marginBottom: '20px' }} aria-hidden="true" />

              {/* Heading */}
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '42px', color: '#F9F4EC', marginBottom: '24px', lineHeight: 1.1 }}>
                Tamika Jackson
              </h2>

              {/* Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '17px', lineHeight: 1.85, color: '#F9F4EC' }}>
                  Tamika Jackson is a Recreation Professional with over 15 years of experience building programs that help people discover what they&apos;re capable of.
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '17px', lineHeight: 1.85, color: '#F9F4EC' }}>
                  She didn&apos;t plan for this work. She went to school to be a chemist. But a part-time job at a retirement home quietly changed everything &mdash; and what she found there felt like something that was made for her.
                </p>
                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '17px', lineHeight: 1.85, color: '#F9F4EC' }}>
                  She is also neurodivergent herself. Build &amp; Launch exists because of that experience. Not despite it.
                </p>
              </div>

              {/* Link */}
              <a
                href="#about"
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
        <section className="relative bg-cream py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">

            {/* Header */}
            <p className="text-amber uppercase tracking-[3px] text-[14px] font-semibold mb-3">The Investment</p>
            <h2 className="font-heading font-bold text-teal text-[36px] mb-5">
              Build &amp; Launch Program &mdash; Founding Family Pricing
            </h2>

            {/* Beta banner */}
            <div className="flex items-center gap-3 bg-teal rounded-full px-5 py-2 mb-5 w-fit">
              <span className="bg-amber text-white text-xs font-bold px-3 py-1 rounded-full">Beta Phase</span>
              <span className="text-cream text-xl">These rates are available to our founding families only &mdash; not available after launch</span>
            </div>

            {/* Subtext */}
            <p className="text-teal/75 text-xl leading-[1.8] mb-10">
              Three paths into the program. Every path starts with Discovery Month &mdash; a low-commitment entry point with the right to opt out after Month 1 at no further obligation.
            </p>

            {/* Cards */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-10">

              {/* Card 1 — Discovery Month */}
              <div className="pricing-card flex-1 flex flex-col bg-white border-2 border-sage rounded-xl p-8">
                <span className="bg-sage text-teal text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Try first</span>
                <h3 className="font-heading font-semibold text-teal text-[26px] mb-1">Discovery Month</h3>
                <p className="font-heading font-bold text-teal text-4xl mb-1">$200</p>
                <p className="text-teal/60 text-lg mb-5">Entry point &mdash; Month 1 only</p>
                <div className="bg-sage/20 border-l-4 border-sage rounded p-4 text-teal/75 text-lg leading-[1.7] mb-5">
                  Prefer to split it? Pay as 2 &times; $100. Exit after Month 1 with no further obligation.
                </div>
                <hr className="border-sage/30 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "4 weekly 1:1 sessions with Tamika",
                    "Your Build & Launch Journal — starts Session 1",
                    "Full Discover phase — strengths, interests, identity",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-teal/80 text-lg leading-[1.7]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-sage/10 rounded p-3 text-teal/65 text-lg italic mb-6">
                  Opt-out right: exit after Month 1 &mdash; no further obligation.
                </div>
                <a href="#contact" className="block border-2 border-teal text-teal font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-teal hover:text-cream transition-colors">
                  Start with Discovery Month
                </a>
              </div>

              {/* Card 2 — Full Program Installments (featured) */}
              <div className="pricing-card-featured flex-1 flex flex-col bg-teal rounded-xl p-8">
                <span className="bg-amber text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Founding family rate</span>
                <h3 className="font-heading font-semibold text-cream text-[26px] mb-1">Full Program &mdash; Installments</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-heading font-bold text-cream text-4xl">$1,500</p>
                  <span className="text-cream/60 text-lg">total</span>
                </div>
                <p className="text-sage text-lg mb-5">4-month program, paid in stages</p>
                <div className="bg-black/20 border-l-4 border-amber rounded p-4 text-sage text-lg leading-[1.7] mb-5">
                  $200 at entry + 3 &times; $433 monthly
                </div>
                <hr className="border-cream/20 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "16 weekly 1:1 sessions with Tamika",
                    "2 virtual group sessions — small closed cohort",
                    "2 Community Venture Days",
                    "Build & Launch Journal — yours to keep",
                    "End-of-program celebration",
                    "Participation Support Profile reviewed before every session",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-cream text-lg leading-[1.7]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-black/20 rounded p-3 text-sage text-lg italic mb-6">
                  Opt-out right included &mdash; exit after Month 1 with no further obligation.
                </div>
                <a href="#contact" className="block bg-amber text-white font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-amber/90 transition-colors">
                  Start the conversation
                </a>
              </div>

              {/* Card 3 — Full Program Paid in Full */}
              <div className="pricing-card flex-1 flex flex-col bg-white border-2 border-amber rounded-xl p-8">
                <span className="border border-amber text-amber text-xs font-bold px-3 py-1 rounded-full w-fit mb-5">Best value</span>
                <h3 className="font-heading font-semibold text-teal text-[26px] mb-1">Full Program &mdash; Paid in Full</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-heading font-bold text-teal text-4xl">$1,200</p>
                  <span className="text-amber text-lg">total</span>
                </div>
                <p className="text-teal/60 text-lg mb-5">Save $300 vs. the installment path</p>
                <div className="bg-amber/10 border-l-4 border-amber rounded p-4 text-teal/75 text-lg leading-[1.7] mb-5">
                  $200 at entry + $1,000 after Month 1
                </div>
                <hr className="border-amber/30 mb-5" />
                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Everything in the Installments plan",
                    "Full program locked in after Month 1",
                    "Lowest founding family rate — not available after launch",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-teal/80 text-lg leading-[1.7]">
                      <span className="text-amber font-bold shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-sage/10 rounded p-3 text-teal/65 text-lg italic mb-6">
                  Opt-out right included &mdash; $200 entry is the only charge until Month 2.
                </div>
                <a href="#contact" className="block border-2 border-amber text-amber font-semibold text-[17px] py-3 px-6 rounded-lg text-center hover:bg-amber hover:text-white transition-colors">
                  Start the conversation
                </a>
              </div>

            </div>

            {/* Footer note */}
            <div className="bg-white border-l-4 border-sage p-5 text-teal/55 text-sm italic leading-relaxed">
              No hidden fees. No materials costs. No surprises. These are founding family rates &mdash; available to the first cohort only. This program is not covered by OHIP or insurance. It is a recreation-based mentorship program, not a clinical service.
            </div>

          </div>
        </section>

        {/* 9. Testimonials */}
        <section className="relative bg-cream py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">
            <h2 className="font-heading font-bold text-teal text-[36px] mb-8">What participants and families say</h2>
            <div className="space-y-6 text-teal/75 text-xl leading-[1.8] mb-10">
              <p>
                Build &amp; Launch is currently welcoming its founding cohort. Testimonials will be shared here as participants move through the program &mdash; with their full permission, in their own words.
              </p>
              <p>
                In the meantime, the best way to get a real sense of the program is to join one of our weekly Instagram Live info sessions. Come with questions. Bring your young adult if you&apos;d like. No commitment required.
              </p>
            </div>
            <a href="#contact" className="text-teal font-medium hover:underline underline-offset-4">
              Fill out the inquiry form to receive your invite link &rarr;
            </a>
          </div>
        </section>

        {/* 10. Get Started */}
        <section id="contact" className="relative bg-teal py-20">
          <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }} aria-hidden="true" />
          <div className="px-[5%]">
            <h2 className="font-heading font-bold text-cream text-[36px] mb-6">
              Let&apos;s find out if Build &amp; Launch is the right fit
            </h2>
            <p className="text-cream/75 text-xl leading-[1.8] mb-12">
              You don&apos;t need to have everything figured out before you reach out. That&apos;s what the conversation is for. Fill out the short form below and Tamika will personally follow up with an invite to the next weekly Instagram Live info session &mdash; a free, no-commitment space where you can hear more about the program, ask questions, and get a real sense of whether this is the right fit for you and your family. There&apos;s no sales pitch. No pressure. Just an honest conversation.
            </p>

            <form className="space-y-6 mb-16">
              <div>
                <label htmlFor="inquiry-name" className="block text-cream text-lg font-medium mb-2">Name</label>
                <input
                  id="inquiry-name"
                  type="text"
                  className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="block text-cream text-lg font-medium mb-2">Email</label>
                <input
                  id="inquiry-email"
                  type="email"
                  className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="inquiry-role" className="block text-cream text-lg font-medium mb-2">Who is inquiring</label>
                <select id="inquiry-role" className="w-full bg-white/10 border border-cream/25 text-cream rounded-md px-4 py-3 focus:border-cream/55 transition-colors appearance-none cursor-pointer">
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
                  className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="Instagram, word of mouth, etc."
                />
              </div>
              <button
                type="submit"
                className="bg-amber text-white font-semibold text-[17px] px-8 py-4 rounded-md hover:bg-amber/90 transition-colors"
              >
                Send my inquiry
              </button>
            </form>

            <div className="border-t border-cream/20 pt-12">
              <h3 className="font-heading font-semibold text-cream text-[26px] mb-3">
                Not ready to fill out a form yet?
              </h3>
              <p className="text-cream/75 text-xl leading-[1.8] mb-8">
                Enter your email below to receive weekly Instagram Live invite links &mdash; no commitment, no inbox flooding. Just a standing invitation to come when you&apos;re ready.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  aria-label="First name"
                  className="flex-1 bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="First name"
                />
                <input
                  type="email"
                  aria-label="Email address"
                  className="flex-1 bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="Email address"
                />
                <button
                  type="submit"
                  className="bg-amber text-white font-semibold text-[17px] px-6 py-3 rounded-md hover:bg-amber/90 transition-colors whitespace-nowrap"
                >
                  Keep me in the loop
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
