import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact — Build & Launch | TJRCS',
  description:
    'Reach out to Tamika Jackson, Recreation Professional and founder of Build & Launch. Fill out the short inquiry form and Tamika will personally follow up within two business days.',
};

export default function ContactPage() {
  return <ContactContent />;
}
