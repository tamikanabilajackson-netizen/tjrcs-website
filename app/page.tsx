export default function Home() {
  return (
    <>
      <main id="main-content">
        {/* 1. Hero */}
        <section className="bg-cream py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-heading font-bold text-teal text-2xl mb-3">
              Build &amp; Launch
            </div>
            <h1 className="font-heading font-bold text-teal text-5xl leading-tight mb-8">
              Your future doesn&apos;t have to look like everyone else&apos;s. Let&apos;s build the one that fits you.
            </h1>
            <p className="text-teal/75 text-xl leading-relaxed mb-12 max-w-3xl">
              A 4-month recreation-based entrepreneurship and career exploration program for autistic and neurodivergent young adults &mdash; 1:1, strengths-based, and designed around you from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-block bg-teal text-cream font-medium px-8 py-4 rounded-md text-center hover:bg-teal/90 transition-colors"
              >
                Find out if this is for you
              </a>
              <a
                href="#contact"
                className="inline-block border-2 border-teal text-teal font-medium px-8 py-4 rounded-md text-center hover:bg-teal hover:text-cream transition-colors"
              >
                Join an info session
              </a>
            </div>
          </div>
        </section>

        {/* 2. The Gap */}
        <section className="bg-cream border-t border-sage/25 py-24 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-teal/75 text-lg leading-relaxed">
              Most neurodivergent young adults spend years developing techniques to manage what&apos;s hard. The challenges get all the attention &mdash; the strategies, the workarounds, the goals built around overcoming. The strengths? The things that come more naturally, the interests that light something up, the parts of a person that are already ready to grow &mdash; those rarely get the same room.
            </p>
            <p className="text-teal/75 text-lg leading-relaxed">
              Build &amp; Launch starts from a different place entirely. Because knowing who you are and what you&apos;re already good at isn&apos;t just feel-good advice. It&apos;s the foundation of a career that actually fits.
            </p>
          </div>
        </section>

        {/* 3. What Build & Launch Is */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-teal text-4xl mb-8">What Build &amp; Launch is</h2>
            <p className="text-teal/75 text-lg leading-relaxed mb-14 max-w-3xl">
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
                  <h3 className="font-heading font-bold text-teal text-lg mb-3">{card.title}</h3>
                  <p className="text-teal/70 text-base leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-teal font-medium text-lg">
              $2,000 CAD &mdash; four monthly installments of $500
            </p>
          </div>
        </section>

        {/* 4. The Four Phases */}
        <section className="bg-teal py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-cream text-4xl mb-14">The four phases</h2>
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
                <div key={phase.name} className="border border-cream/20 rounded-lg p-8">
                  <p className="text-amber text-sm font-medium mb-1 tracking-wide">{phase.month}</p>
                  <h3 className="font-heading font-bold text-cream text-2xl mb-3">{phase.name}</h3>
                  <p className="text-cream/90 font-medium mb-2">{phase.tagline}</p>
                  <p className="text-cream/65 text-base leading-relaxed">{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. The Journal */}
        <section className="bg-cream py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-teal text-4xl mb-8">The Build &amp; Launch Journal</h2>
            <div className="space-y-6 text-teal/75 text-lg leading-relaxed">
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

        {/* 6. Who This Is For */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-teal text-4xl mb-14">Who this is for</h2>
            <div className="grid gap-14 md:grid-cols-2">
              <div>
                <h3 className="font-heading font-bold text-teal text-xl mb-7">
                  If you&apos;re a young adult between 15 and 30
                </h3>
                <ul className="space-y-5">
                  {[
                    "You're autistic, neurodivergent, or identify that way — with or without a formal diagnosis",
                    "You've spent more time working around your challenges than building on your strengths",
                    "You want a space that's consistent, predictable, and genuinely built around who you are",
                    "You're ready to explore what a career could look like on your own terms",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-teal/75 leading-relaxed">
                      <span className="text-amber shrink-0 mt-0.5 font-bold">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-bold text-teal text-xl mb-7">
                  If you&apos;re a parent, caregiver, or support person
                </h3>
                <div className="space-y-4 text-teal/75 leading-relaxed">
                  <p>
                    You want something that takes your young adult seriously &mdash; not a program that manages them, but one that genuinely invests in who they are and where they&apos;re going.
                  </p>
                  <p>
                    Build &amp; Launch is structured, professionally delivered, and grounded in therapeutic recreation principles. Every session follows a consistent format. Nothing significant happens without advance notice. And your young adult is supported at every stage.
                  </p>
                  <p className="text-teal/55 text-sm italic border-l-2 border-sage pl-4 mt-6">
                    This is a private-pay program. It is not a clinical service, and it is not a substitute for therapy or regulated professional support. It is a recreation-based mentorship program delivered by a recreation professional who has lived a version of this journey herself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. About Tamika */}
        <section id="about" className="bg-sage py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-teal text-4xl mb-8">The person behind the program</h2>
            <div className="space-y-6 text-teal/85 text-lg leading-relaxed mb-10">
              <p>
                Tamika Jackson is a Recreation Professional with over 15 years of experience building programs that help people discover what they&apos;re capable of.
              </p>
              <p>
                She didn&apos;t plan for this work. She went to school to be a chemist. But a part-time job at a retirement home quietly changed everything.
              </p>
              <p>
                She is also neurodivergent herself. Build &amp; Launch exists because of that experience. Not despite it.
              </p>
              <p>
                Tamika built this program for the young adults who are still living what she lived &mdash; and to give them something she had to find her own way to: a space that starts with who they are, not what they need to overcome.
              </p>
            </div>
            <a href="#about" className="text-teal font-medium hover:underline underline-offset-4">
              Read Tamika&apos;s full story &rarr;
            </a>
          </div>
        </section>

        {/* 8. The Investment */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-teal text-4xl mb-6">The investment</h2>
            <p className="text-teal/75 text-lg leading-relaxed mb-12">
              Build &amp; Launch is a private-pay program. The full program fee is $2,000 CAD, paid in four monthly installments of $500.
            </p>
            <h3 className="font-heading font-bold text-teal text-xl mb-6">What&apos;s included:</h3>
            <ul className="space-y-5 mb-12">
              {[
                "16 weekly 1:1 sessions with Tamika — in person, approximately 60 minutes each",
                "2 virtual group sessions with a small closed cohort",
                "2 Community Venture Days — real-world experience with guided support",
                "Your Build & Launch Journal — yours from Session 1, yours to keep",
                "An end-of-program celebration marking everything you've built",
                "A recreation professional who reviews your Participation Support Profile before every single session and adapts accordingly",
              ].map((item) => (
                <li key={item} className="flex gap-4 text-teal/75 leading-relaxed">
                  <span className="text-amber shrink-0 font-bold mt-0.5">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-teal/55 text-sm leading-relaxed italic border-l-2 border-sage pl-4">
              There are no hidden fees. No additional materials costs. No surprises. This program is not covered by OHIP or insurance. It is not a clinical service. It is a recreation-based mentorship program.
            </p>
          </div>
        </section>

        {/* 9. Testimonials */}
        <section className="bg-cream py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-teal text-4xl mb-8">What participants and families say</h2>
            <div className="space-y-6 text-teal/75 text-lg leading-relaxed mb-10">
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
        <section id="contact" className="bg-teal py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-cream text-4xl mb-6">
              Let&apos;s find out if Build &amp; Launch is the right fit
            </h2>
            <p className="text-cream/75 text-lg leading-relaxed mb-12">
              You don&apos;t need to have everything figured out before you reach out. That&apos;s what the conversation is for. Fill out the short form below and Tamika will personally follow up with an invite to the next weekly Instagram Live info session &mdash; a free, no-commitment space where you can hear more about the program, ask questions, and get a real sense of whether this is the right fit for you and your family. There&apos;s no sales pitch. No pressure. Just an honest conversation.
            </p>

            <form className="space-y-6 mb-16">
              <div>
                <label htmlFor="inquiry-name" className="block text-cream text-sm font-medium mb-2">Name</label>
                <input
                  id="inquiry-name"
                  type="text"
                  className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="block text-cream text-sm font-medium mb-2">Email</label>
                <input
                  id="inquiry-email"
                  type="email"
                  className="w-full bg-white/10 border border-cream/25 text-cream placeholder:text-cream/35 rounded-md px-4 py-3 focus:border-cream/55 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="inquiry-role" className="block text-cream text-sm font-medium mb-2">Who is inquiring</label>
                <select id="inquiry-role" className="w-full bg-white/10 border border-cream/25 text-cream rounded-md px-4 py-3 focus:border-cream/55 transition-colors appearance-none cursor-pointer">
                  <option value="" className="text-teal bg-white">Select one</option>
                  <option value="young-adult" className="text-teal bg-white">I&apos;m a young adult interested in the program</option>
                  <option value="parent" className="text-teal bg-white">I&apos;m a parent or caregiver</option>
                  <option value="together" className="text-teal bg-white">We&apos;re reaching out together</option>
                </select>
              </div>
              <div>
                <label htmlFor="inquiry-about" className="block text-cream text-sm font-medium mb-2">
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
                <label htmlFor="inquiry-referral" className="block text-cream text-sm font-medium mb-2">
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
                className="bg-amber text-white font-medium px-8 py-4 rounded-md hover:bg-amber/90 transition-colors"
              >
                Send my inquiry
              </button>
            </form>

            <div className="border-t border-cream/20 pt-12">
              <h3 className="font-heading font-bold text-cream text-2xl mb-3">
                Not ready to fill out a form yet?
              </h3>
              <p className="text-cream/75 text-lg leading-relaxed mb-8">
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
                  className="bg-amber text-white font-medium px-6 py-3 rounded-md hover:bg-amber/90 transition-colors whitespace-nowrap"
                >
                  Keep me in the loop
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cream border-t border-sage/30 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-teal text-sm">
            &copy; 2026 Tamika Jackson Recreation and Consulting Services | Vaughan, Ontario | Recreation That Connects
          </p>
        </div>
      </footer>
    </>
  );
}
