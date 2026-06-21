'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  // Sparkle positions around the text
  const sparkles = [
    { x: -20, y: -10, delay: 0 },
    { x: -30, y: 15, delay: 1.2 },
    { x: 'calc(100% + 10px)', y: -5, delay: 0.8 },
    { x: 'calc(100% + 20px)', y: 20, delay: 2 },
  ];

  return (
    <section className="bg-cream pb-28 pt-2">
      {/* Illustration - full width edge to edge */}
      <figure className="m-0 w-full mb-12">
        {/* Desktop image */}
        <img
          src="/hero-desktop.svg"
          alt="Line art illustration of a brain, botanical elements, and people connecting, representing the Recreation That Connects brand."
          className="w-full h-auto md:h-[550px] hidden md:block"
        />
        {/* Mobile image */}
        <img
          src="/hero-mobile.svg"
          alt="Line art illustration of a brain, botanical elements, and people connecting, representing the Recreation That Connects brand."
          className="w-full h-auto md:hidden"
        />
      </figure>

      {/* Copy section - with padding and centered */}
      <div className="px-6">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow with sparkles */}
          <div className="relative inline-block mb-3">
            <div className="font-heading font-bold text-teal text-3xl">
              The Build &amp; Launch Program
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none sparkle-animation" aria-hidden="true">
              {sparkles.map((sparkle, index) => (
                <motion.span
                  key={index}
                  className="absolute text-[#E8924B] text-2xl select-none"
                  style={{
                    left: sparkle.x,
                    top: sparkle.y,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: sparkle.delay,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.span>
              ))}
            </div>
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
              className="inline-block bg-teal text-cream font-bold text-lg px-8 py-4 rounded-md text-center hover:bg-teal/90 transition-colors"
            >
              Find out if this is for you
            </a>
            <a
              href="#contact"
              className="inline-block border-2 border-[#1C3B3A] text-teal font-bold text-lg px-8 py-4 rounded-md text-center hover:bg-teal hover:text-cream transition-colors"
            >
              Join an info session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
