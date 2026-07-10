<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Backend for the site's forms

There's a standalone Express backend in `backend/` (separate from this Next.js
app — deployed on its own at https://tjrcs-backend.onrender.com, not through
Vercel). It receives form submissions, emails them via the Resend API (from
forms@tjrcs.net to tamika@tjrcs.net), and logs them to a Google Sheet. Full
details in `backend/README.md`.

The site's forms ARE wired to it (as of the latest work):

- Homepage "Build & Launch" inquiry form → POSTs to `/api/inquiry`
  (source: "Build & Launch Inquiry (Homepage)")
- `/contact` page general inquiry form (`ContactContent.tsx`, `handleInquirySubmit`)
  → POSTs to `/api/inquiry` (source: "Contact Page Inquiry")
- Two small capture forms (`NewsletterCaptureForm.tsx` and the /contact page's
  invite-link capture, `handleCaptureSubmit`) → POST to `/api/subscribe`

All four use `process.env.NEXT_PUBLIC_BACKEND_URL` as the backend's base URL
(https://tjrcs-backend.onrender.com), set in Vercel project settings and in
`.env.local` locally (template: `.env.local.example`). `NEXT_PUBLIC_` vars are
baked in at build time — changing the URL requires a Vercel redeploy.

`backend/README.md` has the full setup: Zoho app password, `.env` config,
Google Sheets logging, and deployment steps.
