# File tree and complete source

Only allowlisted, Git-tracked source files are included. Public binary assets and local configuration are excluded.

```text
.github/dependabot.yml
.github/workflows/deploy.yml
.gitignore
LICENSES/tailwind-preflight.txt
README.md
SECURITY.md
index.html
package-lock.json
package.json
playwright.config.ts
postcss.config.js
public/robots.txt
public/sitemap.xml
scripts/assets.mjs
scripts/check-public.mjs
scripts/export-source.mjs
src/App.tsx
src/components/ConnectionNotes.tsx
src/components/ContactModal.tsx
src/components/PhoneContact.tsx
src/components/QrModal.tsx
src/components/TypewriterRole.tsx
src/components/ui/button.tsx
src/components/ui/dialog.tsx
src/data/content.ts
src/main.tsx
src/reset.css
src/styles.css
src/vite-env.d.ts
tests/phone-contact.spec.ts
tests/polish.spec.ts
tests/portfolio.spec.ts
tests/security.spec.ts
tests/security/deployment.test.mjs
tests/security/export-source.test.mjs
tests/security/public-assets.test.mjs
tsconfig.json
vite.config.ts
```

## .github/dependabot.yml

```
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
    groups:
      fonts:
        patterns:
          - '@fontsource-variable/*'
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly

```

## .github/workflows/deploy.yml

```
name: Verify and deploy portfolio
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: pages-${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4
        with:
          persist-credentials: false
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci --ignore-scripts
      - run: npm run audit:security
      - run: npm run test:security
      - run: npm run build
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
        env:
          CI: 'true'
      - uses: actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa # v3
        if: github.event_name != 'pull_request'
        with:
          path: dist
  deploy:
    if: github.event_name != 'pull_request'
    needs: build
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b # v5
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e # v4

```

## .gitignore

```
node_modules
dist
*.tsbuildinfo
test-results
playwright-report
.npm-cache
.tools
preview.png

# Local prompts and agent workspace files
prompt
prompt.*
prompts/
.agents/
.codex/
.aws/
credentials.json
secrets.json
*.pem
*.key
*.p12
*.pfx

# Local environment settings (keep shareable examples)
.env
.env.*
!.env.example
!.env.sample

# Logs and test coverage
*.log
coverage/

# Editor and operating system artifacts
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db
Desktop.ini

```

## LICENSES/tailwind-preflight.txt

```
MIT License

Copyright (c) Tailwind Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## README.md

````
# Engineering with intention

A static React 18 + TypeScript portfolio with custom CSS, shadcn-style Button and Radix dialog primitives, Framer Motion, and Lucide icons.

## Run

Use Node 22 or newer. On Windows PowerShell, use `npm.cmd` if the script execution policy blocks `npm`.

```sh
npm ci --ignore-scripts
npm run dev
npm run build
npm run preview
```

`dist/` is the complete deployable site. `npm run assets` regenerates SAMPLE CV PDFs, vCard, SVG artwork, and SOURCE.md; do not run it after replacing those assets with your real files.

## Personalize before publishing

- Update `src/data/content.ts`: name, initials, bio, location, timezone, email, social URLs, actual skills, projects, education, leadership, achievements, references, and CV paths.
- The CV download uses `public/assets/Nathanael Nyirenda CV.pdf`. Replace that file to update your CV, or change its path in `src/data/content.ts`. The contact download uses `your-name.vcf`. The displayed paper is a stylized preview, not a rendering of the PDF.
- Replace every `example.com`, `YOUR_USERNAME`, and zero-number WhatsApp link. Live/source buttons currently point to clearly marked placeholder URLs.
- Add project images in `public/assets/projects/`. Edit each project's `name` and `image` in `src/data/content.ts` (for example, `image: 'assets/projects/orbit.jpg'`). Missing or blank images keep the illustrated preview. Images fit inside the original padded covers without cropping; case-study dialogs show the full image.
- Change the title, description, Open Graph and Twitter metadata in `index.html`; use an absolute production image URL and a raster social card for widest platform compatibility. Replace favicon/social artwork. Add PNG/apple-touch icons if needed.
- Set the real domain in `public/sitemap.xml` and add its sitemap URL to `public/robots.txt`. JSON-LD uses the editable content automatically.
- Edit theme tokens in `src/styles.css`. Project covers are lightweight CSS interface illustrations; replace with real screenshots if desired.

## Deploy

GitHub Pages: push to `main`, then choose **Settings → Pages → Source → GitHub Actions**. The included workflow builds and uploads `dist`. Relative Vite base paths support repository subdirectories without hardcoded asset roots. Use `npm ci` once the lockfile exists.

Netlify: build command `npm run build`, publish directory `dist`. Vercel: Vite preset, build `npm run build`, output `dist`. No backend, secrets, or routing rewrites are needed. The form validates input and opens the visitor's email app; sending still requires their email client.

## Behavior and verification

CV controls use real download anchors, then a short preparation animation; they download prebuilt files, not dynamically generated CVs. A noscript download fallback is available. Radix dialogs/popovers provide keyboard focus management; Cmd/Ctrl+K opens the action palette. QR generation is lazy-loaded and uses the current deployment path. Localhost QR links require network access from the scanning device.

Reduced-motion preferences disable CSS animation and scroll behavior and are respected by reveal/filter animations. Responsive layout targets 360, 390, 768, 1024, 1440, and 1920 pixels. Fonts are hosted locally with system fallbacks. Lighthouse 95+ is a target, not an audited score; verify performance, contrast, SEO and accessibility on the final production site after replacing content.

`npm run export:source` updates `SOURCE.md` from allowlisted Git-tracked source files without touching personal assets. Binary PDFs are generated by `scripts/assets.mjs`; dependencies are reproduced from `package-lock.json`.

See [SECURITY.md](SECURITY.md) for the production security policy, automated checks, GitHub Pages header limitations, and repository/account settings. Run `npm run build` followed by `npm run test:e2e` to check the production site; the tests start their own local preview server.


````

## SECURITY.md

````
# Security and maintenance

This is a public static portfolio, without accounts, a backend, a database, or an email submission API. The contact form opens the visitor's email client. Never put secrets in browser code, Vite environment variables, or `public/`.

## Enforced protections

- Production HTML includes a Content Security Policy. Scripts are restricted to the site's origin and exact hashes of the reviewed inline theme bootstrap. Inline event handlers, eval, embedded objects, form submissions, unexpected external connections, and base URL changes are blocked. Fonts and images are local; the CSS texture uses a data URI. Framer Motion and Radix require inline styles, so the style policy allows them.
- The page uses a `no-referrer` policy. Google Fonts requests have been replaced by packaged local fonts.
- Development and preview servers bind to `127.0.0.1`. For intentional phone testing on a trusted network, opt in using `npm run dev -- --host 0.0.0.0`.
- The unused Tailwind compiler and its vulnerable glob/parser dependencies have been removed. The existing reset and base utilities are preserved as static CSS, with their MIT license in `LICENSES/`.
- Source exports include only allowlisted, Git-tracked files. Local configuration, hidden directories, untracked files, public binaries, and symlinks are excluded. Use `npm run export:source`; it does not regenerate personal assets. Do not run `npm run assets` after customizing PDFs or contact files.
- Before every build, the public asset guard rejects hidden configuration, credential filenames, symlinks, and unreviewed file types such as scripts and source maps. This prevents accidentally copying local files into the deployment. It does not inspect the personal information inside documents.
- CI installs locked dependencies with lifecycle scripts disabled, audits all dependencies, tests source-export isolation, builds the site, and runs production browser tests before deployment. Actions are pinned to commit hashes. Build and pull-request jobs have read-only repository access; only the separate deployment job receives Pages and OIDC permissions. Checkout does not persist credentials. Dependabot proposes weekly dependency and action updates.

## Hosting limitations

GitHub Pages provides HTTPS and HSTS but does not apply project-defined response headers. The production meta CSP and referrer policy work on Pages. The local preview additionally sets framing protection, `nosniff`, and a permissions policy to demonstrate the desired full configuration.

To enforce those additional protections publicly, use a host or proxy that supports custom HTTP headers. Do not put `frame-ancestors` in a meta CSP: browsers ignore it there. A future hosting configuration should emit:

```text
Content-Security-Policy: <the generated production meta policy>; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

Preserve HTTPS/HSTS, and serve PDFs and vCards with their correct content types. Do not change hosting solely to add these headers without weighing the maintenance cost for this static site.

## Repository settings and personal information

Repository/account settings are separate from files in this checkout:

- Use a passkey or strong two-factor authentication on GitHub, review account sessions and app access, and protect recovery codes.
- Require pull requests and the `build` check for `main` once that workflow has run. Limit bypass permissions, and restrict the `github-pages` deployment environment to `main`.
- Enable dependency alerts, security updates, and secret scanning/push protection where available for the repository.
- Treat the email address, phone numbers, public CV, vCard, and old Git revisions as public information. Review PDFs for home addresses, signatures, identity numbers, private references, and document metadata before publishing. Removing a file does not remove cached copies or its Git history. If a credential is ever committed, revoke it immediately before cleaning up history.

The repository has HTTPS enforcement, secret scanning, push protection, dependency alerts, and automatic security-update pull requests enabled. Its default workflow token is read-only and cannot approve pull requests. The Pages environment is restricted to the `main` branch. Account passkeys/two-factor authentication and recovery settings must be managed by the account owner.

## Verification

```sh
npm ci --ignore-scripts
npm run audit:security
npm run test:security
npm run build
npm run test:e2e
```

Local browser tests use installed Microsoft Edge. CI installs Chromium. Browser tests run against the production build, including a meta-only test matching GitHub Pages: injected scripts/event handlers, external fetches, and base URL changes must be blocked while normal dialogs, QR generation, fonts, and downloads keep working.

Review dependency update pull requests and rerun these checks. Audit results describe known advisories at the time of the scan, not a guarantee that every possible vulnerability is absent.

## Reporting

Report suspected security issues privately using the owner's contact address shown on the site. Do not post credentials or personal documents in public issues.

````

## index.html

```
<!doctype html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="referrer" content="no-referrer"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#090b11"/><meta name="description" content="Portfolio of a KNRTU graduate working in software engineering, systems administration, and design."/><meta property="og:title" content="Nathanael Nyirenda - portfolio"/><meta property="og:description" content="Software, systems, and everything in between."/><meta property="og:type" content="website"/><meta property="og:url" content="https://nate-zm.github.io/Portfolio/"/><meta property="og:image" content="https://nate-zm.github.io/Portfolio/thumbnail.png?v=1"/><meta property="og:image:type" content="image/png"/><meta property="og:image:width" content="1672"/><meta property="og:image:height" content="941"/><meta property="og:image:alt" content="Nate Nyirenda, software engineer — ideas, code, design, and impact."/><meta property="og:site_name" content="Nathanael Nyirenda - Portfolio"/><meta name="twitter:title" content="Nathanael Nyirenda - portfolio"/><meta name="twitter:description" content="Software, systems, and everything in between."/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="https://nate-zm.github.io/Portfolio/thumbnail.png?v=1"/><meta name="twitter:image:alt" content="Nate Nyirenda, software engineer — ideas, code, design, and impact."/><link rel="icon" href="./favicon.svg"/><title>Nathanael Nyirenda - portfolio</title><script>try{const saved=localStorage.getItem('theme');document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{document.documentElement.dataset.theme='dark'}</script></head><body><div id="root"></div><noscript><p>This portfolio needs JavaScript. <a href="./assets/Nathanael%20Nyirenda%20CV.pdf?v=7d297cbb4074" download>Download CV for Nathanael Nyirenda (PDF)</a> or <a href="mailto:n8.vision.00@gmail.com">contact the owner</a>.</p></noscript><script type="module" src="/src/main.tsx"></script></body></html>

```

## package.json

```
{
  "name": "signal-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "prebuild": "node scripts/check-public.mjs",
    "preview": "vite preview",
    "assets": "node scripts/assets.mjs",
    "export:source": "node scripts/export-source.mjs",
    "test:security": "node --test tests/security/*.test.mjs",
    "audit:security": "npm audit --audit-level=moderate",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.3.0",
    "@fontsource-variable/jetbrains-mono": "^5.3.0",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "qrcode.react": "^4.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.1",
    "@types/node": "^22.20.5",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "pdf-lib": "^1.17.1",
    "postcss": "^8.4.49",
    "typescript": "~5.7.2",
    "vite": "^6.0.5"
  }
}

```

## playwright.config.ts

```
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

```

## postcss.config.js

```
export default {plugins:{autoprefixer:{}}};

```

## public/robots.txt

```
User-agent: *
Allow: /
Sitemap: https://nate-zm.github.io/Portfolio/sitemap.xml

```

## public/sitemap.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://nate-zm.github.io/Portfolio/</loc></url></urlset>

```

## scripts/assets.mjs

```
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { mkdir, writeFile } from 'node:fs/promises';
import { exportSource } from './export-source.mjs';
await mkdir('public/assets',{recursive:true});
for (const designed of [true,false]) {
 const pdf=await PDFDocument.create();const page=pdf.addPage([595,842]);const font=await pdf.embedFont(StandardFonts.Helvetica);const bold=await pdf.embedFont(StandardFonts.HelveticaBold);
 if(designed){page.drawRectangle({x:0,y:725,width:595,height:117,color:rgb(.12,.11,.2)});page.drawRectangle({x:45,y:717,width:505,height:3,color:rgb(.5,.45,.85)})}
 const text=(value,x,y,size=11,isBold=false,color=rgb(.2,.2,.27))=>page.drawText(value,{x,y,size,font:isBold?bold:font,color});
 text('NATHANAEL NYIRENDA',45,785,30,true,designed?rgb(1,1,1):undefined);text('SOFTWARE ENGINEER & INFORMATION SYSTEMS ADMINISTRATOR',45,755,9,false,designed?rgb(.8,.8,.9):undefined);
 let y=675;for(const [heading,lines] of [['SAMPLE DOCUMENT - REPLACE BEFORE PUBLISHING',['This is a working sample CV download, not a statement of qualifications.','Replace both PDF files with your own verified resume.']],['PROFILE',['Computer science graduate of KNRTU, Kazan.','Focus: web development and systems administration.']],['EDUCATION',['KNRTU - Department of Intelligent Systems and','Information Resource Management. Add your dates and qualification.']],['SKILLS - EDIT TO MATCH YOUR EXPERIENCE',['TypeScript / React / Node.js / Python / PostgreSQL','Linux / Windows Server / Networking / Docker / Cloud']],['PROJECTS - ADD YOUR REAL WORK',['Replace the portfolio sample concepts with confirmed projects.','Include the problem, your contribution, and measurable results.']],['CONTACT - PLACEHOLDER',['n8.vision.00@gmail.com | Lusaka, Zambia','github.com/YOUR_USERNAME']]]){text(heading,45,y,10,true);y-=25;for(const line of lines){text(line,45,y);y-=19}y-=25}
 text('Sample portfolio asset | October 2026',45,40,8);await writeFile(`public/assets/your-name-CV${designed?'':'-ATS'}.pdf`,await pdf.save());
}
await writeFile('public/assets/your-name.vcf','BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Nathanael Nyirenda\r\nN:Nyirenda;Nathanael;;;\r\nEMAIL:n8.vision.00@gmail.com\r\nTITLE:Software Engineer and Systems Administrator\r\nNOTE:Software engineering and systems administration\r\nEND:VCARD\r\n');
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#11141d"/><text x="9" y="43" font-family="sans-serif" font-weight="bold" font-size="27" fill="#aaa1ff">NN</text></svg>';
await writeFile('public/favicon.svg',svg);
await writeFile('public/social.svg','<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#090b11"/><circle cx="1000" cy="320" r="240" stroke="#7771b8" stroke-opacity=".25" fill="none"/><text x="90" y="150" fill="#a8a2ee" font-family="sans-serif" font-size="22">NATHANAEL NYIRENDA / SOFTWARE &amp; SYSTEMS</text><text x="85" y="295" fill="#f0f1f6" font-family="sans-serif" font-size="88">Engineering</text><text x="85" y="395" fill="#a8a2ee" font-family="sans-serif" font-size="88">with intention.</text><text x="90" y="510" fill="#959aab" font-family="sans-serif" font-size="25">Web development, systems administration, and design.</text></svg>');
// Only reviewed, tracked source files are included.
await exportSource();

