// JSON-LD structured data shared across pages.
// Language rules: "recreation professional" / "applies therapeutic recreation
// principles" only — never "recreation therapist" or "recreation therapy".
// Service-area business: no street address, no raw telephone number.

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Tamika Jackson Recreation and Consulting Services',
  url: 'https://tjrcs.net',
  description:
    'A recreation professional practice that applies therapeutic recreation principles to strengths-based mentorship, career exploration, and community programming for autistic and neurodivergent young adults, families, and organizations.',
  areaServed: [
    {
      '@type': 'City',
      name: 'Vaughan',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario' },
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Greater Toronto Area',
    },
  ],
  sameAs: [
    'https://www.facebook.com/profile.php?id=100090760395314',
    'https://www.linkedin.com/in/tamika-jackson-6484b4226/',
    'https://www.instagram.com/trcsfun/',
    'https://www.youtube.com/@RecreationThatConnects',
    'https://wa.me/16477025531',
  ],
};

// Single source of truth for the Services page FAQ. This array renders BOTH
// the visible FAQ section (ServicesContent.tsx) and the FAQPage JSON-LD
// below, so the schema and the on-page text can never drift apart.
export const servicesFaq = [
  {
    question: 'What is Build & Launch?',
    answer:
      'Build & Launch is a 4-month, 1:1 recreation-based mentorship and career exploration program that applies therapeutic recreation principles, designed for autistic and neurodivergent young adults ages 15 to 30. It is strengths-based, structured, and built around one person at a time.',
  },
  {
    question: 'Is Build & Launch a therapy service?',
    answer:
      'No. Build & Launch is a recreation-based mentorship program delivered by a recreation professional. It applies therapeutic recreation principles, but it is not a therapy service and is not a substitute for regulated professional support.',
  },
  {
    question: 'Is Build & Launch covered by OHIP or insurance?',
    answer:
      'No. Build & Launch is a private-pay program operated as a sole proprietorship in Ontario, Canada. It is not covered by OHIP or insurance.',
  },
  {
    question: 'Who is Build & Launch for?',
    answer:
      'Build & Launch is for autistic and neurodivergent young adults ages 15 to 30, with or without a formal diagnosis, who want a consistent, predictable space built around their strengths and interests — and for parents, caregivers, and support people looking for a program that genuinely invests in who their young adult is and where they are going.',
  },
  {
    question: 'What other services does Tamika Jackson Recreation and Consulting Services offer?',
    answer:
      'Beyond Build & Launch, services include STEM birthday parties for ages 4 to 10, recreation professional services such as program design and group facilitation for organizations, and AI consulting for care facilities bringing AI tools into their recreation programming.',
  },
];

export const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: servicesFaq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

// Serialize for <script type="application/ld+json">, escaping "<" so the
// payload can never close the script tag early.
export function jsonLdHtml(schema: object): { __html: string } {
  return { __html: JSON.stringify(schema).replace(/</g, '\\u003c') };
}
