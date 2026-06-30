import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services — TJRCS | Tamika Jackson Recreation and Consulting Services',
  description:
    'Explore the services offered by Tamika Jackson, Recreation Professional: Build & Launch, STEM Birthday Parties, Recreation Professional Services, and AI Consulting for Care Facilities.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
