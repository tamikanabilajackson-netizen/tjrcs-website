import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Tamika Jackson — Build & Launch | TJRCS',
  description:
    'Learn about Tamika Jackson, Recreation Professional and founder of Build & Launch — a strengths-first career exploration program for autistic and neurodivergent young adults.',
};

export default function AboutPage() {
  return <AboutContent />;
}
