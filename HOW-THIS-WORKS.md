# How the TJRCS Website Forms Work

Plain-English reference for how form submissions on tjrcs.net actually work,
where every piece lives, and what to check first if something breaks.

## The short version

When someone fills out a form on tjrcs.net, two things happen automatically:

1. **You get an email** at tamika@tjrcs.net
2. **A row gets added** to a Google Sheet called "TJRCS Website Submissions"

Both happen through a small custom program (the "backend") that sits between
your website and Zoho/Google.

## The pieces, and where each one lives

### 1. The website itself (frontend)

- **What it is:** The Next.js site people actually see at tjrcs.net
- **Where the code lives:** `C:\Users\Admin\Documents\tjrcs-website` (this folder)
- **Where it's hosted/deployed:** Vercel, connected to your GitHub repo
- **GitHub repo:** https://github.com/tamikanabilajackson-netizen/tjrcs-website
- **How updates go live:** Push code to GitHub → Vercel automatically rebuilds and deploys

### 2. The backend (the piece that actually sends email + logs to Sheets)

- **What it is:** A small Node.js program (technically called an "Express server")
- **Where the code lives:** `C:\Users\Admin\Documents\tjrcs-website\backend`
- **Where it's hosted/deployed:** Render (separate from Vercel — this is a different
  kind of program that needs to run continuously, not just serve web pages)
- **Why it's separate from the website:** Vercel is built for websites, not for
  programs that need to stay running and send emails. Render is built for that.
- **Key file:** `backend/server.js` — this is the entire program. It has two jobs:
  1. Receive form data (`/api/inquiry` and `/api/subscribe`)
  2. Send an email via Zoho AND send the data to Google Sheets, at the same time

### 3. Email delivery (Zoho)

- **Mailbox:** tamika@tjrcs.net
- **How the backend logs in:** Using an "app-specific password" (not your normal
  login password) — this lives in `backend/.env`
- **Important quirk:** This Zoho account is on a regional server
  (`smtp.zohocloud.ca`, not the standard `smtp.zoho.com`). This is set in
  `backend/.env` as `ZOHO_SMTP_HOST`. If email ever stops sending, this is one
  of the first things to check.

### 4. Google Sheets logging

- **The Sheet:** "TJRCS Website Submissions" (in Google Drive) — actual data is
  on the tab called **"Submissions"**, not "Sheet1"
- **How it gets data:** A small script (Google Apps Script) is attached to the
  Sheet, named "TJRCS Sheet Logger." It receives data from the backend and adds
  a row.
- **The script's code lives in two places:**
  - Inside the Google Sheet itself (Extensions → Apps Script)
  - A copy at `backend/apps-script.gs` in this project, for reference
- **The connection between backend and Sheet:** A special URL (the Apps Script
  "Web app URL"), stored in `backend/.env` as `SHEETS_WEBHOOK_URL`

### 5. The four forms on the site

| Form | Where | Sends to |
|---|---|---|
| "Build & Launch" inquiry | Homepage | `/api/inquiry` |
| "Keep me in the loop" | Homepage | `/api/subscribe` |
| General inquiry form | /contact page | `/api/inquiry` |
| "Send me the invite link" | /contact page | `/api/subscribe` |

All four ultimately go through the same backend, which sends the email and
logs the Sheet row.

## Where the secrets/passwords live

**`backend\.env`** — this file is never uploaded to GitHub (it's excluded on
purpose, so your passwords stay private). It contains:

- `ZOHO_EMAIL` — the mailbox address
- `ZOHO_APP_PASSWORD` — the Zoho app-specific password
- `ZOHO_SMTP_HOST` — the regional Zoho server address
- `TO_EMAIL` — where form emails get delivered
- `ALLOWED_ORIGIN` — restricts who can call the backend (your website only)
- `SHEETS_WEBHOOK_URL` — the Google Apps Script URL

If the backend is ever redeployed somewhere new, these same values need to be
re-entered in that hosting service's settings (Render, in our case) — the
`.env` file itself only matters for running things on your own computer.

## If something breaks — quick troubleshooting

**No email arriving, but the form seems to submit fine:**
Check whether the backend is actually running (if testing locally) or whether
Render shows it as "live" (if deployed). Look for a line saying "Zoho SMTP
connection ready" — if it instead says "connection failed," the `.env`
password or `ZOHO_SMTP_HOST` is likely wrong.

**Email arrives, but nothing shows up in the Google Sheet:**
1. Make sure you're looking at the **"Submissions"** tab, not "Sheet1"
2. In the Apps Script project, check Deploy → Manage deployments → the "Who
   has access" setting must be exactly **"Anyone"** (not "Anyone with Google
   account") — this is the single most common cause of Sheet logging failing

**Nothing happens at all when submitting a form on the live site:**
The backend URL the website is pointed at (`NEXT_PUBLIC_BACKEND_URL`) may not
be set correctly, or the backend isn't currently deployed/running on Render.

**"Address already in use" error when starting the backend locally:**
An old copy of the program is still running in the background. Find and stop
it, then try again.

## IndexNow (telling search engines about updates)

The site supports [IndexNow](https://www.indexnow.org/) — a way to instantly
tell search engines (Bing, Yandex, and others) that the site's pages have
changed, instead of waiting for them to crawl on their own schedule.

- **Verification key file:** served at
  `https://tjrcs.net/25a7d07e6edd47ac9804e2c52920bacb.txt`
  (code: `app/25a7d07e6edd47ac9804e2c52920bacb.txt/route.ts`, key constant in
  `lib/indexnow.ts`)
- **Submission endpoint:** `POST https://tjrcs.net/api/indexnow`
  (code: `app/api/indexnow/route.ts`) — submits every URL from the sitemap

**To trigger it manually** (e.g., after deploying content changes), run this
from any terminal:

```
curl -X POST https://tjrcs.net/api/indexnow
```

A successful response looks like `{"ok":true,"indexNowStatus":200,...}` (202
is also fine — it means the key is still being validated). This is manual for
now; wiring it into the deploy pipeline automatically is a possible later step.

## Who to ask / where to look for more detail

- Full backend setup instructions: `backend/README.md`
- Notes for Claude Code about this project: `AGENTS.md` (root of this folder)
- This file (`HOW-THIS-WORKS.md`) is meant to be the plain-English map — the
  README files go into more technical step-by-step detail.
