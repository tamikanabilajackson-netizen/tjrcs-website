require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
  })
);

// Limit form submissions to 10 per 15 minutes per IP to block spam/abuse
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again later.' },
});

// ---- Mailer (Resend) ----
// tjrcs.net is verified at https://resend.com/domains, so we can send from
// any address on the domain. forms@ doesn't need to be a real Zoho mailbox —
// replies go to the submitter via replyTo, and delivery goes to TO_EMAIL.
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'TJRCS Website <forms@tjrcs.net>';

// ---- Helpers ----
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Logs a submission to the Google Sheet via an Apps Script Web App.
// Never throws — a logging failure should not block the email from going out.
async function logToSheet(payload) {
  if (!process.env.SHEETS_WEBHOOK_URL) return;
  try {
    const res = await fetch(process.env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    if (!res.ok) {
      console.error('Sheet logging returned status', res.status);
    }
  } catch (err) {
    console.error('Sheet logging failed:', err.message);
  }
}

// ---- Routes ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Single inquiry endpoint — used by BOTH forms on tjrcs.net:
//   1. Homepage "Build & Launch" inquiry form
//      fields: inquiry-name, inquiry-email, inquiry-role, inquiry-about, inquiry-referral
//   2. /contact page general inquiry form
//      fields: inquiry-name, inquiry-email, inquiry-service, inquiry-where-now, inquiry-how-heard
//
// Both forms should POST here with this shape:
//   {
//     source: "Build & Launch Inquiry (Homepage)" | "Contact Page Inquiry",
//     name, email,
//     category,   // the selected role or service
//     message,    // the "about" / "where now" textarea
//     referral,   // the "how did you hear about us" field
//   }
app.post('/api/inquiry', formLimiter, async (req, res) => {
  const { source, name, email, category, message, referral } = req.body || {};

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Name and a valid email are required.' });
  }

  const formLabel = source || 'Website Inquiry';

  try {
    const [emailResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New inquiry (${formLabel}) from ${name}`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Form:</strong> ${escapeHtml(formLabel)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Category:</strong> ${escapeHtml(category || 'Not specified')}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message || 'None').replace(/\n/g, '<br>')}</p>
          <p><strong>How they heard about us:</strong> ${escapeHtml(referral || 'Not specified')}</p>
        `,
      }),
      logToSheet({
        source: formLabel,
        name,
        email,
        category: category || '',
        message: message || '',
        referral: referral || '',
      }),
    ]);
    // Resend resolves (rather than rejects) on API-level failures, e.g. an
    // unverified domain or bad API key — surface those as errors too.
    if (emailResult.error) throw new Error(emailResult.error.message);
    res.json({ success: true, message: 'Thanks! Your inquiry has been sent.' });
  } catch (err) {
    console.error('Inquiry email failed:', err.message);
    res.status(500).json({ error: 'Something went wrong sending your inquiry. Please try again.' });
  }
});

// Lightweight signup endpoint — for the small "Keep me in the loop" /
// "Send me the invite link" capture forms (first name + email only).
app.post('/api/subscribe', formLimiter, async (req, res) => {
  const { source, name, email } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  const formLabel = source || 'Newsletter Signup';

  try {
    const [emailResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New signup (${formLabel})${name ? ` — ${name}` : ''}`,
        html: `
          <h2>New Signup</h2>
          <p><strong>Form:</strong> ${escapeHtml(formLabel)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        `,
      }),
      logToSheet({
        source: formLabel,
        name: name || '',
        email,
        category: 'Signup',
        message: '',
        referral: '',
      }),
    ]);
    if (emailResult.error) throw new Error(emailResult.error.message);
    res.json({ success: true, message: "Thanks! You're on the list." });
  } catch (err) {
    console.error('Subscribe email failed:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ---- Fallback error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`TJRCS backend listening on port ${PORT}`);
});