```

## scripts/check-public.mjs

```
import { readdir, lstat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const assetTypes = new Set(['.pdf', '.vcf', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff2', '.txt', '.xml', '.md']);

export async function checkPublicAssets(root = 'public') {
 async function walk(directory) {
  for (const name of await readdir(directory)) {
   const path = join(directory, name);
   const stat = await lstat(path);
   if (name.startsWith('.') || /(?:credentials?|secrets?|passwords?|private[-_.]key)/i.test(name)) throw new Error(`Private configuration must not be published: ${path}`);
   if (stat.isSymbolicLink()) throw new Error(`Public assets must not contain symlinks: ${path}`);
   if (stat.isDirectory()) await walk(path);
   else if (!stat.isFile() || !assetTypes.has(extname(name).toLowerCase())) throw new Error(`Unreviewed public asset type: ${path}`);
  }
 }
 await walk(root);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
 await checkPublicAssets();
 console.log('Public assets contain only reviewed asset types; no hidden configuration or symlinks.');
}

```

## scripts/export-source.mjs

````
import { execFileSync } from 'node:child_process';
import { lstat, readFile, realpath, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootFiles = new Set([
 'README.md', 'SECURITY.md', '.gitignore', 'index.html', 'package.json',
 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'playwright.config.ts',
 'postcss.config.js', 'public/robots.txt', 'public/sitemap.xml',
]);
const sourcePath = /^(?:src|scripts|tests|LICENSES)\/[\w./-]+\.(?:tsx?|css|js|mjs|json|md|txt)$/;
const workflowPath = /^\.github\/(?:workflows\/[\w-]+\.yml|dependabot\.yml)$/;

export function isExportable(path) {
 // Hidden directories, traversal, credentials, and local configuration stay out,
 // even if somebody accidentally stages them in Git.
 if (path.split('/').some(part => part === '..' || (part.startsWith('.') && part !== '.github' && part !== '.gitignore'))) return false;
 if (/(?:^|\/)(?:credentials|secrets?)(?:[./-]|$)/i.test(path)) return false;
 return rootFiles.has(path) || sourcePath.test(path) || workflowPath.test(path);
}

export async function collectSourceFiles(root = process.cwd()) {
 const rootPath = await realpath(root);
 const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: rootPath, encoding: 'utf8' }).split('\0').filter(Boolean);
 const files = [];
 for (const path of tracked.filter(isExportable).sort()) {
  const absolute = resolve(rootPath, path);
  let stat;
  try { stat = await lstat(absolute); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  if (!stat.isFile() || stat.isSymbolicLink()) continue;
  const relation = relative(rootPath, await realpath(absolute));
  if (isAbsolute(relation) || relation === '..' || relation.startsWith(`..${sep}`)) throw new Error(`Source file escapes the project: ${path}`);
  files.push(path);
 }
 return files;
}

export async function exportSource(root = process.cwd()) {
 const files = await collectSourceFiles(root);
 let source = '# File tree and complete source\n\nOnly allowlisted, Git-tracked source files are included. Public binary assets and local configuration are excluded.\n\n```text\n' + files.join('\n') + '\n```\n';
 for (const file of files.filter(file => file !== 'package-lock.json')) {
  const contents = await readFile(resolve(root, file), 'utf8');
  const longest = Math.max(2, ...[...contents.matchAll(/`+/g)].map(match => match[0].length));
  const fence = '`'.repeat(longest + 1);
  source += `\n## ${file}\n\n${fence}\n${contents}\n${fence}\n`;
 }
 await writeFile(resolve(root, 'SOURCE.md'), source);
 return files;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
 const files = await exportSource();
 console.log(`Exported ${files.length} reviewed source files.`);
}

````

## src/App.tsx

