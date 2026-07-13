import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog — TJRCS | Tamika Jackson Recreation and Consulting Services',
  description:
    'Stories and reflections from Build & Launch — a recreation-based career exploration program for autistic and neurodivergent young adults.',
};

export default function BlogPage() {
  return <BlogContent />;
}
