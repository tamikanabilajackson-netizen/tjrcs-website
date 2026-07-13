import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogPostStatus = 'draft' | 'published';

export type BlogPostMeta = {
  title: string;
  slug: string;
  meta_description: string;
  author: string;
  category: string;
  status: BlogPostStatus;
  order: number;
  header_image: string;
  header_image_alt: string;
};

export type BlogPost = BlogPostMeta & { contentHtml: string };

function readPostFilenames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((filename) => filename.endsWith('.md'));
}

function readPostMeta(filename: string): BlogPostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
  const { data } = matter(raw);
  return data as BlogPostMeta;
}

// Published posts only, sorted by the `order` frontmatter field ascending.
export function getAllPublishedPosts(): BlogPostMeta[] {
  return readPostFilenames()
    .map(readPostMeta)
    .filter((post) => post.status === 'published')
    .sort((a, b) => a.order - b.order);
}

// Returns null for drafts and unknown slugs alike, so callers can 404 either way.
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  for (const filename of readPostFilenames()) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
    const { data, content } = matter(raw);
    const meta = data as BlogPostMeta;

    if (meta.slug === slug) {
      if (meta.status !== 'published') return null;
      const processed = await remark().use(remarkHtml).process(content);
      return { ...meta, contentHtml: processed.toString() };
    }
  }
  return null;
}
