import sitemap from '@/app/sitemap';
import { INDEXNOW_KEY, INDEXNOW_KEY_LOCATION } from '@/lib/indexnow';

// Submits every URL in the sitemap to IndexNow (Bing, Yandex, etc. share the
// endpoint). Trigger manually after a deploy — see HOW-THIS-WORKS.md.
export async function POST() {
  const urlList = sitemap().map((entry) => entry.url);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'tjrcs.net',
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });

  // IndexNow returns 200 (OK) or 202 (key validation pending) on success
  if (!res.ok) {
    return Response.json(
      { ok: false, indexNowStatus: res.status, indexNowResponse: await res.text() },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, indexNowStatus: res.status, submitted: urlList });
}