```
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Download, Sun, Moon, Command, Github, Mail, Linkedin, Send, MessageCircle, Check, ChevronDown, ChevronLeft, ChevronRight, QrCode, Copy, Menu, Terminal, Server, Code2, Layers, MapPin, ExternalLink } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { content, asset } from './data/content';
import TypewriterRole from './components/TypewriterRole';
import ConnectionNotes from './components/ConnectionNotes';
import ContactModal from './components/ContactModal';
import PhoneContact from './components/PhoneContact';
import { Button } from './components/ui/button';
import { Modal } from './components/ui/dialog';
const QrModal=lazy(()=>import('./components/QrModal'));
type Project=typeof content.projects[number];
const sections=['About','Skills','Projects','Journey','Contact'];
function Reveal({children,className=''}:{children:ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.5}}>{children}</motion.div>}
function Counter({value}:{value:number}){const [n,setN]=useState(0);const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedMotion();useEffect(()=>{let timer:ReturnType<typeof setInterval>;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){observer.disconnect();if(reduced){setN(value);return}let v=0;timer=setInterval(()=>{v++;setN(v);if(v>=value)clearInterval(timer)},120)} });if(ref.current)observer.observe(ref.current);return()=>{observer.disconnect();clearInterval(timer)}},[value,reduced]);return <span ref={ref}>{n.toString().padStart(2,'0')}</span>}
function CVButton({compact=false,onQR,onContact}:{compact?:boolean;onQR:()=>void;onContact:()=>void}){
 const [started,setStarted]=useState(false);const [optionsOpen,setOptionsOpen]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>>();
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const download=()=>{setStarted(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setStarted(false),1800)};
 return <div className="cv-action"><div className="split-button"><a className="button button-primary magnetic" href={asset(content.cv[0].path)} download onClick={download}>{started?<Check size={17}/>:<Download size={17}/>} {started?'Download started':compact?'Get CV':'Download CV'}</a><Popover.Root open={optionsOpen} onOpenChange={setOptionsOpen}><Popover.Trigger className="format-trigger" aria-label="More download options"><ChevronDown size={16}/></Popover.Trigger><Popover.Portal><Popover.Content className="popover" sideOffset={8}><span className="eyebrow">CV & CONTACT</span><a className="format-option" href={asset(content.cv[0].path)} target="_blank" rel="noopener noreferrer" onClick={()=>setOptionsOpen(false)}>View CV <ExternalLink size={16}/></a><a className="format-option" href={asset(content.cv[0].path)} download onClick={()=>{download();setOptionsOpen(false)}}>CV (PDF) <Download size={16}/></a><button className="format-option" onClick={()=>{setOptionsOpen(false);onContact()}}>Save my contact <Mail size={16}/></button><button className="format-option" onClick={()=>{setOptionsOpen(false);onQR()}}>Take it with you <QrCode size={16}/></button><Popover.Arrow className="popover-arrow"/></Popover.Content></Popover.Portal></Popover.Root></div><span className="sr-only" aria-live="polite">{started?'Download started.': 'Download CV as PDF'}</span></div>
}
function ProjectCover({project}:{project:Project}){const [failed,setFailed]=useState('');return project.image&&failed!==project.image?<div className={`project-cover project-image ${project.cover}`}><div className="project-image-frame"><img src={asset(project.image)} alt="" loading="lazy" decoding="async" onError={()=>setFailed(project.image)}/></div></div>:<Cover type={project.cover}/>}
function Cover({type}:{type:string}){return <div className={`project-cover ${type}`} aria-hidden="true">{type==='orbit'?<div className="mock-window"><div className="mock-top"><i/><i/><i/><span>orbit / workspace</span></div><div className="mock-layout"><div className="mock-sidebar">o.<br/><br/><span>Overview</span><br/>Projects<br/>Activity</div><div className="mock-body"><small>YOUR WORK, IN FOCUS</small><strong>Make room for good work.</strong><div className="mock-columns">{['To do','In progress','Done'].map((x,i)=><div key={x}><small>{x}</small><b/><b/><b style={{opacity:.3+i*.2}}/></div>)}</div></div></div></div>:type==='pulse'?<div className="pulse-ui"><div><span className="status-dot"/> ALL SYSTEMS OPERATIONAL <Server size={18}/></div><strong>99.98<span>%</span></strong><small>UPTIME / LAST 30 DAYS</small><div className="bars">{Array.from({length:30},(_,i)=><i key={i} style={{height:`${25+(i*37)%65}%`}}/>)}</div><footer>api-server <span>24 ms ↗</span></footer></div>:type==='atlas'?<div className="atlas-ui"><Layers size={30}/><strong>A little more<br/>understanding.</strong><span>KNOWLEDGE, CONNECTED.</span><div>Research <b>12</b></div><div>Systems <b>08</b></div></div>:<div className="terminal-ui"><div><i/> deploy-toolkit  -  bash</div><p><em>~</em> $ deploy production</p><p>✓ Environment verified</p><p>✓ Containers healthy</p><p>✓ Backup complete</p><p className="terminal-success">Deployment successful. <span>▌</span></p></div>}</div>}
export default function App(){const [theme,setTheme]=useState(document.documentElement.dataset.theme||'dark');const [menu,setMenu]=useState(false);const [active,setActive]=useState('');const [filter,setFilter]=useState('All');const [project,setProject]=useState<Project|null>(null);const [palette,setPalette]=useState(false);const [query,setQuery]=useState('');const [qr,setQr]=useState(false);const [contactOpen,setContactOpen]=useState(false);const [toast,setToast]=useState('');const [floating,setFloating]=useState(false);const [time,setTime]=useState('');const hero=useRef<HTMLElement>(null);const toastTimer=useRef<ReturnType<typeof setTimeout>>();const reduced=useReducedMotion();
function toggleTheme(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem('theme',next)}catch{}}
function notify(message:string){setToast(message);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3000)}
async function copyEmail(){try{await navigator.clipboard.writeText(content.email);notify('Email copied to clipboard')}catch{notify(`Email: ${content.email}`)}}
useEffect(()=>{
 const updateHeader=()=>document.documentElement.classList.toggle('header-scrolled',window.scrollY>0);
 updateHeader();
 window.addEventListener('scroll',updateHeader,{passive:true});
 return()=>{window.removeEventListener('scroll',updateHeader);document.documentElement.classList.remove('header-scrolled')};
},[]);
useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(p=>!p)}};document.addEventListener('keydown',key);const mobile=window.matchMedia('(max-width: 767px)');let heroVisible=true;let resumeVisible=false;const updateFloating=()=>setFloating(!heroVisible&&!(mobile.matches&&resumeVisible));const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero.current)heroVisible=entry.isIntersecting;else resumeVisible=entry.isIntersecting}updateFloating()},{threshold:.08});if(hero.current)observer.observe(hero.current);const resume=document.querySelector('.resume-section');if(resume)observer.observe(resume);mobile.addEventListener('change',updateFloating);const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-20% 0px -55% 0px'});sections.forEach(s=>{const el=document.getElementById(s.toLowerCase());if(el)navObserver.observe(el)});const clock=()=>setTime(new Intl.DateTimeFormat('en-GB',{timeZone:content.timezone,hour:'2-digit',minute:'2-digit'}).format(new Date()));clock();const timer=setInterval(clock,30000);const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Person',name:content.name,jobTitle:content.role,email:content.email,sameAs:Object.values(content.links)});document.head.append(schema);return()=>{document.removeEventListener('keydown',key);observer.disconnect();mobile.removeEventListener('change',updateFloating);navObserver.disconnect();clearInterval(timer);clearTimeout(toastTimer.current);schema.remove()}},[]);
const actions=[{label:'Download CV',run:()=>{const a=document.createElement('a');a.href=asset(content.cv[0].path);a.download='';a.click()},icon:Download},{label:'Copy email',run:copyEmail,icon:Copy},{label:'Open GitHub',href:content.links.github,icon:Github},{label:'Jump to Projects',href:'#projects',icon:Layers},{label:'Toggle theme',run:toggleTheme,icon:Sun}];
return <><a className="skip-link" href="#main">Skip to content</a><header className="nav-shell"><a href="#" className="brand" aria-label="Back to top">{content.initials}<span> / </span></a><nav aria-label="Main navigation" className="desktop-nav">{sections.map(s=><a key={s} href={`#${s.toLowerCase()}`} className={active===s.toLowerCase()?'active':''} aria-current={active===s.toLowerCase()?'location':undefined}>{s}</a>)}</nav><div className="nav-actions"><button className="icon-button command-button" aria-label="Open command palette" onClick={()=>setPalette(true)}><Command size={16}/><kbd>K</kbd></button><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-button mobile-toggle" aria-label="Open navigation" onClick={()=>setMenu(true)}><Menu size={20}/></button></div></header>
<ContactModal open={contactOpen} onOpenChange={setContactOpen}/><main id="main"><section className="hero container" ref={hero}><div className="hero-glow"/><motion.div initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="hero-content"><div className="availability"><span className="status-dot"/>{content.status}<ArrowUpRight size={13}/></div><p className="hero-intro"><span><span className="intro-code-keyword">HELLO</span> <span className="intro-code-string">WORLD</span>, I’M {content.name.toUpperCase()}</span><span className="intro-line"/></p><p className="hero-present">I present to you</p><h1>Engineering<br/>with <span className="gradient-text">intention.</span><span className="heading-dot">.</span></h1><p className="primary-role">{content.role}</p><TypewriterRole/><p className="hero-description">{content.tagline}</p><div className="hero-ctas"><CVButton onQR={()=>setQr(true)} onContact={()=>setContactOpen(true)}/><a href="#projects" className="button button-outline">Explore my work <ArrowUpRight size={17}/></a><a href="#contact" className="hero-contact">Let’s talk <ArrowUpRight size={15}/></a></div><div className="hero-meta"><span><MapPin size={14}/>{content.location}</span><span className="meta-divider"/><span>KNRTU graduate · Computer Science</span></div></motion.div><div className="hero-art" aria-hidden="true"><div className="orbital-ring ring-one"/><div className="orbital-ring ring-two"/><div className="orbital-ring ring-three"/><div className="art-core"><Code2 size={56}/></div><span className="art-label label-one">BUILD WITH PURPOSE</span><span className="art-label label-two">SYSTEMS ONLINE <i/></span><span className="art-coordinate">15.3875° S / 28.3228° E</span><div className="art-node node-one"><Terminal size={20}/></div><div className="art-node node-two"><Server size={20}/></div><span className="orbit-point"/></div><a className="scroll-cue" href="#about"><ArrowDown size={15}/> A LITTLE MORE ABOUT ME <span>SCROLL TO EXPLORE</span></a></section>
<div className="section-divider container"><span>CURIOUS BY NATURE. ENGINEER BY PRACTICE.</span><span>PORTFOLIO / 2026</span></div>
<section id="about" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">01 / THE PERSON BEHIND THE CODE</p><h2>A builder at heart.</h2></div><p>I work on the interface<br/>and what happens behind it.</p></div></Reveal><div className="about-grid"><Reveal className="glass bio-card"><span className="card-label">A LITTLE ABOUT ME <ArrowUpRight size={17}/></span><h3>Building practical solutions.<br/><span className="muted">With care and purpose.</span></h3><p>{content.bio}</p><a href="#journey" className="text-link">My journey so far <ArrowUpRight size={16}/></a><div className="stats">{content.stats.map(s=><div key={s.label}><strong><Counter value={s.value}/></strong><small>{s.label}</small></div>)}</div></Reveal><Reveal className="glass currently-card"><span className="card-label"><span className="status-dot"/> CURRENTLY</span>{content.currently.map((item,i)=><div className="currently-item" key={item.label}><span className="currently-icon">{i===0?<Code2 size={18}/>:i===1?<Terminal size={18}/>:<Layers size={18}/>}</span><div><small>{item.label}</small><p>{item.value}</p></div></div>)}<div className="currently-footer">Build, develop, and learn.<span className="status-dot"/></div></Reveal></div></section>
<section id="skills" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">02 / MY TOOLKIT</p><h2>Skills I bring<br/><span className="muted">to a project.</span></h2></div><p>The tools I use to build,<br/>design, and keep things running.</p></div></Reveal><p className="skill-swipe-hint">Swipe to explore my toolkit <ArrowUpRight size={14}/></p><div className="skills-grid" tabIndex={0} role="region" aria-label="Skills and design tools">{content.skills.map((s,i)=><Reveal key={s.title} className="glass skill-card"><span className="skill-number">0{i+1}</span><span className="skill-code">{s.code}</span><h3>{s.title}</h3><p>{s.description}</p><div className="chips">{s.items.map(x=><span key={x}>{x}</span>)}</div><div className="skill-overview"><div className="skill-overview-label"><span>Estimated proficiency</span><strong>{s.level}%</strong></div><div className="skill-meter" role="meter" aria-label={`${s.title} estimated proficiency`} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${s.level}%`}}/></div></div></Reveal>)}</div></section>
<section id="projects" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">03 / SELECTED WORK</p><h2>Ideas, made real<span className="accent">.</span></h2></div><a href={content.links.github} target="_blank" rel="noopener noreferrer" className="text-link">More on GitHub <ArrowUpRight size={16}/></a></div><div className="project-toolbar"><div className="filters" aria-label="Project categories">{['All','Web','Systems','Design'].map(f=><button key={f} aria-pressed={filter===f} className={f===filter?'selected':''} onClick={()=>setFilter(f)}>{f}{f==='All'&&<span>04</span>}</button>)}</div><span className="small muted">WEB / SYSTEMS / DESIGN</span></div></Reveal><motion.div layout={!reduced} className="projects-grid"><AnimatePresence mode="popLayout">{content.projects.filter(p=>filter==='All'||p.category===filter).map(p=><motion.article layout={!reduced} key={p.id} className="glass project-card" initial={reduced?false:{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} transition={{duration:reduced?0:.25}}><button className="cover-button" onClick={()=>setProject(p)} aria-label={`Read ${p.name} case study`}><ProjectCover project={p}/><span className="cover-arrow"><ArrowUpRight size={22}/></span></button><div className="project-info"><div className="project-topline"><span className="eyebrow">{p.category} / {p.label}</span><span className="project-number">{p.number}</span></div><button className="project-title" onClick={()=>setProject(p)}>{p.name}<ArrowUpRight size={20}/></button><p>{p.description}</p><div className="project-footer"><div className="chips">{p.stack.map(x=><span key={x}>{x}</span>)}</div>{(p.live||p.source)&&<div className="project-links">{p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live demo`}><ExternalLink size={16}/><span>Live</span></a>}{p.source&&<a href={p.source} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source`}><Github size={16}/><span>Source</span></a>}</div>}</div></div></motion.article>)}</AnimatePresence></motion.div></section>
<section className="section container resume-section"><Reveal className="glass resume-card"><div><p className="eyebrow">THE SHORT VERSION OF MY STORY</p><h2>My experience,<br/><span className="gradient-text">at a glance.</span></h2><p>My experience, education, and skills.<br/>A quick way to get to know my work.</p><div className="resume-actions"><CVButton onQR={()=>setQr(true)} onContact={()=>setContactOpen(true)}/><button className="icon-button" onClick={()=>setQr(true)} aria-label="Show CV QR code"><QrCode size={20}/></button></div><div className="resume-meta"><span className="update-badge">Updated {content.updated}</span><span>PDF / Résumé</span></div></div><a href={asset(content.cv[0].path)} download className="paper-wrap" aria-label="Download CV for Nathanael Nyirenda"><div className="paper"><div className="paper-top"><span>{content.initials}.</span><ArrowUpRight size={18}/></div><h3>{content.name}</h3><p>SOFTWARE ENGINEER & SYSTEMS ADMINISTRATOR</p><div className="paper-rule"/><small>PROFILE</small><div className="paper-lines"><i/><i/><i/></div><small>EXPERIENCE & EDUCATION</small><div className="paper-lines"><i/><i/><i/><i/></div><small>TECHNICAL SKILLS</small><div className="paper-chips"><i/><i/><i/></div><span className="paper-footer">NATHANAEL NYIRENDA · RÉSUMÉ</span><span className="page-peel"/></div><span className="paper-caption">A QUICK LOOK AT MY EXPERIENCE.</span></a></Reveal></section>
<section id="journey" className="section container"><div className="journey-grid"><Reveal><p className="eyebrow">04 / THE JOURNEY</p><h2>Experience<br/><span className="muted">and education.</span></h2><p className="journey-intro">From computer science at Kazan National Research Technological University (KNRTU)<br/>to design, development, and student leadership.</p></Reveal><div className="timeline">{content.timeline.map((item,i)=><Reveal key={item.title} className="timeline-item"><span className={`timeline-dot ${i===0?'current':''} ${item.date==='Next chapter'?'in-progress':''}`}/><span className="eyebrow">{item.date}</span><h3>{item.title}</h3><span className="timeline-org">{item.organization}</span><p>{item.description}</p></Reveal>)}</div></div><div className="badges-label eyebrow">EDUCATION, WORK & LEADERSHIP</div><div className="marquee"><div className="marquee-track">{[...content.badges,...content.badges].map((b,i)=><span className="badge" key={i} aria-hidden={i>=content.badges.length?true:undefined}><Check size={14}/>{b}</span>)}</div></div></section>
<section className="section container"><Reveal><ConnectionNotes/></Reveal></section>
<section id="contact" className="section container contact-section"><Reveal><div className="availability"><span className="status-dot"/> LET’S WORK TOGETHER</div><h2>Let’s build<br/><span className="gradient-text">what’s next.</span><ArrowUpRight className="contact-arrow"/></h2><p>Have a project or a role in mind?<br/>I’d be happy to hear about it.</p></Reveal><div className="contact-grid"><Reveal><div className="email-row"><a href={`mailto:${content.email}`}>{content.email}<ArrowUpRight size={21}/></a><button className="icon-button" aria-label="Copy email address" onClick={copyEmail}><Copy size={18}/></button></div><div className="phone-contacts" aria-label="Phone numbers">{content.phones.map((phone,i)=><PhoneContact key={phone} phone={phone} label={i===0?'Russia':'Zambia'} display={i===0?'+7 987 422 66 50':'+260 776 612 267'}/>)}</div><div className="socials">{[{name:'GitHub',icon:Github,url:content.links.github},{name:'LinkedIn',icon:Linkedin,url:content.links.linkedin},{name:'Telegram',icon:Send,url:content.links.telegram},{name:'WhatsApp',icon:MessageCircle,url:content.links.whatsapp}].map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} profile`}><s.icon size={20}/><span>{s.name}</span><ArrowUpRight size={13}/></a>)}</div></Reveal><Reveal><form className="contact-form" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);window.location.href=`mailto:${content.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`)}&body=${encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`)}`;notify('Opening your email app. Send the message there.')}}><div className="form-row"><label>Your name<input name="name" required maxLength={100} placeholder="Alex Morgan" autoComplete="name"/></label><label>Email address<input name="email" type="email" required maxLength={200} placeholder="alex@company.com" autoComplete="email"/></label></div><label>What do you have in mind?<textarea name="message" required minLength={10} maxLength={3000} placeholder="A little about your project…" rows={3}/></label><Button variant="outline" type="submit">Continue in email <ArrowUpRight size={16}/></Button><span className="small muted">Review and send your message in your email app.</span></form></Reveal></div></section></main>
<footer className="container footer"><a className="brand" href="#">{content.initials}<span> / </span></a><span>© 2026 {content.name}</span><span><span className="status-dot"/> {time} · {content.location.split(',')[0]}</span><a href="#" className="text-link">Back to top <ArrowUpRight size={14}/></a></footer>
<AnimatePresence>{floating&&<motion.div className="floating-cv" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={reduced?{opacity:0}:{opacity:0,y:20}}><span className="floating-label">Like what you see?</span><CVButton compact onQR={()=>setQr(true)} onContact={()=>setContactOpen(true)}/></motion.div>}</AnimatePresence>
<Modal open={menu} onOpenChange={setMenu} title="Explore" description="Find your way around."><nav className="mobile-menu" aria-label="Mobile navigation">{sections.map(s=><a key={s} href={`#${s.toLowerCase()}`} onClick={()=>setMenu(false)} aria-current={active===s.toLowerCase()?'location':undefined}>{s}<ArrowUpRight size={24}/></a>)}</nav></Modal>
<Modal open={!!project} onOpenChange={v=>{if(!v)setProject(null)}} title={project?.name||'Project'} description="Project overview.">{project&&<><ProjectCover project={project}/>{project.image&&<a className="text-link project-image-link" href={asset(project.image)} target="_blank" rel="noopener noreferrer">View full-size image <ExternalLink size={16}/></a>}{['problem','solution','outcome'].map(k=><div className="case-block" key={k}><h3>{k==='problem'?'The brief':k==='solution'?'The approach':'The outcome'}</h3><p>{project[k as 'problem'|'solution'|'outcome']}</p></div>)}{(project.live||project.source)&&<div className="modal-links">{project.live&&<a className="button button-primary" href={project.live} target="_blank" rel="noopener noreferrer">Live demo <ExternalLink size={16}/></a>}{project.source&&<a className="button button-outline" href={project.source} target="_blank" rel="noopener noreferrer">Source <Github size={16}/></a>}</div>}</>}</Modal>
<Modal open={palette} onOpenChange={v=>{setPalette(v);if(!v)setQuery('')}} title="Command center" description="Your next action, one shortcut away."><label className="sr-only" htmlFor="command-search">Search actions</label><input id="command-search" className="command-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="What would you like to do?"/><div className="command-list">{actions.filter(a=>a.label.toLowerCase().includes(query.toLowerCase())).map(a=>a.href?<a key={a.label} href={a.href} target={a.href.startsWith('https')?'_blank':undefined} rel={a.href.startsWith('https')?'noopener noreferrer':undefined} onClick={()=>setPalette(false)}><a.icon size={18}/>{a.label}<ArrowUpRight size={15}/></a>:<button key={a.label} onClick={()=>{a.run?.();setPalette(false)}}><a.icon size={18}/>{a.label}<span>↵</span></button>)}{!actions.some(a=>a.label.toLowerCase().includes(query.toLowerCase()))&&<p className="muted">No matching actions.</p>}</div><span className="small muted">Tab to navigate · Enter to select · Esc to close</span></Modal>
{qr&&<Suspense fallback={<div className="toast" role="status">Preparing QR code…</div>}><QrModal open={qr} onOpenChange={setQr}/></Suspense>}<div className={`toast ${toast?'visible':''}`} role="status" aria-live="polite">{toast&&<><Check size={16}/>{toast}</>}</div></>}

```

## src/components/ConnectionNotes.tsx

```
import { ArrowUpRight } from 'lucide-react';
import { content } from '../data/content';

export default function ConnectionNotes() {
 return <div className="glass reference-card references-summary"><div><p className="eyebrow">PROFESSIONAL REFERENCES</p><h3>References available on request.</h3><p>Happy to connect you with people who can speak to my work and experience.</p></div><a href={`mailto:${content.email}?subject=Request%20for%20references`} className="button button-outline">Request references <ArrowUpRight size={16}/></a></div>;
}

```

## src/components/ContactModal.tsx

```
import { Download } from 'lucide-react';
import { Modal } from './ui/dialog';
import { asset, content } from '../data/content';

export default function ContactModal({open,onOpenChange}:{open:boolean;onOpenChange:(open:boolean)=>void}) {
 const contact=content.cv.find(file=>file.format==='VCF')!;
 return <Modal open={open} onOpenChange={onOpenChange} title="Save my contact" description="Download my contact card to add me to your phone or computer's contacts.">
  <p><strong>{content.name}</strong><br/>{content.email}<br/>{content.phones.map((phone,i)=><span key={phone}>{i>0&&' / '}<a href={`tel:${phone}`}>{phone}</a></span>)}</p>
  <a className="button button-primary" href={asset(contact.path)} download="Nathanael Nyirenda.vcf"><Download size={17}/> Download contact (.vcf)</a>
  <p className="small muted">Open the downloaded file and choose to add or save the contact.</p>
 </Modal>;
}

```

## src/components/PhoneContact.tsx

```
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';

