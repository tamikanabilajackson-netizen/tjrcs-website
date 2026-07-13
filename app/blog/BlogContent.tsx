import Link from 'next/link';
import type { CSSProperties } from 'react';
import { getAllPublishedPosts } from '@/lib/blog';

const ACCENT_BAR: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '5px',
  background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)',
};

const EYEBROW_LINE: CSSProperties = {
  display: 'inline-block',
  width: '50px',
  height: '2px',
  background: '#E8924B',
  flexShrink: 0,
};

const EYEBROW_TEXT: CSSProperties = {
  color: '#E8924B',
  fontSize: '16px',
  fontFamily: 'var(--font-lato)',
  fontWeight: 600,
  letterSpacing: '4px',
  textTransform: 'uppercase',
};

export default function BlogContent() {
  const posts = getAllPublishedPosts();

  return (
    <main id="main-content">

      {/* ── 1. Page Header ── bg-cream ────────────────────────────────────── */}
      <section
        aria-labelledby="blog-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        <div className="flex items-center gap-3 mb-6">
          <span style={EYEBROW_LINE} aria-hidden="true" />
          <span style={EYEBROW_TEXT}>The Blog</span>
        </div>

        <h1
          id="blog-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.15,
            color: '#1C3B3A',
            marginBottom: '28px',
          }}
        >
          Stories from the work
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-lato)',
            fontWeight: 400,
            fontSize: '22px',
            lineHeight: 1.8,
            color: 'rgba(28,59,58,0.75)',
            maxWidth: '720px',
          }}
        >
          Reflections from Build &amp; Launch and the recreation-based work behind it.
        </p>
      </section>

      {/* ── 2. Post grid ── bg-white ─────────────────────────────────────── */}
      <section
        aria-label="Blog posts"
        className="relative overflow-hidden bg-white py-20 px-[5%]"
      >
        <div style={ACCENT_BAR} aria-hidden="true" />

        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: '22px',
              lineHeight: 1.8,
              color: 'rgba(28,59,58,0.75)',
            }}
          >
            New posts are on the way. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-[#F9F4EC] rounded-lg overflow-hidden border border-[#1C3B3A]/10 transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: '#E8924B' }}
              >
                <img
                  src={`/blog/${post.header_image}`}
                  alt={post.header_image_alt}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 700,
                      fontSize: '24px',
                      lineHeight: 1.3,
                      color: '#1C3B3A',
                      marginBottom: '12px',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-lato)',
                      fontSize: '22px',
                      lineHeight: 1.8,
                      color: 'rgba(28,59,58,0.75)',
                    }}
                  >
                    {post.meta_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
