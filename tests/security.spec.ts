import { test, expect } from '@playwright/test';

test('production UI, local fonts, dialogs and QR work without policy violations', async ({ page }) => {
 const errors: string[] = [];
 const requests: string[] = [];
 page.on('pageerror', error => errors.push(error.message));
 page.on('request', request => requests.push(request.url()));
 await page.addInitScript(() => {
  (window as any).securityViolations = [];
  document.addEventListener('securitypolicyviolation', event => {
   (window as any).securityViolations.push(`${event.effectiveDirective}: ${event.blockedURI}`);
  });
 });
 const response = await page.goto('/');
 expect(response!.headers()['x-content-type-options']).toBe('nosniff');
 expect(response!.headers()['referrer-policy']).toBe('no-referrer');
 expect(response!.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
 await page.evaluate(() => document.fonts.ready);
 expect(await page.evaluate(() => document.fonts.check('400 14px "Inter Variable"'))).toBe(true);
 expect(await page.evaluate(() => document.fonts.check('400 14px "JetBrains Mono Variable"'))).toBe(true);
 await page.getByRole('button', { name: /Switch to .* theme/ }).click();
 await page.locator('.hero-ctas').getByRole('button', { name: 'More download options' }).click();
 await page.getByRole('button', { name: 'Take it with you', exact: true }).click();
 await expect(page.getByRole('dialog').locator('svg[role="img"], .qr svg')).toBeVisible();
 await page.getByRole('button', { name: 'Close dialog' }).click();
 await page.locator('.cover-button').first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button', { name: 'Close dialog' }).click();
 expect(await page.evaluate(() => (window as any).securityViolations)).toEqual([]);
 expect(errors).toEqual([]);
 expect(requests.filter(url => new URL(url).origin !== 'http://127.0.0.1:5173')).toEqual([]);
 expect(requests.some(url => /\.woff2(?:\?|$)/.test(url))).toBe(true);
});

test('GitHub Pages meta policy blocks injected scripts and off-site connections', async ({ page }) => {
 // GitHub Pages cannot emit our custom headers. Test its actual meta-only protection.
 await page.route('http://127.0.0.1:5173/', async route => {
  const response = await route.fetch();
  const headers = response.headers();
  delete headers['content-security-policy'];
  delete headers['x-frame-options'];
  await route.fulfill({ response, headers });
 });
 await page.goto('/');
 await expect(page.locator('h1')).toBeVisible();
 const policy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
 expect(policy).toContain("script-src 'self' 'sha256-");
 expect(policy).not.toContain("script-src 'self' 'unsafe-inline'");
 expect(policy).not.toContain("'unsafe-eval'");
 expect(policy).toContain("base-uri 'none'");
 const result = await page.evaluate(async () => {
  const state = window as any;
  const violations: string[] = [];
  document.addEventListener('securitypolicyviolation', event => violations.push(event.effectiveDirective));
  const injected = document.createElement('script');
  injected.textContent = 'window.unexpectedInlineExecuted = true';
  document.body.append(injected);
  const button = document.createElement('button');
  button.setAttribute('onclick', 'window.unexpectedHandlerExecuted = true');
  document.body.append(button);
  button.click();
  const base = document.createElement('base');
  base.href = 'https://example.com/';
  document.head.append(base);
  let connectionBlocked = false;
  try { await fetch('https://example.com/security-probe'); } catch { connectionBlocked = true; }
  await new Promise(resolve => setTimeout(resolve, 100));
  return { inlineExecuted: !!state.unexpectedInlineExecuted, handlerExecuted: !!state.unexpectedHandlerExecuted, connectionBlocked, baseURI: document.baseURI, violations };
 });
 expect(result.inlineExecuted).toBe(false);
 expect(result.handlerExecuted).toBe(false);
 expect(result.connectionBlocked).toBe(true);
 expect(result.baseURI).toBe('http://127.0.0.1:5173/');
 expect(result.violations).toContain('script-src-elem');
 expect(result.violations).toContain('script-src-attr');
 expect(result.violations).toContain('connect-src');
 expect(result.violations).toContain('base-uri');
});

test('stored theme is restricted to known values', async ({ page }) => {
 await page.addInitScript(() => localStorage.setItem('theme', 'unexpected-value'));
 await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-theme', /^(light|dark)$/);
});
