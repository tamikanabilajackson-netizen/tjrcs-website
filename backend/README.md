# TJRCS Backend — Website Inquiry Forms

A small Node.js/Express API that receives submissions from tjrcs.net's forms,
emails them to `tamika@tjrcs.net` via the Resend API, and logs each one as a
row in a Google Sheet, automatically, on every submission.

This lives in its own `backend/` folder, separate from the Next.js site,
because it's a standalone Express service deployed on its own (Render),
not part of the Next.js/Vercel build.

**Current status: deployed and working.**

- Live backend: `https://tjrcs-backend.onrender.com`
- Email delivery: Resend, sending from `forms@tjrcs.net` (domain verified)
  to `TO_EMAIL` (`tamika@tjrcs.net`), with `replyTo` set to the submitter
- The site's forms are wired to it via `NEXT_PUBLIC_BACKEND_URL` (set in
  Vercel project settings and in `.env.local` for local dev)

## What's in here

- `server.js` — the whole backend
  - `POST /api/inquiry` — used by both real inquiry forms on the site
  - `POST /api/subscribe` — used by the two small "keep me in the loop" /
    "send me the invite link" capture forms
  - `GET /api/health` — health check
- `apps-script.gs` — pasted into a Google Sheet to log submissions there
- `package.json` — dependencies
- `.env.example` — template for your secrets (copy to `.env`)

## The forms on tjrcs.net this connects to

**Homepage "Build & Launch" inquiry form** (`app/components/BuildLaunchInquiryForm.tsx`)
POSTs to `/api/inquiry` with `source: "Build & Launch Inquiry (Homepage)"`.

**Contact page general inquiry form** (`app/contact/ContactContent.tsx`)
POSTs to `/api/inquiry` with `source: "Contact Page Inquiry"`.

**Two small capture forms** — "Keep me in the loop" on the homepage
(`app/components/NewsletterCaptureForm.tsx`) and "Send me the invite link"
on /contact (`ContactContent.tsx`) — POST to `/api/subscribe`.

Both inquiry forms send the same payload shape:

```json
{
  "source": "Build & Launch Inquiry (Homepage)",
  "name": "…",
  "email": "…",
  "category": "…",
  "message": "…",
  "referral": "…"
}
```

`name` and `email` are the only required fields server-side; the forms'
own `required` attributes handle the rest of the UX validation.

## Configuration

```
cd backend
cp .env.example .env
```

Edit `.env`:

- `RESEND_API_KEY` — create one at [resend.com](https://resend.com) under
  **API Keys**
- `TO_EMAIL` — where submissions get delivered (`tamika@tjrcs.net`)
- `ALLOWED_ORIGIN` — the live site's URL (`https://tjrcs.net`), so only the
  site can call this API
- `SHEETS_WEBHOOK_URL` — optional; see the Google Sheets section below

Emails send from `forms@tjrcs.net`. That address does not need to be a real
Zoho mailbox: Resend only needs the domain verified (done at
[resend.com/domains](https://resend.com/domains) via DNS records added in
Vercel, where tjrcs.net's DNS is hosted), and replies go to the submitter
through `replyTo`.

Note: a Resend account with no verified domain can only deliver to the
account owner's own signup email. If sending ever starts failing with a
"testing emails" error, check that tjrcs.net still shows Verified in the
Resend dashboard.

## Run it locally

```
npm install
npm start
```

You should see:

```
TJRCS backend listening on port 3000
```

Test it:

```
curl -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"source":"Local Test","name":"Test Person","email":"test@example.com","category":"Other","message":"Hello!","referral":"Google"}'
```

Check the `TO_EMAIL` inbox.

## Google Sheets logging (optional, automatic)

Already set up and running. To recreate it from scratch:

1. Create a new Google Sheet (any name, e.g. "TJRCS Website Submissions")
2. In the Sheet, go to **Extensions → Apps Script**
3. Delete the placeholder code and paste in the contents of `apps-script.gs`
4. Click **Save**, then **Deploy → New deployment**
5. Click the gear icon next to "Select type" → choose **Web app**
6. Set **Execute as:** Me, **Who has access:** Anyone
7. Click **Deploy** and authorize the permissions it asks for (it's your own
   script/sheet)
8. Copy the **Web app URL** into `.env` as `SHEETS_WEBHOOK_URL` (and into
   Render's Environment settings)

The script auto-creates a "Submissions" tab with headers (Timestamp, Source,
Name, Email, Category, Message, Referral) the first time a row comes in.

If `SHEETS_WEBHOOK_URL` is left blank, the backend skips logging and still
sends email as normal. Nothing breaks.

**Note:** if you ever update `apps-script.gs`, you need to **Deploy → Manage
deployments → edit (pencil) → New version** for changes to take effect.
Saving alone doesn't update a live deployment.

## Deployment (Render)

Deployed as a Render Web Service at `https://tjrcs-backend.onrender.com`,
auto-deploying from this repo's `main` branch:

- **Root directory:** `backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment:** the same variables as `.env` (edit under the service's
  **Environment** tab; saving triggers a redeploy)

The frontend reads the backend's base URL from `NEXT_PUBLIC_BACKEND_URL`,
set in Vercel project settings (and in `.env.local` for local dev). If the
backend URL ever changes, update it in both places and redeploy the site.
`NEXT_PUBLIC_` variables are baked into the build, so a redeploy is required
for a change to take effect.

**Free-tier note:** Render puts the service to sleep after inactivity. The
first submission after a quiet period can take 30 to 60 seconds while it
wakes up; the forms show "Sending…" during the wait.

## Notes

- Rate limiting is in place (10 submissions per 15 min per IP) to cut down
  on spam.
- Resend resolves (rather than rejects) on API-level failures, so `server.js`
  checks the `error` field on every send and surfaces it as a 500. If forms
  report errors, check the Render logs for the underlying Resend message.
