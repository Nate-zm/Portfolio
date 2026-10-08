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
