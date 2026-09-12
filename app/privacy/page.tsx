import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy — TJRCS | Tamika Jackson Recreation and Consulting Services',
  description:
    'How Tamika Jackson Recreation and Consulting Services collects, uses, stores, and protects personal information gathered through tjrcs.net.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
