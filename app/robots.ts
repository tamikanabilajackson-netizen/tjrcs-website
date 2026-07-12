import type { MetadataRoute } from 'next';

// AI search/citation bots — retrieve live content for AI answers
const AI_SEARCH_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Applebot-Extended',
];

// AI training bots — feed model training data
const AI_TRAINING_BOTS = ['ClaudeBot', 'GPTBot', 'Google-Extended', 'CCBot'];

// Low-value/aggressive scrapers
const BLOCKED_BOTS = ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot', 'PetalBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: AI_SEARCH_BOTS,
        allow: '/',
      },
      {
        userAgent: AI_TRAINING_BOTS,
        allow: '/',
      },
      {
        userAgent: BLOCKED_BOTS,
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://tjrcs.net/sitemap.xml',
  };
}
