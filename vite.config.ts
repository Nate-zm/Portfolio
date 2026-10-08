import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Framer Motion and Radix need inline styles. Executable inline scripts are
// allowed only by exact content hashes, never by 'unsafe-inline' or 'unsafe-eval'.
function contentSecurityPolicy(html: string, includeFraming = false) {
 const hashes = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(([, source]) => `'sha256-${createHash('sha256').update(source).digest('base64')}'`);
 return [
  "default-src 'none'",
  `script-src 'self' ${hashes.join(' ')}`.trim(),
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'none'",
  ...(includeFraming ? ["frame-ancestors 'none'"] : []),
  'upgrade-insecure-requests',
 ].join('; ');
}

const securityHeaders = {
 'X-Content-Type-Options': 'nosniff',
 'Referrer-Policy': 'no-referrer',
 'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
 'X-Frame-Options': 'DENY',
};

const securityPolicy: Plugin = {
 name: 'portfolio-security-policy',
 transformIndexHtml: {
  order: 'post',
  handler(html, context) {
   // Vite's development server needs its own inline refresh script and socket.
   // The production build and production browser tests enforce the real policy.
   if (context.server) return html;
   return [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy(html) }, injectTo: 'head-prepend' }];
  },
 },
};

export default defineConfig({
 plugins: [react(), securityPolicy],
 base: './',
 // Keep even tiny font files as local assets instead of data URIs, so font-src
 // can stay restricted to the site's origin.
 build: { assetsInlineLimit: 0 },
 server: { host: '127.0.0.1', strictPort: true, headers: securityHeaders },
 preview: {
  host: '127.0.0.1', strictPort: true,
  headers: {
   ...securityHeaders,
   'Content-Security-Policy': contentSecurityPolicy(readFileSync(new URL('./index.html', import.meta.url), 'utf8'), true),
  },
 },
});
