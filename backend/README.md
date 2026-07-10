# TJRCS Backend — Website Inquiry Forms

A small Node.js/Express API that receives submissions from tjrcs.net's forms,
emails them to `tamika@tjrcs.net` via Zoho, and (optionally) logs each one as
a row in a Google Sheet — automatically, on every submission.

This lives in its own `backend/` folder, separate from the Next.js site, because
it's a standalone Express service deployed on its own (e.g. Render/Railway),
not part of the Next.js/Vercel build.

## What's in here

- `server.js` — the whole backend
  - `POST /api/inquiry` — used by both real inquiry forms on the site
  - `POST /api/subscribe` — used by the two small "keep me in the loop" /
    "send me the invite link" capture forms
  - `GET /api/health` — health check
- `apps-script.gs` — paste into a Google Sheet to log submissions there
- `package.json` — dependencies
- `.env.example` — template for your secrets (copy to `.env`)

## The actual forms on tjrcs.net this connects to

**Homepage — "Build & Launch" inquiry form** (`tjrcs.net/`)
Field ids: `inquiry-name`, `inquiry-email`, `inquiry-role` (select: `young-adult` /
`parent` / `together`), `inquiry-about`, `inquiry-referral`. Button: "Send my inquiry".

**Contact page — general inquiry form** (`tjrcs.net/contact`)
Field ids: `inquiry-name`, `inquiry-email`, `inquiry-service` (select: Build & Launch /
STEM Birthday Parties (Ages 4–10) / Recreation Professional Services / AI Consulting
for Care Facilities / Other), `inquiry-where-now`, `inquiry-how-heard`. Button: "Send my inquiry".

**Two small capture forms** ("Keep me in the loop" on homepage, "Send me the invite
link" on /contact) — just first name + email.

Both inquiry forms POST to the same `/api/inquiry` endpoint, just with slightly
different field values mapped to a common shape (see snippets below).

## 1. Get a Zoho app password

Zoho blocks SMTP login with your normal password. You need an app-specific one:

1. Sign in to Zoho Mail → click your profile icon → **My Account**
2. Go to **Security** → **App Passwords**
3. Click **Generate New Password**, name it something like `trcs-website`
4. Copy the generated password — you won't see it again

## 2. Configure

```
cd backend
cp .env.example .env
```

Edit `.env`:

- `ZOHO_EMAIL` — `tamika@tjrcs.net`
- `ZOHO_APP_PASSWORD` — the app password from step 1
- `TO_EMAIL` — where you want submissions delivered (can be the same address)
- `ALLOWED_ORIGIN` — your live site's URL, e.g. `https://tjrcs.net`

## 3. Run it locally

```
npm install
npm start
```

You should see:

```
Zoho SMTP connection ready
TJRCS backend listening on port 3000
```

Test it:

```
curl -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"source":"Contact Page Inquiry","name":"Test Person","email":"test@example.com","category":"Other","message":"Hello!","referral":"Google"}'
```

Check the inbox for `TO_EMAIL`.

## 4. Log submissions to Google Sheets (optional, automatic)

1. Create a new Google Sheet (any name, e.g. "TJRCS Website Submissions")
2. In the Sheet, go to **Extensions → Apps Script**
3. Delete the placeholder code and paste in the contents of `apps-script.gs`
4. Click **Save**, then **Deploy → New deployment**
5. Click the gear icon next to "Select type" → choose **Web app**
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy** → authorize the permissions it asks for (it's your own script/sheet)
8. Copy the **Web app URL** it gives you
9. Paste that URL into `.env` as `SHEETS_WEBHOOK_URL`
10. Restart the backend (or redeploy on Render)

The script auto-creates a "Submissions" tab with headers (Timestamp, Source,
Name, Email, Category, Message, Referral) the first time a row comes in.

If `SHEETS_WEBHOOK_URL` is left blank, the backend just skips this step and
still sends email as normal — nothing breaks.

**Note:** if you ever update `apps-script.gs`, you need to **Deploy → Manage
deployments → edit (pencil) → New version** for changes to take effect — saving
alone doesn't update a live deployment.

## 5. Wire up the real forms (for Claude Code / your Next.js codebase)

Both forms should call `/api/inquiry` on submit. Since the ids are already on
the page, a plain fetch using `getElementById` works regardless of whether the
form is controlled by React state — adapt to match how the component actually
reads its inputs.

**Homepage "Build & Launch" form** — add this to its submit handler:

```js
async function handleBuildLaunchSubmit(e) {
  e.preventDefault();

  const payload = {
    source: 'Build & Launch Inquiry (Homepage)',
    name: document.getElementById('inquiry-name').value,
    email: document.getElementById('inquiry-email').value,
    category: document.getElementById('inquiry-role').value, // young-adult | parent | together
    message: document.getElementById('inquiry-about').value,
    referral: document.getElementById('inquiry-referral').value,
  };

  const res = await fetch('https://your-backend-url.com/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  // TODO: show data.message / handle data.error in the UI
}
```

**Contact page general form** — same endpoint, different field mapping:

```js
async function handleContactSubmit(e) {
  e.preventDefault();

  const payload = {
    source: 'Contact Page Inquiry',
    name: document.getElementById('inquiry-name').value,
    email: document.getElementById('inquiry-email').value,
    category: document.getElementById('inquiry-service').value,
    message: document.getElementById('inquiry-where-now').value,
    referral: document.getElementById('inquiry-how-heard').value,
  };

  const res = await fetch('https://your-backend-url.com/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  // TODO: show data.message / handle data.error in the UI
}
```

**The two small capture forms** ("Keep me in the loop" / "Send me the invite
link") — call `/api/subscribe` instead:

```js
async function handleSubscribeSubmit(e, sourceLabel) {
  e.preventDefault();

  const payload = {
    source: sourceLabel, // e.g. "Homepage Newsletter" or "Contact Page Invite Link"
    name: document.getElementById('capture-firstname').value,
    email: document.getElementById('capture-email').value,
  };

  const res = await fetch('https://your-backend-url.com/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
}
```

Replace `https://your-backend-url.com` with the real deployed URL once you've
completed step 6.

## 6. Deploy (free tier is fine for a small business site)

**Render** (recommended — simplest):

1. Push this `backend/` folder to a GitHub repo (can be the same repo as the
   site, or its own — just make sure Render's "Root Directory" is set to `backend`)
2. On [render.com](https://render.com) → **New Web Service** → connect the repo
3. Root directory: `backend` · Build command: `npm install` · Start command: `npm start`
4. Add the same variables from `.env` under **Environment**
5. Deploy — Render gives you a URL like `https://trcs-backend.onrender.com`
6. Use that URL in the frontend `fetch()` calls above, and set `ALLOWED_ORIGIN`
   to `https://tjrcs.net`

**Railway** is an equally simple alternative if you prefer it over Render.

## Notes / next steps

- Submissions go out as email and, if you set up `SHEETS_WEBHOOK_URL`, also land
  as a row in your Google Sheet — both happen automatically on every submission.
- Rate limiting is already in place (10 submissions per 15 min per IP) to cut down on spam.
- `name` and `email` are the only required fields server-side; the forms' own
  client-side `required` attributes handle the rest of the UX validation.