export default function PhoneContact({phone,label,display}:{phone:string;label:string;display:string}) {
 const reduced=useReducedMotion();
 const sequence=useRef(0);
 const [ripples,setRipples]=useState<{id:number;x:number;y:number;size:number}[]>([]);
 useEffect(()=>{if(reduced)setRipples([])},[reduced]);
 function ripple(element:HTMLAnchorElement,point?:{x:number;y:number}) {
  if(reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const bounds=element.getBoundingClientRect();
  const x=point?point.x-bounds.left:bounds.width/2;
  const y=point?point.y-bounds.top:bounds.height/2;
  const size=2*Math.hypot(Math.max(x,bounds.width-x),Math.max(y,bounds.height-y));
  const id=++sequence.current;
  setRipples(current=>[...current.slice(-7),{id,x,y,size}]);
 }
 return <a className="phone-contact" href={`tel:${phone}`} onPointerDown={event=>{if(event.button===0)ripple(event.currentTarget,{x:event.clientX,y:event.clientY})}} onClick={event=>{if(event.detail===0)ripple(event.currentTarget)}}>
  {ripples.map(wave=><span aria-hidden="true" className="phone-ripple" key={wave.id} style={{left:wave.x-wave.size/2,top:wave.y-wave.size/2,width:wave.size,height:wave.size}} onAnimationEnd={()=>setRipples(current=>current.filter(item=>item.id!==wave.id))}/>)}
  <span className="phone-contact-icon"><Phone size={17}/></span>
  <span className="phone-contact-details"><span className="phone-contact-label">{label}</span><span className="phone-contact-number">{display}</span></span>
  <ArrowUpRight size={16}/>
 </a>;
}

```

## src/components/QrModal.tsx

```
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from './ui/dialog';
import { asset, content } from '../data/content';
export default function QrModal({open,onOpenChange}:{open:boolean;onOpenChange:(v:boolean)=>void}) {const url=new URL(asset(content.cv[0].path),window.location.href).href;return <Modal open={open} onOpenChange={onOpenChange} title="Take it with you" description="Scan to open the designed CV on your phone."><div className="qr"><QRCodeSVG value={url} size={220} level="M" title="CV download link"/></div><a className="button button-primary" href={url} download>Download CV instead</a><p className="small muted">Publish the site to make this QR link accessible on other devices.</p></Modal>}

```

## src/components/TypewriterRole.tsx

```
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { content } from '../data/content';

export default function TypewriterRole() {
  const reduced = useReducedMotion();
  const [text, setText] = useState('');

  useEffect(() => {
    if (reduced) { setText(content.roles[1]); return; }
    let index = 0, length = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const role = content.roles.slice(1)[index];
      length += deleting ? -1 : 1;
      setText(role.slice(0, length));
      let delay = deleting ? 18 : 32;
      if (!deleting && length === role.length) { deleting = true; delay = 1600; }
      else if (deleting && length === 0) { deleting = false; index = (index + 1) % (content.roles.length-1); delay = 180; }
      timer = setTimeout(tick, delay);
    };
    setText('');
    timer = setTimeout(tick, 180);
    return () => clearTimeout(timer);
  }, [reduced]);

  return <div className="role-line">
    <span className="role-symbol" aria-hidden="true">&gt;_</span>
    <span className="role-typewriter" aria-hidden="true"><span>{text}</span><span className="cursor"/></span>
    <span className="sr-only">{content.roles.join(', ')}</span>
  </div>;
}

```

## src/components/ui/button.tsx

```
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
const variants=cva('button',{variants:{variant:{default:'button-primary',outline:'button-outline',ghost:'button-ghost'}},defaultVariants:{variant:'default'}});
export const Button=forwardRef<HTMLButtonElement,ButtonHTMLAttributes<HTMLButtonElement>&VariantProps<typeof variants>>(({className,variant,...props},ref)=><button ref={ref} className={clsx(variants({variant}),className)} {...props}/>);
Button.displayName='Button';

```

## src/components/ui/dialog.tsx

```
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
export function Modal({open,onOpenChange,title,description,children}:{open:boolean;onOpenChange:(open:boolean)=>void;title:string;description:string;children:ReactNode}){return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="modal-overlay"/><Dialog.Content className="modal"><Dialog.Title className="modal-title">{title}</Dialog.Title><Dialog.Description className="muted">{description}</Dialog.Description>{children}<Dialog.Close className="icon-button modal-close" aria-label="Close dialog"><X size={20}/></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>}

```

## src/data/content.ts

```
// Portfolio content.
export const content = {
  name: 'Nathanael Nyirenda', initials: 'NN', role: 'Software Engineer', secondaryRole: 'Information Systems Administrator',
  roles: ['Software Engineer', 'Information Systems Administrator', 'UI/UX Designer', 'Graphic Designer', 'DevOps Engineer'],
  tagline: 'I’m Nathanael, a software engineer based in Lusaka. I build web applications, manage IT systems, and create visual designs.', bio: 'I’m a KNRTU graduate with a background in computer science. I work across web development, systems administration, and design. I like figuring out how things work, solving practical problems, and making things people enjoy using. I build and manage websites, keeping them updated and running smoothly.',
  location: 'Lusaka, Zambia', timezone: 'Africa/Lusaka', status: 'Open to internships & freelance', email: 'n8.vision.00@gmail.com', phones: ['+79874226650', '+260776612267'], updated: 'October 2026',
  links: { github:'https://github.com/Nate-zm', linkedin:'https://www.linkedin.com/in/nathanael-nyirenda-5756721b7', telegram:'https://t.me/Nate_zm', whatsapp:'https://wa.me/260776612267' },
  cv: [{label:'CV (PDF)',path:'assets/Nathanael Nyirenda CV.pdf?v=7d297cbb4074',format:'PDF'}, {label:'Save my contact',path:'assets/your-name.vcf',format:'VCF'}],
  stats:[{value:4,label:'Selected projects'},{value:3,label:'Connected disciplines'},{value:9,label:'Original public repositories'}],
  currently: [{label:'Build',value:'Useful tools for everyday problems'},{label:'Develop',value:'Web experiences and visual identities'},{label:'Learn',value:'Cloud infrastructure and DevOps'}],
  skills:[{title:'Frontend engineering',code:'</>',description:'Web interfaces that are easy to use.',items:['TypeScript','React','Tailwind CSS','Accessibility'],level:80},{title:'Backend & data',code:'{ }',description:'APIs and databases that support the app.',items:['Node.js','Python','PostgreSQL','REST APIs','Testing'],level:70},{title:'Systems administration',code:'~/_',description:'Keeping servers and networks running.',items:['Linux','Windows Server','Networking','Virtualization'],level:75},{title:'Cloud & operations',code:'↑_',description:'Automating tasks and spotting issues early.',items:['Docker','Cloud','Security','Monitoring','Backups','ITIL / DevOps'],level:65},{title:'Design tools',code:'✳',description:'Tools I use for UI design, graphics, and visual content.',items:['Figma','Photoshop','Canva'],level:80}],
  // Rename via name; add screenshots in public/assets/projects and set image below.
  projects:[
    {id:'zamket',name:'Zamket',category:'Web',label:'Open-source handcraft marketplace',number:'01',description:'A recognised handcraft marketplace connecting handmade products with shoppers.',problem:'Give handcrafts a dedicated online storefront where customers can discover and browse handmade products.',solution:'An open-source marketplace that brings handcraft discovery and shopping into one accessible web experience.',outcome:'Established a recognised online home for handcrafts, helping handmade products reach a wider audience through a dedicated shopping experience. Its open-source approach also invites others to explore and build on the project.',stack:['Handcrafts','Open source'],live:'https://zamket.vercel.app',source:'https://github.com/Nate-zm',cover:'orbit',image:'assets/projects/zamket.png'},
    {id:'nicecream',name:'Nice Cream & Kreemy Kup',category:'Design',label:'Ice cream branding',number:'02',description:'Product design for Nice Cream, a Shoprite × Premium Foods collaboration, and Kreemy Kup by Premium Foods Manufacturing Limited.',problem:'Present Nice Cream and Kreemy Kup clearly while reflecting each brand’s identity and company attribution.',solution:'Product design for Nice Cream, a collaboration between Shoprite and Premium Foods Manufacturing Limited, alongside Kreemy Kup, a brand by Premium Foods Manufacturing Limited.',outcome:'Created product visuals that communicate each brand’s identity: Nice Cream for the Shoprite × Premium Foods collaboration, and Kreemy Kup for Premium Foods Manufacturing Limited.',stack:['Graphic design','Food branding'],live:'',source:'',cover:'pulse',image:'assets/projects/Nicecream.jpg'},
    {id:'portfolio',name:'Portfolio',category:'Web',label:'Portfolio website',number:'03',description:'A personal portfolio for software, systems, and design work.',problem:'Bring different disciplines and selected work into one place.',solution:'A responsive website presenting projects, skills, and contact details.',outcome:'Created a central place to explore my software, systems, and design work, with responsive project browsing, direct contact options, and convenient access to my CV across devices.',stack:['Portfolio','Web'],live:'https://nate-zm.github.io/Portfolio/',source:'https://github.com/Nate-zm/Portfolio',cover:'atlas',image:'assets/projects/portfolio.png'},
    {id:'deploy',name:'Deploy toolkit',category:'Systems',label:'Deployment concept',number:'04',description:'Repeatable deployments, from the first command.',problem:'Manual server setup is inconsistent and time-consuming.',solution:'Versioned automation for provisioning, backups, and deployment checks.',outcome:'Designed a repeatable workflow for provisioning, backups, and deployment checks. The concept aims to reduce manual setup, make changes easier to review, and support more consistent deployments.',stack:['Bash','Docker','GitHub Actions'],live:'',source:'',cover:'deploy',image:''}],
  timeline:[{date:'Current',title:'Graphic Designer & Web Developer',organization:'Premium Foods Manufacturing Ltd',description:'Currently working in graphic design and web development at Premium Foods Manufacturing Ltd.'},{date:'Graduated',title:'Computer Science graduate',organization:'Kazan National Research Technological University (KNRTU) · Kazan',description:'Graduated from the Department of Intelligent Systems and Information Resource Management, with a focus on web development and systems administration.'},{date:'2025–2026',title:'Student Association Chairman',organization:'Leadership · Zambians in Russia',description:'Led student affairs for Zambian students across Russia and served as the link between students and the Zambian embassy.'},{date:'Next chapter',title:'Building a new team',organization:'Zambian Engineers',description:'Bringing together Zambian engineers to share ideas, build together, and reach new heights.'}],
  badges:['Computer Science graduate','Graphic design & web development','Student Association Chairman · 2025–2026','Public web development projects','Software, systems & design'],
};
export const asset = (path:string) => `${import.meta.env.BASE_URL}${path}`;

```

## src/main.tsx

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
document.addEventListener('pointermove',event=>{
 if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const target=(event.target as HTMLElement).closest<HTMLElement>('.glass,.magnetic');
 if(!target)return;const rect=target.getBoundingClientRect();
 target.style.setProperty('--pointer-x',`${event.clientX-rect.left}px`);
 target.style.setProperty('--pointer-y',`${event.clientY-rect.top}px`);
});
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

```

## src/reset.css

```
/*! Preserved CSS reset and base utilities from Tailwind CSS 3.4.19. MIT License; see LICENSES/tailwind-preflight.txt. */
*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }
::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }
*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
:before,:after{--tw-content: ""}
html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}
body{margin:0;line-height:inherit}
hr{height:0;color:inherit;border-top-width:1px}
abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}
h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
a{color:inherit;text-decoration:inherit}
b,strong{font-weight:bolder}
code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}
small{font-size:80%}
sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}
sub{bottom:-.25em}
sup{top:-.5em}
table{text-indent:0;border-color:inherit;border-collapse:collapse}
button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}
button,select{text-transform:none}
button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}
:-moz-focusring{outline:auto}
:-moz-ui-invalid{box-shadow:none}
progress{vertical-align:baseline}
::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}
[type=search]{-webkit-appearance:textfield;outline-offset:-2px}
::-webkit-search-decoration{-webkit-appearance:none}
::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}
summary{display:list-item}
blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}
fieldset{margin:0;padding:0}
legend{padding:0}
ol,ul,menu{list-style:none;margin:0;padding:0}
dialog{padding:0}
textarea{resize:vertical}
input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}
input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}
button,[role=button]{cursor:pointer}
:disabled{cursor:default}
img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}
img,video{max-width:100%;height:auto}
[hidden]:where(:not([hidden=until-found])){display:none}
.container{width:100%}
@media(min-width:640px){.container{max-width:640px}
}
@media(min-width:768px){.container{max-width:768px}
}
@media(min-width:1024px){.container{max-width:1024px}
}
@media(min-width:1280px){.container{max-width:1280px}
}
@media(min-width:1536px){.container{max-width:1536px}
}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
.visible{visibility:visible}
.outline{outline-style:solid}
.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}
.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}

```

## src/styles.css

