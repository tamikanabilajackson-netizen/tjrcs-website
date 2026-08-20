// Single source of truth for Build & Launch program facts: pricing,
// phases, structure, and eligibility. Website copy and any future
// chatbot should read from this file instead of duplicating these
// facts independently, so they can't drift out of sync.
//
// Language rules: "recreation professional" / "applies therapeutic
// recreation principles" only, never "recreation therapist" or
// "recreation therapy". See feedback_tjrcs_language memory.

export interface ProgramPhase {
  month: number;
  name: 'Discover' | 'Build' | 'Practice' | 'Launch';
  tagline: string;
  description: string;
}

export interface ProgramStructure {
  sessions: string;
  groupSessions: string;
  ventureDays: string;
  journal: string;
  closing: string;
}

export interface ProgramPricing {
  discoveryMonth: {
    price: string;
    note: string;
  };
  fullProgramInstallments: {
    total: string;
    breakdown: string;
  };
  fullProgramPaidInFull: {
    total: string;
    breakdown: string;
  };
}

export interface BuildAndLaunchProgram {
  name: string;
  tagline: string;
  ageRange: string;
  duration: string;
  description: string;
  phases: ProgramPhase[];
  structure: ProgramStructure;
  pricing: ProgramPricing;
  whoItsFor: string[];
  whatItIsNot: string[];
}

export const buildAndLaunchProgram: BuildAndLaunchProgram = {
  name: 'Build & Launch',
  tagline: 'Recreation That Connects',
  ageRange: '15–30',
  duration: '4 months',
  description:
    'Build & Launch is a 4-month, 1-on-1 recreation-based entrepreneurship and career exploration program for autistic and neurodivergent young adults that applies therapeutic recreation principles.',

  phases: [
    {
      month: 1,
      name: 'Discover',
      tagline: 'Who you are is where we start.',
      description: 'Before anything gets built, we go deep on what makes you you.',
    },
    {
      month: 2,
      name: 'Build',
      tagline: 'Your idea, your voice, your brand.',
      description: 'You take your strongest idea and make it real.',
    },
    {
      month: 3,
      name: 'Practice',
      tagline: 'Take it to the community.',
      description: 'This is where the work meets the world.',
    },
    {
      month: 4,
      name: 'Launch',
      tagline: "Show the world what you've built.",
      description: 'You lead. You present. You celebrate.',
    },
  ],

  structure: {
    sessions: '16 weekly 1-on-1 sessions, approximately 60 minutes each',
    groupSessions: '2 virtual group sessions',
    ventureDays: '2 Community Venture Days',
    journal: 'Build & Launch Journal',
    closing: 'End-of-program celebration',
  },

  pricing: {
    discoveryMonth: {
      price: '$200 CAD',
      note: 'opt-out after Month 1',
    },
    fullProgramInstallments: {
      total: '$1,500 CAD',
      breakdown: '$200 entry + 3 monthly payments of $433',
    },
    fullProgramPaidInFull: {
      total: '$1,200 CAD',
      breakdown: '$200 + $1,000 one-time',
    },
  },

  whoItsFor: [
    "You're autistic, neurodivergent, or identify that way, with or without a formal diagnosis",
    "You've spent more time working around your challenges than building on your strengths",
    "You want a space that's consistent, predictable, and genuinely built around who you are",
    "You're ready to explore what a career could look like on your own terms",
  ],

  whatItIsNot: [
    'Not a clinical service',
    'Not covered by OHIP or insurance',
    'Not a substitute for therapy or regulated professional support',
  ],
};
