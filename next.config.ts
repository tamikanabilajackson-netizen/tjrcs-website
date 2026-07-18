import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Local-dev only: the backend's CORS (ALLOWED_ORIGIN) only trusts
  // https://tjrcs.net, so browser calls from localhost are blocked
  // ("Failed to fetch"). With NEXT_PUBLIC_BACKEND_URL left empty in
  // .env.local, the forms POST same-origin to /api/inquiry and /api/subscribe
  // and the dev server proxies them to the backend (server-to-server,
  // no CORS). Production is unaffected: Vercel sets the env var, so the
  // deployed forms still call the backend directly.
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    const backend = 'https://tjrcs-backend.onrender.com';
    return [
      { source: '/api/inquiry', destination: `${backend}/api/inquiry` },
      { source: '/api/subscribe', destination: `${backend}/api/subscribe` },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://tjrcs-backend.onrender.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