```
@import './reset.css';
@import '@fontsource-variable/inter/wght.css';
@import '@fontsource-variable/jetbrains-mono/wght.css';
:root{--bg:#090b11;--surface:#11141d;--surface-raised:#181c28;--text:#f0f1f6;--muted:#959aab;--border:#ffffff12;--accent:#9695ff;--cyan:#6ddbd9;--radius:20px;--space:24px;--blur:20px;color-scheme:dark}
:root[data-theme=light]{--bg:#f5f6fa;--surface:#fff;--surface-raised:#eceef5;--text:#151827;--muted:#5e6476;--border:#15182718;--accent:#5751cb;--cyan:#067978;color-scheme:light}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:110px}body{margin:0;background:var(--bg);color:var(--text);font-family:"Inter Variable",system-ui,sans-serif;font-size:14px;line-height:1.65;-webkit-font-smoothing:antialiased}body:before{content:'';position:fixed;inset:0;pointer-events:none;opacity:.025;z-index:20;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23ffffff' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E")}a{color:inherit;text-decoration:none}button,input,textarea{font:inherit}button{cursor:pointer}button,a,input,textarea{-webkit-tap-highlight-color:transparent}button{color:inherit}button:disabled{cursor:wait}::selection{background:#7772e955}::-webkit-scrollbar{width:7px}::-webkit-scrollbar-thumb{background:#62647a;border-radius:8px}:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.container{width:min(1160px,calc(100% - 96px));margin-inline:auto}.muted{color:var(--muted)}.small{font-size:11px}.eyebrow,.card-label,.hero-intro,.art-label,.art-coordinate,.scroll-cue,.section-divider,.badges-label{font-family:"JetBrains Mono Variable",monospace;font-size:10px;letter-spacing:1.5px;line-height:1.6}.eyebrow{color:var(--accent);margin:0 0 18px}.gradient-text{background:linear-gradient(105deg,#aba3ff 5%,#8fb5ef 65%,#83d8d5);background-clip:text;-webkit-text-fill-color:transparent}:root[data-theme=light] .gradient-text{background-image:linear-gradient(105deg,#6556ce,#197d92)}.accent{color:var(--accent)}h1,h2,h3,p{margin-top:0}h1,h2,h3{line-height:1.12;letter-spacing:-.045em}h2{font-size:clamp(32px,4.2vw,50px);font-weight:500;margin-bottom:0}h3{font-size:23px;font-weight:500}p{color:var(--muted)}.nav-shell{position:absolute;z-index:30;left:50%;transform:translateX(-50%);top:28px;width:min(1160px,calc(100% - 96px));display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:color-mix(in srgb,var(--surface) 75%,transparent);border:1px solid var(--border);border-radius:14px;backdrop-filter:blur(var(--blur))}.brand{font-weight:700;font-size:21px;letter-spacing:-1px}.brand span{color:var(--accent);font-weight:400}.desktop-nav{display:flex;gap:28px}.desktop-nav a{font-size:12px;color:var(--muted);transition:color .2s}.desktop-nav a:hover,.desktop-nav a.active{color:var(--text)}.desktop-nav a.active:after{content:'';display:block;width:4px;height:4px;border-radius:50%;background:var(--accent);margin:auto}.nav-actions{display:flex;gap:10px;align-items:center}.icon-button{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:44px;min-height:44px;background:none;border:1px solid var(--border);border-radius:10px;transition:background .2s}.icon-button:hover{background:var(--surface-raised)}.command-button{font-size:10px;color:var(--muted)}kbd{font-family:inherit}.mobile-toggle{display:none}.hero{position:relative;min-height:790px;display:flex;align-items:center;padding-top:110px;padding-bottom:120px}.hero-glow{position:absolute;top:-100px;right:-40px;width:700px;height:720px;max-width:90vw;background:radial-gradient(ellipse,#6559b61c,transparent 65%);pointer-events:none}.hero-content{position:relative;z-index:2;width:65%}.availability{display:inline-flex;align-items:center;gap:9px;font-size:10px;color:var(--muted);border:1px solid var(--border);border-radius:100px;padding:7px 12px;background:var(--surface);margin-bottom:32px}.status-dot{display:inline-block;width:6px;height:6px;flex-shrink:0;border-radius:50%;background:#80cfa2;box-shadow:0 0 12px #80cfa244;animation:breathe 3s infinite}.hero-intro{display:flex;gap:18px;align-items:center;color:var(--muted);font-size:10px;margin-bottom:18px}.intro-line{height:1px;width:46px;background:var(--border)}h1{font-size:clamp(58px,6.9vw,94px);font-weight:500;line-height:1.04;margin-bottom:25px;letter-spacing:-.06em}.heading-dot{display:none}.role-line{display:flex;align-items:center;gap:10px;font-size:15px;min-height:30px;margin-bottom:22px}.role-symbol{font-family:monospace;color:var(--accent)}.cursor{width:5px;height:15px;background:var(--accent);animation:breathe 1s infinite}.hero-description{font-size:14px;line-height:1.85;margin-bottom:30px}.hero-ctas{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.button{min-height:46px;padding:12px 18px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-size:11px;font-weight:500;border:1px solid transparent;transition:transform .2s,background .2s,box-shadow .2s}.button:hover{transform:translateY(-2px)}.button-primary{color:#fff;background:linear-gradient(120deg,#7362d9,#646dd1);box-shadow:inset 0 1px #ffffff30,0 4px 20px #7568ee18}.button-primary:hover{box-shadow:0 7px 24px #7568ee40}.button-outline{background:var(--surface);border-color:var(--border)}.button-ghost{background:none}.hero-contact{font-size:11px;display:flex;align-items:center;gap:5px;padding:14px 4px;color:var(--muted)}.cv-action{position:relative}.split-button{display:flex}.split-button .button{border-radius:9px 0 0 9px}.format-trigger{min-width:37px;border:0;border-left:1px solid #ffffff22;border-radius:0 9px 9px 0;background:#646bd0;display:grid;place-items:center;color:#fff}.popover{background:var(--surface-raised);padding:16px;min-width:240px;border:1px solid var(--border);border-radius:13px;z-index:80;box-shadow:0 20px 60px #0006}.popover .eyebrow{display:block;color:var(--muted);margin-bottom:10px}.format-option{display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px 8px;border:0;background:none;font-size:12px;text-align:left;border-radius:6px}.format-option:hover{background:var(--border)}.popover-arrow{fill:var(--surface-raised)}.build-status{position:absolute;top:55px;background:var(--surface-raised);border:1px solid var(--border);padding:8px 12px;border-radius:8px;display:flex;align-items:center;gap:8px;white-space:nowrap;font-size:10px;z-index:5}.progress-ring{width:14px;height:14px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:rotate 1s infinite}.spin{animation:rotate 1s infinite}.confetti{position:absolute;left:0;top:-26px;color:var(--cyan);pointer-events:none;animation:confetti 1s both}.hero-meta{display:flex;align-items:center;gap:18px;margin-top:32px;color:var(--muted);font-size:10px}.hero-meta span{display:flex;gap:7px;align-items:center}.meta-divider{width:1px;height:12px;background:var(--border)}.hero-art{position:absolute;right:-15px;top:190px;width:430px;height:430px;opacity:.9;background:radial-gradient(ellipse,#7366e512,transparent 68%);mask-image:linear-gradient(90deg,transparent,#000 15%)}.orbital-ring{position:absolute;inset:50px;border:1px solid #9392cc25;border-radius:50%;transform:rotate(-32deg) scaleY(.6)}.ring-two{inset:20px;transform:rotate(35deg) scaleY(.7);border-color:#9291dc18}.ring-three{inset:0;transform:rotate(-10deg) scaleY(.92);border-style:dashed;border-color:#9291dc14;animation:orbit 70s linear infinite}.art-core{position:absolute;inset:145px;display:grid;place-items:center;color:#b3b0ff;background:linear-gradient(140deg,#8783c325,#1c233550);border:1px solid #a6a0ff30;border-radius:30px;box-shadow:0 0 70px #8074de18,inset 0 0 30px #8c89db15;transform:rotate(-12deg)}.art-core svg{transform:rotate(12deg)}.art-label{position:absolute;color:var(--muted);font-size:8px;letter-spacing:1px}.label-one{top:40px;left:100px}.label-two{bottom:70px;right:30px;display:flex;gap:8px;align-items:center}.label-two i{width:4px;height:4px;background:var(--cyan);border-radius:50%}.art-coordinate{position:absolute;bottom:4px;left:80px;font-size:8px;color:var(--muted);opacity:.5}.art-node{position:absolute;border:1px solid var(--border);background:var(--surface);width:50px;height:50px;border-radius:14px;display:grid;place-items:center;color:var(--muted);animation:float 5s ease-in-out infinite}.node-one{top:100px;right:40px}.node-two{bottom:100px;left:35px;animation-delay:-2s}.orbit-point{position:absolute;top:90px;left:100px;width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 20px var(--accent)}.scroll-cue{position:absolute;bottom:36px;left:0;display:flex;align-items:center;gap:12px;color:var(--muted);font-size:8px}.scroll-cue svg{animation:float 3s infinite}.scroll-cue span{margin-left:25px;color:var(--muted);opacity:.5;font-size:7px}.section-divider{border-top:1px solid var(--border);padding-top:18px;display:flex;justify-content:space-between;font-size:8px;color:var(--muted);letter-spacing:1px}.section{padding-top:100px}.section-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:35px;gap:20px}.section-head>p{font-size:12px;margin-bottom:3px}.glass{position:relative;background:linear-gradient(140deg,color-mix(in srgb,var(--surface) 98%,var(--accent)),var(--surface));border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}.glass:before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 0 0,#9999ff07,transparent 60%)}.glass:hover{border-color:color-mix(in srgb,var(--accent) 25%,transparent)}.about-grid{display:grid;grid-template-columns:1.65fr 1fr;gap:20px}.bio-card{padding:32px}.card-label{color:var(--muted);display:flex;align-items:center;justify-content:space-between;font-size:9px;margin-bottom:30px}.bio-card h3{font-size:29px;line-height:1.3}.bio-card>p{max-width:500px;font-size:12px;line-height:1.9}.text-link{display:inline-flex;align-items:center;gap:10px;font-size:11px;min-height:44px;position:relative}.text-link:after{content:'';position:absolute;left:0;bottom:5px;width:0;height:1px;background:var(--accent);transition:width .2s}.text-link:hover:after{width:100%}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;border-top:1px solid var(--border);padding-top:25px;margin-top:22px}.stats strong{font-size:35px;letter-spacing:-2px;font-weight:500;display:block;line-height:1.2}.stats strong>span:last-child{font-size:21px;color:var(--accent)}.stats small{font-size:9px;color:var(--muted)}.currently-card{padding:28px}.currently-card .card-label{justify-content:flex-start;gap:10px;margin-bottom:24px}.currently-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--border)}.currently-icon{width:36px;height:36px;border-radius:9px;background:var(--surface-raised);display:grid;place-items:center;color:var(--accent);flex-shrink:0}.currently-item small{color:var(--muted);font-size:9px}.currently-item p{font-size:12px;color:var(--text);margin:2px 0 0}.currently-footer{font-size:10px;color:var(--muted);display:flex;justify-content:space-between;align-items:center;padding-top:25px}.skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.skill-card{padding:26px 22px}.skill-number{position:absolute;top:24px;right:22px;color:var(--muted);font-family:monospace;font-size:9px;opacity:.5}.skill-code{display:grid;place-items:center;width:46px;height:46px;background:linear-gradient(140deg,#9183de16,#719dce08);border:1px solid var(--border);border-radius:12px;font-family:monospace;font-size:21px;color:var(--accent);margin-bottom:28px}.skill-card h3{font-size:17px;letter-spacing:-.025em;min-height:40px;margin-bottom:8px}.skill-card>p{font-size:11px;min-height:40px}.chips{display:flex;flex-wrap:wrap;gap:6px}.chips span{border:1px solid var(--border);background:var(--surface-raised);border-radius:5px;padding:3px 7px;font-size:8px;color:var(--muted);transition:color .2s}.chips span:hover{color:var(--accent)}.skill-card .chips{min-height:90px;align-content:flex-start}.skill-meter{height:3px;background:var(--border);margin-top:25px;border-radius:4px;overflow:hidden}.skill-meter span{display:block;height:100%;background:linear-gradient(90deg,#7064b0,#6ba4b0);opacity:.6}.skill-detail{display:block;font-size:8px;color:var(--muted);margin-top:10px;opacity:.5}.project-toolbar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:25px}.filters{display:flex;gap:4px;padding:4px;background:var(--surface);border:1px solid var(--border);border-radius:10px}.filters button{padding:8px 14px;min-height:40px;border:0;border-radius:7px;background:none;font-size:10px;color:var(--muted);display:flex;gap:9px;align-items:center}.filters button.selected{background:var(--surface-raised);color:var(--text)}.filters button span{font-family:monospace;font-size:8px;color:var(--accent)}.project-toolbar>.small{font-family:monospace;font-size:8px;letter-spacing:1px}.projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}.cover-button{width:100%;border:0;background:none;padding:0;display:block;text-align:left;position:relative;overflow:hidden}.project-cover{height:265px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;border-bottom:1px solid var(--border);background:radial-gradient(ellipse at 50% 90%,#7569b72f,transparent 80%),#141520;padding:30px;color:#e9ebf6}.project-cover:before{content:'';position:absolute;inset:0;background-image:linear-gradient(#ffffff03 1px,transparent 1px),linear-gradient(90deg,#ffffff03 1px,transparent 1px);background-size:28px 28px}.cover-arrow{position:absolute;right:20px;bottom:20px;width:36px;height:36px;display:grid;place-items:center;border-radius:50%;border:1px solid #ffffff25;background:#11152090;color:#fff;opacity:0;transform:translateY(8px);transition:.2s}.cover-button:hover .cover-arrow{opacity:1;transform:translateY(0)}.mock-window{position:relative;width:90%;background:#10131d;border:1px solid #ffffff18;border-radius:8px;box-shadow:0 15px 40px #0006;transform:perspective(900px) rotateY(-8deg) rotateX(5deg);transition:transform .5s}.cover-button:hover .mock-window{transform:perspective(900px) rotateY(0) rotateX(0)}.mock-top{height:25px;display:flex;gap:4px;align-items:center;border-bottom:1px solid #ffffff0d;padding:8px}.mock-top i{width:4px;height:4px;background:#55536b;border-radius:50%}.mock-top span{font-size:6px;color:#787b8f;margin-left:10px;font-family:monospace}.mock-layout{display:flex;min-height:165px}.mock-sidebar{width:62px;flex-shrink:0;padding:14px 10px;font-size:6px;line-height:3;color:#7f8499;border-right:1px solid #ffffff0b}.mock-sidebar span{color:#aaa0fa}.mock-body{padding:20px 14px;width:100%}.mock-body>small{font-size:5px;letter-spacing:1px;color:#82849b}.mock-body>strong{display:block;font-size:13px;font-weight:500;margin:8px 0 20px;letter-spacing:-.5px}.mock-columns{display:flex;gap:8px}.mock-columns>div{flex:1;background:#171b28;border-radius:4px;padding:8px}.mock-columns small{font-size:5px;color:#9d9bb7}.mock-columns b{display:block;height:14px;margin-top:6px;background:linear-gradient(90deg,#3b354f,#25283a);border:1px solid #ffffff06;border-radius:3px}.pulse{background:radial-gradient(ellipse at bottom,#3b7b7330,transparent),#101b1c}.pulse-ui{position:relative;width:75%;background:#101b1f;border:1px solid #91d5bf20;border-radius:9px;padding:18px;box-shadow:0 20px 40px #0004}.pulse-ui>div:first-child{display:flex;align-items:center;gap:7px;font-size:5px;letter-spacing:1px;color:#92b7a8}.pulse-ui>div:first-child svg{margin-left:auto}.pulse-ui>strong{font-size:40px;letter-spacing:-2px;font-weight:500;display:block;line-height:1.5}.pulse-ui>strong span{font-size:19px;color:#72b89f}.pulse-ui>small{display:block;font-size:5px;color:#8aada2;letter-spacing:1px}.bars{display:flex;align-items:end;gap:3px;height:40px;margin:15px 0}.bars i{flex:1;background:linear-gradient(#81c4af70,#81c4af10);border-radius:2px}.pulse-ui footer{border-top:1px solid #ffffff12;padding-top:8px;font-size:6px;color:#9dadb5;display:flex;justify-content:space-between}.pulse-ui footer span{color:#80c2ad}.atlas{background:radial-gradient(ellipse at 70% 50%,#86745030,transparent),#201d19}.atlas-ui{position:relative;width:65%;padding:20px;border-left:1px solid #e4d5a635}.atlas-ui svg{color:#c7b489}.atlas-ui strong{display:block;font-size:25px;font-weight:500;line-height:1.1;letter-spacing:-1px;margin:10px 0}.atlas-ui>span{font-size:5px;letter-spacing:2px;color:#a89a7b}.atlas-ui>div{display:flex;justify-content:space-between;font-size:8px;border-bottom:1px solid #ffffff0d;padding:10px 0;color:#c0b69f}.atlas-ui b{font-weight:400;color:#7e7768}.deploy{background:radial-gradient(ellipse at 30% 50%,#536c8e25,transparent),#111821}.terminal-ui{position:relative;width:85%;padding:16px;background:#0e141d;border:1px solid #98b1e222;border-radius:8px;box-shadow:0 15px 35px #0005;font-family:monospace;font-size:9px}.terminal-ui>div{font-size:7px;color:#7e90a8;border-bottom:1px solid #ffffff0d;padding-bottom:12px;margin-bottom:18px;display:flex;align-items:center;gap:8px}.terminal-ui i{width:5px;height:5px;border-radius:50%;background:#677d97}.terminal-ui p{color:#8d9ead;margin:6px 0}.terminal-ui em{color:#899cd5;font-style:normal}.terminal-ui .terminal-success{color:#7dcab1;margin-top:15px}.project-info{padding:25px}.project-topline{display:flex;justify-content:space-between}.project-topline .eyebrow{font-size:8px;letter-spacing:1px;color:var(--muted);margin-bottom:12px}.project-number{font-size:9px;font-family:monospace;color:var(--muted);opacity:.5}.project-title{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0;background:none;border:0;font-size:23px;letter-spacing:-.8px;text-align:left;min-height:44px}.project-title svg{color:var(--muted)}.project-info>p{font-size:11px;margin:7px 0 23px}.project-footer{display:flex;align-items:center;justify-content:space-between;gap:12px}.project-links{display:flex;gap:6px}.project-links a{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;gap:5px;color:var(--muted);font-size:8px}.project-links a:hover{color:var(--accent)}.resume-card{padding:48px 55px;display:grid;grid-template-columns:1.2fr 1fr;align-items:center;background:radial-gradient(ellipse at 85% 80%,#6e669924,transparent 65%),var(--surface)}.resume-card h2{font-size:43px;line-height:1.16;margin-bottom:20px}.resume-card p:not(.eyebrow){font-size:12px}.resume-actions{display:flex;gap:10px;margin-top:25px}.resume-meta{display:flex;gap:15px;align-items:center;font-size:8px;color:var(--muted);margin-top:22px}.update-badge{border:1px solid var(--border);border-radius:20px;padding:4px 8px}.paper-wrap{justify-self:center;perspective:1000px;display:block}.paper{position:relative;width:220px;min-height:290px;background:#eeedf1;padding:23px;color:#262334;border-radius:3px;box-shadow:12px 20px 45px #0005;transform:rotate(7deg) rotateY(-12deg);transition:transform .6s}.paper-wrap:hover .paper{transform:rotate(0) rotateY(0) translateY(-5px)}.paper-top{display:flex;align-items:center;justify-content:space-between;color:#6a5a9b;font-size:24px;font-weight:600;margin-bottom:18px}.paper h3{font-size:19px;margin-bottom:7px}.paper>p{font-size:4px!important;color:#726b82;letter-spacing:.8px;margin-bottom:15px}.paper-rule{height:1px;background:#d0cadb;margin-bottom:15px}.paper small{font-size:5px;letter-spacing:1px;color:#696176;display:block;margin-bottom:8px}.paper-lines{margin-bottom:16px}.paper-lines i{display:block;height:3px;background:#d4d1dc;width:100%;margin:5px 0}.paper-lines i:last-child{width:70%}.paper-chips{display:flex;gap:5px}.paper-chips i{height:9px;width:35px;background:#d9d5e3;border-radius:2px}.paper-footer{display:block;font-size:4px;margin-top:22px;color:#8b829b;letter-spacing:.5px}.page-peel{position:absolute;bottom:0;right:0;width:22px;height:22px;background:linear-gradient(135deg,#d1ccde 50%,#17141e 51%);border-radius:4px 0 0 0;transition:width .3s,height .3s}.paper-wrap:hover .page-peel{width:35px;height:35px}.paper-caption{font-family:monospace;letter-spacing:1px;font-size:6px;color:var(--muted);display:block;text-align:center;margin-top:25px}.journey-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:80px}.journey-intro{font-size:12px;margin-top:24px}.timeline{padding-left:25px;border-left:1px solid var(--border)}.timeline-item{position:relative;padding:0 0 35px 12px}.timeline-item:last-child{padding-bottom:0}.timeline-dot{position:absolute;left:-30px;top:5px;width:9px;height:9px;background:var(--surface-raised);border:1px solid var(--muted);border-radius:50%}.timeline-dot.current{background:var(--accent);border-color:var(--accent);box-shadow:0 0 16px #9189db40}.timeline-item .eyebrow{font-size:8px;margin-bottom:12px;color:var(--muted);display:block}.timeline-item h3{font-size:21px;margin-bottom:6px}.timeline-org{font-size:11px;color:var(--accent)}.timeline-item p{font-size:11px;margin:14px 0 0;max-width:420px}.badges-label{color:var(--muted);font-size:8px;margin-top:60px;margin-bottom:20px}.marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}.marquee-track{display:flex;gap:14px;width:max-content;animation:marquee 40s linear infinite}.marquee:hover .marquee-track{animation-play-state:paused}.badge{display:flex;gap:8px;align-items:center;white-space:nowrap;padding:12px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);font-size:10px;color:var(--muted)}.badge svg{color:var(--accent)}.reference-card{padding:38px 45px;display:flex;gap:30px;align-items:flex-start}.quote-symbol{font-family:Georgia,serif;font-size:95px;color:var(--accent);opacity:.5;line-height:1}.reference-card>div:not(.carousel-controls){max-width:700px}.reference-card .eyebrow{font-size:8px}.reference-card blockquote{margin:0 0 25px;font-size:22px;line-height:1.5;font-weight:400;letter-spacing:-.5px}.reference-card strong{font-size:11px;font-weight:500}.reference-card .small{margin:3px 0 10px}.carousel-controls{display:flex;gap:10px;align-items:center;margin-left:auto;align-self:flex-end;flex-shrink:0}.carousel-controls .icon-button{min-width:36px;min-height:44px}.contact-section{padding-top:130px}.contact-section .availability{background:none;border:0;padding:0;letter-spacing:1px;font-family:monospace;font-size:9px}.contact-section h2{font-size:clamp(55px,7vw,85px);line-height:1.04;position:relative;margin-bottom:27px}.contact-arrow{width:70px;height:70px;margin-left:45px;stroke-width:1;color:var(--muted);vertical-align:baseline}.contact-section>div>p{font-size:13px}.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:40px}.email-row{display:flex;gap:15px;align-items:center;border-bottom:1px solid var(--border);padding-bottom:20px}.email-row>a{font-size:22px;letter-spacing:-.6px;display:flex;gap:20px;align-items:center}.email-row .icon-button{margin-left:auto}.socials{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:25px 0}.socials a{display:flex;gap:10px;align-items:center;min-height:50px;font-size:11px}.socials a>svg:first-child{color:var(--muted)}.socials a>svg:last-child{margin-left:auto;color:var(--muted);opacity:.6}.socials a:hover{color:var(--accent)}.contact-form{display:flex;flex-direction:column;gap:15px}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}.contact-form label{font-size:10px;color:var(--muted);display:block}.contact-form input,.contact-form textarea{width:100%;display:block;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px;color:var(--text);font-size:11px;margin-top:7px;resize:vertical}.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--muted);opacity:.6}.contact-form .button{align-self:flex-start}.contact-form>.small{font-size:9px}.footer{margin-top:100px;padding-top:25px;padding-bottom:110px;display:flex;gap:20px;align-items:center;border-top:1px solid var(--border);color:var(--muted);font-size:9px}.footer>.brand{color:var(--text)}.footer>span:nth-child(3){display:flex;gap:8px;align-items:center;margin-left:auto}.footer .text-link{font-size:9px}.floating-cv{position:fixed;bottom:25px;left:50%;transform:translateX(-50%)!important;z-index:35;background:color-mix(in srgb,var(--surface) 85%,transparent);border:1px solid var(--border);padding:7px 7px 7px 17px;border-radius:15px;backdrop-filter:blur(20px);display:flex;align-items:center;gap:18px;box-shadow:0 10px 50px #0005}.floating-label{white-space:nowrap;font-size:10px;color:var(--muted)}.modal-overlay{position:fixed;inset:0;background:#050812b8;backdrop-filter:blur(8px);z-index:60;animation:fade .2s}.modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(650px,calc(100% - 32px));max-height:85dvh;overflow:auto;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:30px;z-index:65;box-shadow:0 30px 100px #0008}.modal-title{font-size:26px;padding-right:40px;margin-bottom:12px}.modal>.muted{font-size:12px;margin-bottom:25px}.modal-close{position:absolute;top:18px;right:18px}.modal .project-cover{border-radius:10px;height:230px;margin-bottom:25px}.case-block h3{text-transform:capitalize;font-size:16px;margin:20px 0 10px}.case-block p{font-size:12px}.modal-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:25px}.qr{background:#fff;width:max-content;padding:20px;border-radius:12px;margin:25px auto}.modal>.button{display:flex;width:max-content;margin:20px auto}.command-search{width:100%;padding:14px;background:var(--bg);border:1px solid var(--border);border-radius:9px;color:var(--text);margin-bottom:15px}.command-list{margin-bottom:20px}.command-list>button,.command-list>a{display:flex;align-items:center;gap:12px;min-height:48px;padding:12px;width:100%;background:none;border:0;border-radius:7px;text-align:left;font-size:12px}.command-list>button:hover,.command-list>a:hover{background:var(--surface-raised)}.command-list>button>span,.command-list>a>svg:last-child{margin-left:auto;color:var(--muted)}.mobile-menu{display:flex;flex-direction:column}.mobile-menu a{font-size:28px;display:flex;align-items:center;justify-content:space-between;padding:15px 0;border-bottom:1px solid var(--border)}.toast{position:fixed;bottom:105px;left:50%;transform:translateX(-50%);padding:12px 18px;border:1px solid var(--border);border-radius:10px;background:var(--surface-raised);z-index:90;display:none;gap:10px;align-items:center;font-size:12px;max-width:calc(100% - 30px);box-shadow:0 5px 30px #0005}.toast.visible{display:flex}.toast svg{color:var(--cyan)}.skip-link{position:fixed;left:10px;top:-70px;background:var(--surface-raised);padding:10px;z-index:100}.skip-link:focus{top:10px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@keyframes breathe{50%{opacity:.5}}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes float{50%{transform:translateY(-7px)}}@keyframes orbit{to{transform:rotate(350deg) scaleY(.92)}}@keyframes marquee{to{transform:translateX(-50%)}}@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes confetti{from{transform:translateY(20px);opacity:0}40%{opacity:1}to{transform:translateY(-15px);opacity:0}}
.hero-glow{right:0}.glass:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(240px circle at var(--pointer-x,-100px) var(--pointer-y,-100px),#a49bff09,transparent 75%);opacity:0;transition:opacity .3s}.glass:hover:after{opacity:1}.magnetic:hover{transform:translateY(-3px) scale(1.025)}
.hero{overflow:clip}
@media(max-width:767px){
 .reference-card{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
 .reference-card .quote-symbol{height:30px;line-height:1}
 .reference-card.glass>.reference-flip-stage{width:100%;max-width:none;min-width:0}
 .reference-card .reference-page{padding:0;background:transparent}
 .reference-card .reference-page blockquote{font-size:19px;line-height:1.55}
 .reference-card .reference-page .eyebrow{font-size:8px;white-space:normal}
 .reference-card .carousel-controls{width:100%;justify-content:flex-end;margin:0;align-self:auto}
}
.skill-swipe-hint{display:none}
@media(max-width:767px){
 #skills .skills-grid{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:min(85%,320px);gap:14px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:4px 2px 16px;scroll-padding-inline:2px}
 #skills .skills-grid .skill-card{grid-column:auto;scroll-snap-align:start;min-width:0}
 #skills .skill-swipe-hint{display:flex;align-items:center;gap:8px;font-size:10px;margin-bottom:14px}
 #skills .skills-grid::-webkit-scrollbar{height:4px}
 #skills .skills-grid::-webkit-scrollbar-thumb{background:var(--accent)}
}
.skill-card:last-child:nth-child(odd){grid-column:1/-1}
.skill-card:last-child:nth-child(odd) h3,.skill-card:last-child:nth-child(odd)>p,.skill-card:last-child:nth-child(odd) .chips{min-height:0}
.reference-flip-stage{display:grid;perspective:1100px;flex:1;min-width:0}
.reference-page{grid-area:1/1;transform-origin:left center;backface-visibility:hidden;transform-style:preserve-3d;background:var(--surface);border-radius:8px;padding:4px 8px}
.reference-size-guide{visibility:hidden;pointer-events:none}
.carousel-controls [aria-disabled=true]{opacity:.5;cursor:wait}
.project-image-frame{position:relative;width:90%;height:100%;display:flex;align-items:center;justify-content:center;transform:perspective(900px) rotateY(-8deg) rotateX(5deg);transition:transform .5s}
.cover-button:hover .project-image-frame{transform:perspective(900px) rotateY(0) rotateX(0)}
.project-image img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:8px;box-shadow:0 15px 40px #0006}
.modal .project-cover.project-image{height:auto;min-height:0;background:var(--bg)}
.modal .project-image-frame{width:100%;transform:none}
.modal .project-image img{height:auto;max-height:50dvh;object-fit:contain}
.email-row>a{min-width:0;overflow-wrap:anywhere}
.email-row>a svg,.email-row .icon-button{flex-shrink:0}
@media(max-width:767px){.contact-section .email-row>a{font-size:clamp(15px,4.3vw,21px)}}
.role-typewriter{display:inline-flex;align-items:center;gap:3px;min-height:24px}
.role-typewriter .cursor{display:inline-block;width:8px;height:18px;flex-shrink:0;border-radius:0;animation:insertion-blink .75s step-end infinite}
@keyframes insertion-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@media(min-width:1600px){.hero{min-height:880px}.hero-art{right:0;top:230px;transform:scale(1.15)}}
@media(max-width:1024px){.container,.nav-shell{width:calc(100% - 64px)}.hero-art{right:-15px;opacity:.5;transform:scale(.8);transform-origin:right center}.hero-content{width:80%}.hero{min-height:750px}.skills-grid{grid-template-columns:repeat(2,1fr)}.skill-card h3,.skill-card>p{min-height:0}.skill-card .chips{min-height:45px}.contact-grid{gap:35px}.project-footer{flex-wrap:wrap}.resume-card{padding:40px}.journey-grid{gap:45px}.desktop-nav{gap:18px}.reference-card{flex-wrap:wrap}.carousel-controls{margin-left:auto}.footer{flex-wrap:wrap}}
@media(max-width:767px){.container,.nav-shell{width:calc(100% - 40px)}.nav-shell{top:18px;padding:8px 12px}.desktop-nav{display:none}.mobile-toggle{display:inline-flex}.command-button{display:none}.nav-actions{gap:5px}.nav-actions .icon-button{border:0}.hero{min-height:800px;min-height:90dvh;padding-top:155px;padding-bottom:110px;align-items:flex-start}.hero-content{width:100%}.hero-art{top:120px;right:-5px;opacity:.15;transform:scale(.65);pointer-events:none}.hero-glow{right:0;width:100%}.hero-intro{font-size:8px}.availability{font-size:9px;margin-bottom:26px}h1{font-size:clamp(51px,10.5vw,76px)}.role-line{font-size:12px}.hero-description{font-size:12px}.hero-ctas{gap:10px}.hero-contact{display:none}.button{padding:12px 13px;font-size:10px}.hero-meta{font-size:8px;gap:11px;margin-top:27px;flex-wrap:wrap}.scroll-cue{bottom:28px;font-size:7px}.scroll-cue span{display:none}.section-divider{font-size:6px;gap:12px;letter-spacing:.5px}.section{padding-top:70px}.section-head{margin-bottom:26px;align-items:flex-start}.section-head>p{display:none}.section-head>.text-link{font-size:9px;white-space:nowrap;margin-top:27px}.eyebrow{font-size:8px;letter-spacing:1px;margin-bottom:14px}h2{font-size:35px}.about-grid{grid-template-columns:1fr;gap:16px}.bio-card,.currently-card{padding:25px}.bio-card h3{font-size:26px}.bio-card>p{font-size:12px}.currently-item{padding:13px 0}.skills-grid{gap:12px}.skill-card{padding:22px 18px}.skill-card h3{font-size:17px}.skill-card .chips{min-height:95px}.skill-card>p{min-height:38px}.project-toolbar{align-items:flex-start;flex-direction:column;gap:13px}.filters{width:100%;justify-content:space-between}.filters button{padding:8px 12px}.projects-grid{grid-template-columns:1fr;gap:20px}.project-cover{height:250px}.project-info{padding:22px}.project-title{font-size:23px}.project-footer{flex-wrap:nowrap}.project-links a span{display:none}.project-links{gap:0}.resume-card{grid-template-columns:1fr;padding:30px;gap:45px}.resume-card h2{font-size:36px}.paper{width:205px}.paper-wrap{padding-bottom:10px}.journey-grid{grid-template-columns:1fr;gap:35px}.journey-grid h2 br{display:none}.journey-grid h2{line-height:1.25}.journey-grid h2 .muted{display:block}.journey-intro{margin-top:18px}.timeline{margin-left:5px}.badges-label{margin-top:40px}.reference-card{padding:26px;gap:12px}.quote-symbol{font-size:55px}.reference-card>div:not(.carousel-controls){width:calc(100% - 50px)}.reference-card blockquote{font-size:17px}.reference-card .eyebrow{font-size:7px}.carousel-controls{margin-top:8px}.contact-section{padding-top:90px}.contact-section h2{font-size:57px}.contact-arrow{width:45px;height:45px;margin-left:10px}.contact-grid{grid-template-columns:1fr;gap:35px}.email-row>a{font-size:21px;gap:10px}.socials{gap:5px}.footer{margin-top:65px;padding-bottom:115px;gap:15px}.footer>.brand{display:none}.footer>span:nth-child(2){width:100%;font-size:8px}.footer>span:nth-child(3){margin-left:0}.footer>.text-link{margin-left:auto}.floating-cv{bottom:calc(15px + env(safe-area-inset-bottom));padding:6px;border-radius:13px}.floating-label{display:none}.floating-cv .button{padding:11px 20px}.modal{padding:25px 20px}.modal-title{font-size:23px}.form-row{gap:10px}.skill-detail{font-size:7px}}
@media(max-width:390px){.skills-grid{grid-template-columns:1fr}.skill-card .chips{min-height:0}.skill-card>p{min-height:0}.skill-detail{font-size:8px}.skill-code{margin-bottom:22px}.hero-ctas .button{padding:12px 10px;font-size:9px}.format-trigger{min-width:32px}.hero-meta .meta-divider{display:none}.hero-meta{gap:8px}.stats small{font-size:8px}.project-footer{flex-wrap:wrap}.contact-section h2{font-size:51px}}
@media(max-width:767px){
 .projects-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
 .project-card{border-radius:14px;min-width:0}
 .project-card .project-cover{height:145px;padding:12px}
 .project-card .mock-window{width:225px;flex-shrink:0;transform:scale(.58)}
 .project-card .pulse-ui{width:210px;flex-shrink:0;transform:scale(.58)}
 .project-card .atlas-ui{width:190px;flex-shrink:0;transform:scale(.64)}
 .project-card .terminal-ui{width:220px;flex-shrink:0;transform:scale(.58)}
 .project-card .cover-button:hover .mock-window{transform:scale(.58)}
 .project-card .project-info{padding:12px}
 .project-card .project-topline .eyebrow{font-size:7px;letter-spacing:.3px;margin-bottom:6px}
 .project-card .project-number{display:none}
 .project-card .project-title{font-size:16px;letter-spacing:-.4px;line-height:1.25;align-items:flex-start;gap:4px;min-height:44px}
 .project-card .project-title svg{width:14px;height:14px;flex-shrink:0;margin-top:3px}
 .project-card .project-info>p{font-size:10px;line-height:1.6;margin:6px 0 12px;min-height:48px}
 .project-card .project-footer{flex-direction:column;align-items:flex-start;gap:8px}
 .project-card .chips{gap:4px;min-height:44px;align-content:flex-start}
 .project-card .chips span{font-size:7px;padding:3px 5px}
 .project-card .project-links{width:100%;justify-content:space-between;border-top:1px solid var(--border)}
 .project-card .project-links a{font-size:8px;gap:4px}
 .project-card .project-links a span{display:inline}
 .project-card .project-links svg{width:13px;height:13px}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}.marquee-track{width:auto;flex-wrap:wrap}.marquee-track>[aria-hidden=true]{display:none}}
/* Make the introduction prominent while preserving its original layout height. */
.hero-intro{font-family:"Inter Variable",system-ui,sans-serif;font-size:clamp(14px,1.5vw,20px);font-weight:600;letter-spacing:.025em;line-height:16px;color:var(--text);gap:12px}
.hero-intro .intro-line{flex-shrink:0}
.hero-intro .intro-code-keyword{color:var(--accent)}
.hero-intro .intro-code-string{color:var(--cyan)}
.hero-present{font-family:"JetBrains Mono Variable",monospace;font-size:10px;letter-spacing:1.5px;line-height:1.6;margin-top:-6px;margin-bottom:8px;color:var(--muted)}
@media(max-width:767px){.hero-present{font-size:8px}}
@media(max-width:767px){.hero-intro{font-size:clamp(12px,3.8vw,14px);line-height:12.8px}.hero-intro .intro-line{display:none}}

/* One display interaction for uploaded images and all illustrated previews. */
.cover-button .project-image-frame,.cover-button .mock-window,.cover-button .pulse-ui,.cover-button .atlas-ui,.cover-button .terminal-ui{--display-scale:1;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale));transition:transform .5s}
.cover-button:hover .project-image-frame,.cover-button:hover .mock-window,.cover-button:hover .pulse-ui,.cover-button:hover .atlas-ui,.cover-button:hover .terminal-ui{transform:perspective(900px) rotateY(0) rotateX(0) scale(var(--display-scale))}
@media(max-width:767px){
 .project-card .cover-button .mock-window,.project-card .cover-button .pulse-ui,.project-card .cover-button .terminal-ui{--display-scale:.58;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale))}
 .project-card .cover-button .atlas-ui{--display-scale:.64;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale))}
 .project-card .cover-button:hover .mock-window,.project-card .cover-button:hover .pulse-ui,.project-card .cover-button:hover .atlas-ui,.project-card .cover-button:hover .terminal-ui{transform:perspective(900px) rotateY(0) rotateX(0) scale(var(--display-scale))}
}

.timeline-dot.in-progress{left:-33px;top:2px;width:15px;height:15px;background:transparent;border:2px solid color-mix(in srgb,var(--accent) 25%,transparent);border-top-color:var(--accent);animation:timeline-progress-spin 1.2s linear infinite}
@keyframes timeline-progress-spin{to{transform:rotate(360deg)}}

.timeline{border-left-color:transparent}
.timeline-item:not(:last-child)::before{content:"";position:absolute;left:-26px;top:21px;bottom:3px;width:1px;pointer-events:none;background:linear-gradient(to bottom,transparent,var(--border) 22px,var(--border) calc(100% - 22px),transparent)}

.phone-contacts{margin-top:24px;border:1px solid var(--border);border-radius:14px;background:var(--surface);overflow:hidden}
.phone-contact{display:flex;align-items:center;gap:14px;padding:16px 18px;min-height:72px;transition:background .2s}
.phone-contact+.phone-contact{border-top:1px solid var(--border)}
.phone-contact-icon{display:flex;align-items:center;justify-content:center;width:38px;height:38px;flex-shrink:0;border:1px solid var(--border);border-radius:10px;color:var(--accent);background:var(--surface-raised)}
.phone-contact-details{display:flex;flex-direction:column;gap:3px;min-width:0}
.phone-contact-label{font-size:10px;color:var(--muted);letter-spacing:.6px}
.phone-contact-number{font-size:15px;font-variant-numeric:tabular-nums;letter-spacing:.3px}
.phone-contact>svg{margin-left:auto;flex-shrink:0;color:var(--muted);transition:color .2s}
.phone-contact:hover{background:var(--surface-raised)}
.phone-contact:hover>svg{color:var(--accent)}
@media(max-width:390px){.phone-contact{padding:14px;gap:12px}.phone-contact-number{font-size:14px}}

.phone-contact{position:relative;overflow:hidden;isolation:isolate}
.phone-contact-icon,.phone-contact-details,.phone-contact>svg{position:relative;z-index:1}
.phone-ripple{position:absolute;z-index:0;pointer-events:none;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);background:radial-gradient(circle,transparent 48%,color-mix(in srgb,var(--accent) 7%,transparent) 70%,color-mix(in srgb,var(--accent) 24%,transparent) 91%,color-mix(in srgb,var(--text) 22%,transparent) 97%,transparent 100%);box-shadow:inset 0 2px 5px color-mix(in srgb,var(--text) 20%,transparent),inset 0 -3px 8px color-mix(in srgb,var(--accent) 30%,transparent),0 4px 12px #0002;animation:phone-ripple-expand 850ms cubic-bezier(.16,1,.3,1) forwards}
@keyframes phone-ripple-expand{0%{transform:scale(0);opacity:.9}65%{opacity:.55}100%{transform:scale(1);opacity:0}}

@media(min-width:768px){
 .nav-shell{transition:top .2s ease,border-radius .2s ease}
 .header-scrolled .nav-shell{top:0;border-top-left-radius:0;border-top-right-radius:0}
 .nav-shell{position:fixed;background:color-mix(in srgb,var(--surface) 68%,transparent);-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);border-color:color-mix(in srgb,var(--text) 14%,transparent);box-shadow:0 8px 30px #00000012,inset 0 1px 0 color-mix(in srgb,var(--text) 6%,transparent)}
}

@media(min-width:768px) and (prefers-reduced-motion:reduce){.nav-shell{transition:none}}

:root{--muted:#a5aab9}
:root[data-theme=light]{--muted:#565d70}
.small{font-size:12px}
.hero-description{font-size:16px;max-width:540px;line-height:1.8}
.primary-role{font-size:17px;font-weight:600;color:var(--text);margin-bottom:4px}
.role-line{font-size:13px;color:var(--muted);min-height:28px;margin-bottom:18px}
.section{padding-top:82px}
.desktop-nav a{position:relative;padding-block:8px;font-size:13px}
.desktop-nav a.active{color:var(--accent)}
.desktop-nav a.active:after{position:absolute;bottom:0;left:0;width:100%;height:2px;border-radius:2px;margin:0}
.skill-card p,.project-info>p,.currently-item p{font-size:14px;line-height:1.75}
.project-card .project-cover{height:290px;padding:22px}
.project-card .project-image-frame{width:100%;transform:none}
.project-card .project-image img{width:100%;height:100%;object-fit:contain;box-shadow:0 8px 24px #0003}
.project-card .cover-button:hover .project-image-frame{transform:scale(1.025)}
.project-image-link{margin-bottom:24px;font-size:13px}
.references-summary{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px 32px}
.references-summary h3{font-size:23px;margin-bottom:10px}
.references-summary p:last-child{margin-bottom:0;font-size:14px}
.references-summary .button{flex-shrink:0}
.badge{font-size:12px}
@media(max-width:767px){
 .section{padding-top:60px}
 .hero-description{font-size:14px}
 .primary-role{font-size:16px}
 .role-line{font-size:12px}
 .references-summary{align-items:flex-start;flex-direction:column;padding:24px}
 .project-card .cover-button{aspect-ratio:4/3}
 .project-card .cover-button .project-cover{position:absolute;inset:0;height:100%;padding:12px}
}
@media(prefers-reduced-motion:reduce){.project-card .cover-button:hover .project-image-frame{transform:none}}


.skill-overview{margin-top:20px}
.skill-overview-label{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;color:var(--muted);margin-bottom:8px}
.skill-overview-label strong{font-size:12px;font-weight:500;color:var(--accent)}
.skill-overview .skill-meter{height:5px;margin:0}

```

