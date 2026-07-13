import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPublishedPosts, getPublishedPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} — TJRCS Blog`,
    description: post.meta_description,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: [`/blog/${post.header_image}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <main id="main-content">

      {/* ── Header image ── */}
      <img
        src={`/blog/${post.header_image}`}
        alt={post.header_image_alt}
        className="w-full h-[320px] sm:h-[420px] object-cover"
      />

      {/* ── Post body ── bg-white ─────────────────────────────────────────── */}
      <article className="relative overflow-hidden bg-white py-16 px-[5%]">
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px]"
          style={{ background: 'linear-gradient(to bottom, #E8924B, #1C3B3A)' }}
          aria-hidden="true"
        />

        <div style={{ maxWidth: '760px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.15,
              color: '#1C3B3A',
              marginBottom: '32px',
            }}
          >
            {post.title}
          </h1>

          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>

      {/* ── Footer CTA ── bg-cream ───────────────────────────────────────── */}
      <section
        aria-labelledby="blog-post-cta-heading"
        className="relative overflow-hidden bg-[#F9F4EC] py-16 px-[5%] text-center"
      >
        <h2
          id="blog-post-cta-heading"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            lineHeight: 1.15,
            color: '#1C3B3A',
            marginBottom: '24px',
          }}
        >
          Curious about Build &amp; Launch?
        </h2>
        <Link
          href="/#get-started"
          className="inline-block bg-amber text-white font-heading font-bold text-[17px] px-8 py-4 rounded-md uppercase tracking-[1.5px] hover:bg-[#d4793a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: '#1C3B3A' }}
        >
          Send an inquiry
        </Link>
      </section>

    </main>
  );
}
