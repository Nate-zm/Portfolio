import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests',
 testMatch: '**/*.spec.ts',
 timeout: 60000,
 fullyParallel: false,
 workers: 1,
 forbidOnly: !!process.env.CI,
 use: {
  ...(process.env.CI ? { browserName: 'chromium' as const } : { channel: 'msedge' }),
  baseURL: 'http://127.0.0.1:5173',
  headless: true,
  viewport: { width: 1440, height: 900 },
  trace: 'retain-on-failure',
 },
 // Exercise the production bundle with its security policy enforced.
 webServer: {
  command: 'npm run preview -- --port 5173',
  url: 'http://127.0.0.1:5173',
  reuseExistingServer: false,
  timeout: 60000,
 },
});