## src/vite-env.d.ts

```
/// <reference types="vite/client" />

```

## tests/phone-contact.spec.ts

```
import { test, expect } from '@playwright/test';

test('phone ripple starts at the tap, covers the row, and cleans up',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const phone=page.locator('.phone-contact').first();
 await phone.scrollIntoViewIfNeeded();
 await expect.poll(()=>phone.evaluate(element=>getComputedStyle(element.parentElement!.parentElement!).transform)).toBe('none');
 const bounds=(await phone.boundingBox())!;
 await page.mouse.move(bounds.x+24,bounds.y+30);
 await page.mouse.down();
 const wave=phone.locator('.phone-ripple');
 await expect(wave).toHaveCount(1);
 const geometry=await wave.evaluate(element=>{
  const style=(element as HTMLElement).style;
  return {x:parseFloat(style.left)+parseFloat(style.width)/2,y:parseFloat(style.top)+parseFloat(style.height)/2,size:parseFloat(style.width)};
 });
 expect(geometry.x).toBeCloseTo(24,0);
 expect(geometry.y).toBeCloseTo(30,0);
 expect(geometry.size/2).toBeGreaterThanOrEqual(Math.hypot(bounds.width-24,bounds.height-30)-1);
 await expect(phone).toHaveAttribute('href','tel:+79874226650');
 // Release outside the link so verification does not launch a phone app.
 await page.mouse.move(bounds.x+bounds.width+20,bounds.y);
 await page.mouse.up();
 await expect(wave).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.mouse.move(bounds.x+24,bounds.y+30);
 await page.mouse.down();
 await expect(wave).toHaveCount(0);
 await page.mouse.move(bounds.x+bounds.width+20,bounds.y);
 await page.mouse.up();
});

```

