const { chromium } = require('playwright');
const scratchDir = 'C:\\Users\\Admin\\AppData\\Local\\Temp\\claude\\C--Users-Admin\\f30306cd-fe02-40e0-8c3b-74c1ce1e154a\\scratchpad';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });

  const s2 = await page.$('section[aria-label="The origin story"]');
  await s2.screenshot({ path: scratchDir + '\\s2-origin.png' });

  const s3 = await page.$('section[aria-label="The neurodivergent thread"]');
  await s3.screenshot({ path: scratchDir + '\\s3-nd.png' });

  const s4 = await page.$('section[aria-label="Why Build and Launch exists"]');
  await s4.screenshot({ path: scratchDir + '\\s4-why.png' });

  const s5 = await page.$('section[aria-label="How Tamika works"]');
  await s5.screenshot({ path: scratchDir + '\\s5-how.png' });

  const s6 = await page.$('section[aria-label="Continue the conversation"]');
  await s6.screenshot({ path: scratchDir + '\\s6-cta.png' });

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });
