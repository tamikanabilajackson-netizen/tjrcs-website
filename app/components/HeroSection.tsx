'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgPath = isDesktop ? '/hero-desktop.svg' : '/hero-mobile.svg';
    const img = new Image();
    img.src = svgPath;

    img.onload = () => {
      const width = img.naturalWidth || 600;
      const height = img.naturalHeight || 400;

      canvas.width = width;
      canvas.height = height;

      const startTime = Date.now();
      const duration = 2500;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width * progress, canvas.height);
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };
  }, [isDesktop, mounted]);

  return (
    <section className="bg-cream pb-28 pt-2">
      {/* Illustration - full width edge to edge */}
      <figure className="m-0 w-full mb-12">
        <canvas
          ref={canvasRef}
          className="w-full h-auto md:h-[550px]"
          role="img"
          aria-label="Line art illustration of a brain, botanical elements, and people connecting, representing the Recreation That Connects brand."
        />
      </figure>

      {/* Copy section - with padding and centered */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-heading font-bold text-teal text-5xl mb-3">
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
      </div>
    </section>
  );
}