## tests/polish.spec.ts

```
import {test,expect} from '@playwright/test';

test('desktop header docks to the top and navigation identifies the current section',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 const header=page.locator('.nav-shell');
 expect((await header.boundingBox())!.y).toBe(28);
 await page.locator('.desktop-nav').getByRole('link',{name:'Skills',exact:true}).click();
 await expect(page.locator('html')).toHaveClass(/header-scrolled/);
 expect((await header.boundingBox())!.y).toBe(0);
 await expect(page.locator('.desktop-nav').getByRole('link',{name:'Skills',exact:true})).toHaveAttribute('aria-current','location');
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await expect(page.locator('html')).not.toHaveClass(/header-scrolled/);
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>window.scrollTo({top:500,behavior:'instant'}));
 await expect(header).toHaveCSS('position','absolute');
});

test('updated content and project image links work across themes',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 for(const width of [320,390,767,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['dark','light']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 await expect(page.locator('.hero-description')).toContainText('I’m Nathanael, a software engineer based in Lusaka.');
 await expect(page.locator('.github-activity')).toHaveCount(0);
 await expect(page.locator('.badges-label')).not.toContainText('SAMPLE');
 await page.getByRole('button',{name:'Read Zamket case study'}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toContainText('recognised online home for handcrafts');
 await expect(dialog.getByRole('link',{name:'View full-size image'})).toHaveAttribute('href',/zamket\.png$/);
 await expect(dialog.getByRole('link',{name:'Source',exact:true})).toHaveAttribute('href',/^https:\/\/github.com\/Nate-zm/);
 await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Continue in email'})).toBeVisible();
 expect(errors).toEqual([]);
});

test('CV download starts immediately and view option opens the same PDF',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const actions=page.locator('.hero-ctas');
 await actions.getByRole('button',{name:'More download options'}).click();
 await expect(page.getByRole('link',{name:'View CV',exact:true})).toHaveAttribute('href',/CV\.pdf\?v=/);
 await expect(page.getByRole('link',{name:'View CV',exact:true})).toHaveAttribute('target','_blank');
 await page.keyboard.press('Escape');
 const download=page.waitForEvent('download');
 await actions.getByRole('link',{name:'Download CV',exact:true}).click();
 await expect(actions.getByRole('link',{name:'Download started',exact:true})).toBeVisible();
 expect((await download).suggestedFilename()).toBe('Nathanael Nyirenda CV.pdf');
 await expect(page.locator('.build-status')).toHaveCount(0);
});

```

## tests/portfolio.spec.ts

```
import { test, expect } from '@playwright/test';

test('mobile floating CV hides around both CV sections and returns between them',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 for(const width of [320,390,430,767]){
  await page.setViewportSize({width,height:844});
  const floating=page.locator('.floating-cv');
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await expect(floating).toHaveCount(0);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
  await page.locator('.resume-actions').scrollIntoViewIfNeeded();
  await expect(floating).toHaveCount(0);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
  await page.locator('.resume-actions').scrollIntoViewIfNeeded();
  await expect(floating).toHaveCount(0);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
 }
 await page.locator('.resume-actions').scrollIntoViewIfNeeded();
 await expect(page.locator('.floating-cv')).toHaveCount(0);
 await page.setViewportSize({width:1024,height:844});
 await expect(page.locator('.floating-cv')).toBeVisible();
 await page.setViewportSize({width:390,height:844});
 await page.locator('.resume-actions').scrollIntoViewIfNeeded();
 await expect(page.locator('.floating-cv')).toHaveCount(0);
});

test('contact popup downloads a vCard and keeps CV downloads as PDF',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 let downloads=0;
 page.on('download',()=>downloads++);
 for(const [area,width] of [['.hero-ctas',390],['.resume-actions',1440]] as const){
  await page.setViewportSize({width,height:900});
  const actions=page.locator(area);
  const before=downloads;
  await actions.getByRole('button',{name:'More download options'}).click();
  await page.getByRole('button',{name:'Save my contact',exact:true}).click();
  const dialog=page.getByRole('dialog');
  await expect(dialog).toContainText('Save my contact');
  await expect(dialog).toContainText('n8.vision.00@gmail.com');
  expect(downloads).toBe(before);
  const contactPromise=page.waitForEvent('download');
  await dialog.getByRole('link',{name:'Download contact (.vcf)'}).click();
  const contact=await contactPromise;
  expect(contact.suggestedFilename()).toBe('Nathanael Nyirenda.vcf');
  const {readFile}=await import('node:fs/promises');
  expect(await readFile((await contact.path())!)).toEqual(await readFile('public/assets/your-name.vcf'));
  await dialog.getByRole('button',{name:'Close dialog'}).click();
  await expect(dialog).toHaveCount(0);
  const pdfPromise=page.waitForEvent('download');
  await actions.getByRole('link',{name:'Download CV',exact:true}).click();
  const pdf=await pdfPromise;
  expect(pdf.suggestedFilename()).toBe('Nathanael Nyirenda CV.pdf');
  expect(await readFile((await pdf.path())!)).toEqual(await readFile('public/assets/Nathanael Nyirenda CV.pdf'));
 }
});

test('download menus and popups fit phones, tablets, and desktops',async({page})=>{
 test.setTimeout(120000);
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:5173');
 for(const [width,height] of [[320,568],[360,800],[390,844],[430,932],[844,390],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]){
  await page.setViewportSize({width,height});
  for(const theme of ['dark','light']){
   await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
   for(const area of ['.hero-ctas','.resume-actions','.floating-cv']){
    const actions=page.locator(area);
    if(area==='.floating-cv')await page.locator('footer').scrollIntoViewIfNeeded();
    await actions.getByRole('button',{name:'More download options'}).click();
    await page.getByRole('button',{name:'Save my contact',exact:true}).click();
    const dialog=page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const button=dialog.getByRole('link',{name:'Download contact (.vcf)'});
    await expect(button).toBeVisible();
    const bounds=await button.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width);
    await dialog.getByRole('button',{name:'Close dialog'}).click();
    await expect(dialog).toHaveCount(0);
    await actions.getByRole('button',{name:'More download options'}).click();
    await page.getByRole('button',{name:'Take it with you'}).click();
    await expect(dialog.locator('.qr svg')).toBeVisible();
    await dialog.getByRole('link',{name:'Download CV instead'}).scrollIntoViewIfNeeded();
    await expect(dialog.getByRole('link',{name:'Download CV instead'})).toHaveAttribute('href',/CV\.pdf\?v=/);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 expect(errors).toEqual([]);
});

test('hero greeting fits phones, tablets, and desktops in both themes',async({browser})=>{
 const devices=[
  {width:320,height:568,touch:true},{width:360,height:800,touch:true},
  {width:390,height:844,touch:true},{width:430,height:932,touch:true},
  {width:844,height:390,touch:true},{width:768,height:1024,touch:true},
  {width:1024,height:768,touch:true},{width:1280,height:800,touch:false},
  {width:1440,height:900,touch:false},{width:1920,height:1080,touch:false},
 ];
 for(const device of devices){
  const context=await browser.newContext({viewport:device,hasTouch:device.touch,reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:5173');
  await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['dark','light']){
   await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
   await expect(page.locator('.hero-intro')).toHaveText('HELLO WORLD, I’M NATHANAEL NYIRENDA');
   await expect(page.locator('.hero-present')).toHaveText('I present to you');
   const layout=await page.evaluate(()=>{
    const intro=document.querySelector('.hero-intro')!.getBoundingClientRect();
    const present=document.querySelector('.hero-present')!.getBoundingClientRect();
    const heading=document.querySelector('h1')!.getBoundingClientRect();
    const text=document.querySelector('.hero-intro > span')!.getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth,
     singleLine:intro.height<20,textFits:text.right<=intro.right+1,
     ordered:intro.bottom<=present.top&&present.bottom<=heading.top,
     colors:[...document.querySelectorAll('[class*=intro-code]')].map(el=>getComputedStyle(el).color)};
   });
   expect(layout.overflow,`${device.width}px ${theme}`).toBe(false);
   expect(layout.singleLine).toBe(true);
   expect(layout.textFits).toBe(true);
   expect(layout.ordered).toBe(true);
   expect(layout.colors[0]).not.toBe(layout.colors[1]);
  }
  if(device.width<768){
   await page.getByRole('button',{name:'Open navigation'}).click();
   await expect(page.getByRole('dialog')).toBeVisible();
   await page.getByRole('dialog').getByRole('link',{name:'Projects',exact:true}).click();
   await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
  await context.close();
 }
});
test('references summary fits mobile screens',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 for(const width of [320,360,412,767,1440]){
  await page.setViewportSize({width,height:900});
  const card=page.locator('.references-summary');await card.scrollIntoViewIfNeeded();
  await expect(card).toContainText('References available on request.');
  const link=card.getByRole('link',{name:'Request references'});
  await expect(link).toHaveAttribute('href',/^mailto:/);
  const bounds=await link.boundingBox();expect(bounds!.x).toBeGreaterThanOrEqual(0);expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width);
 }
});

test('responsive layout, project filter, dialogs, theme, and downloads',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{name:/Engineering/})).toBeVisible();
 for(const width of [360,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 await page.getByRole('button',{name:'Web',exact:true}).click();
 await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:'Read Zamket case study'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 const previousTheme=await page.locator('html').getAttribute('data-theme');const nextTheme=previousTheme==='dark'?'light':'dark';
 await page.keyboard.press('Control+k');await page.getByLabel('Search actions').fill('theme');
 await page.getByRole('button',{name:/Toggle theme/}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme',nextTheme);
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme',nextTheme);
 const downloadPromise=page.waitForEvent('download');await page.locator('.hero-ctas').getByRole('link',{name:'Download CV',exact:true}).click();
 const download=await downloadPromise;expect(download.suggestedFilename()).toContain('.pdf');expect(await download.failure()).toBeNull();
 await page.getByRole('button',{name:'Show CV QR code'}).click();await expect(page.getByRole('dialog')).toContainText('Take it with you');await expect(page.locator('.qr svg')).toBeVisible();
});

```

## tests/security.spec.ts

```
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

```

## tests/security/deployment.test.mjs

```
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('deployment actions are immutable and the build has no publishing token', async () => {
 const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
 const actions = [...workflow.matchAll(/uses:\s+([^\s]+)/g)].map(match => match[1]);
 assert.ok(actions.length >= 4);
 for (const action of actions) assert.match(action, /^[\w-]+\/[\w-]+@[a-f0-9]{40}$/, action);
 const build = workflow.split('  build:')[1].split('  deploy:')[0];
 assert.doesNotMatch(build, /pages:\s*write|id-token:\s*write/);
 assert.match(build, /persist-credentials:\s*false/);
 assert.match(build, /npm ci --ignore-scripts/);
 assert.match(build, /npm run audit:security/);
 assert.match(workflow, /needs:\s*build/);
});

test('dependency graph has no vulnerable legacy Tailwind compiler', async () => {
 const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
 for (const name of ['tailwindcss', 'braces', 'micromatch', 'chokidar', 'postcss-selector-parser', 'postcss-nested']) {
  assert.equal(lock.packages[`node_modules/${name}`], undefined, name);
 }
});

```

## tests/security/export-source.test.mjs

```
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { exportSource, isExportable } from '../../scripts/export-source.mjs';

test('source export rejects private configuration and paths outside the allowlist', () => {
 for (const file of ['.env', '.env.json', '.aws/credentials.json', '.codex/config.json', '.agents/private.md', 'prompt.md', 'src/.private/token.ts', 'src/../secrets.json', 'src/secrets.json', 'public/leak.json', 'local.json']) assert.equal(isExportable(file), false, file);
 for (const file of ['src/App.tsx', 'scripts/export-source.mjs', '.github/workflows/deploy.yml', 'README.md', 'LICENSES/tailwind-preflight.txt']) assert.equal(isExportable(file), true, file);
});

test('source export includes tracked source but excludes untracked and private files', async () => {
 const root = await mkdtemp(join(tmpdir(), 'portfolio-source-test-'));
 try {
  execFileSync('git', ['init', '--quiet'], { cwd: root });
  for (const dir of ['src', '.aws', '.codex']) await mkdir(join(root, dir));
  await writeFile(join(root, 'src', 'App.tsx'), 'export const title = "Safe source";');
  await writeFile(join(root, 'src', 'local.ts'), 'UNTRACKED_PRIVATE_MARKER');
  await writeFile(join(root, '.aws', 'credentials.json'), 'TRACKED_PRIVATE_MARKER');
  await writeFile(join(root, '.codex', 'settings.json'), 'TRACKED_PRIVATE_MARKER');
  execFileSync('git', ['add', '--', 'src/App.tsx', '.aws/credentials.json', '.codex/settings.json'], { cwd: root });
  assert.deepEqual(await exportSource(root), ['src/App.tsx']);
  const source = await readFile(join(root, 'SOURCE.md'), 'utf8');
  assert.match(source, /Safe source/);
  assert.doesNotMatch(source, /PRIVATE_MARKER|credentials|\.codex/);
 } finally { await rm(root, { recursive: true, force: true }); }
});

```

## tests/security/public-assets.test.mjs

```
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkPublicAssets } from '../../scripts/check-public.mjs';

test('public asset check accepts normal files but blocks private configuration and scripts', async () => {
 const root = await mkdtemp(join(tmpdir(), 'portfolio-public-test-'));
 try {
  await writeFile(join(root, 'cover.png'), 'fixture');
  await writeFile(join(root, 'robots.txt'), 'User-agent: *');
  await checkPublicAssets(root);
  for (const name of ['.env', 'credentials.txt', 'debug.js', 'source.map']) {
   await writeFile(join(root, name), 'PRIVATE_TEST_MARKER');
   await assert.rejects(checkPublicAssets(root), /must not be published|Unreviewed public asset type/);
   await rm(join(root, name));
  }
 } finally { await rm(root, { recursive: true, force: true }); }
});

```

## tsconfig.json

```
{"compilerOptions":{"target":"ES2020","useDefineForClassFields":true,"lib":["ES2020","DOM","DOM.Iterable"],"module":"ESNext","skipLibCheck":true,"moduleResolution":"Bundler","allowImportingTsExtensions":true,"resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx","strict":true},"include":["src","vite.config.ts"]}

```

## vite.config.ts

```
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

```
