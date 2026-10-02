# File tree and complete source

```text
.github/workflows/deploy.yml
.gitignore
index.html
package-lock.json
package.json
playwright.config.ts
postcss.config.js
prompt
public/assets/Nathanael Nyirenda resume.pdf
public/assets/projects/Nicecream.png
public/assets/projects/portfolio.png
public/assets/projects/README.md
public/assets/projects/zamket.png
public/assets/your-name-CV-ATS.pdf
public/assets/your-name-CV.pdf
public/assets/your-name.vcf
public/favicon.svg
public/robots.txt
public/sitemap.xml
public/social.svg
README.md
scripts/assets.mjs
src/App.tsx
src/components/ConnectionNotes.tsx
src/components/QrModal.tsx
src/components/TypewriterRole.tsx
src/components/ui/button.tsx
src/components/ui/dialog.tsx
src/data/content.ts
src/main.tsx
src/styles.css
src/vite-env.d.ts
tailwind.config.js
tests/portfolio.spec.ts
tsconfig.json
vite.config.ts
```

## .github/workflows/deploy.yml

```
name: Deploy portfolio
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4

```

## index.html

```
<!doctype html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#090b11"/><meta name="description" content="Portfolio of a KNRTU graduate working in software engineering, systems administration, and design."/><meta property="og:title" content="Nathanael Nyirenda  -  Engineering with intention"/><meta property="og:description" content="Software, systems, and everything in between."/><meta property="og:type" content="website"/><meta property="og:image" content="./social.svg"/><meta name="twitter:card" content="summary_large_image"/><link rel="icon" href="./favicon.svg"/><title>Nathanael Nyirenda  -  Software & Systems</title><script>try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{document.documentElement.dataset.theme='dark'}</script></head><body><div id="root"></div><noscript><p>This portfolio needs JavaScript. <a href="./assets/Nathanael%20Nyirenda%20resume.pdf" download>Download CV for Nathanael Nyirenda (PDF)</a> or <a href="mailto:n8.vision.00@gmail.com">contact the owner</a>.</p></noscript><script type="module" src="/src/main.tsx"></script></body></html>

```

## package.json

```
{"name":"signal-portfolio","private":true,"version":"1.0.0","type":"module","scripts":{"dev":"vite --host 0.0.0.0","build":"tsc -b && vite build","preview":"vite preview --host 0.0.0.0","assets":"node scripts/assets.mjs"},"dependencies":{"react":"^18.3.1","react-dom":"^18.3.1","lucide-react":"^0.468.0","framer-motion":"^11.15.0","@radix-ui/react-dialog":"^1.1.6","@radix-ui/react-popover":"^1.1.6","qrcode.react":"^4.2.0","class-variance-authority":"^0.7.1","clsx":"^2.1.1","tailwind-merge":"^2.6.0"},"devDependencies":{"typescript":"~5.7.2","vite":"^6.0.5","@vitejs/plugin-react":"^4.3.4","@types/react":"^18.3.18","@types/react-dom":"^18.3.5","tailwindcss":"^3.4.17","postcss":"^8.4.49","autoprefixer":"^10.4.20","pdf-lib":"^1.17.1","@playwright/test":"^1.49.1"}}

```

## playwright.config.ts

```
import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:60000,use:{channel:'msedge',headless:true,viewport:{width:1440,height:900}}});

```

## postcss.config.js

```
export default {plugins:{tailwindcss:{},autoprefixer:{}}};

```

## public/assets/projects/README.md

```
# Project images

Place your project screenshots here. Suggested filenames:

- zamket.png  -  e-commerce website
- Nicecream.png - Nicecream design for Premium Foods Manufacturing Ltd × Shoprite
- portfolio.png  -  portfolio website

Deploy keeps its existing illustrated terminal cover; no deploy image is required.

JPG, PNG, WebP, and SVG are supported. Images fit inside the original padded cover area without cropping, with the existing background, perspective hover, and case-study interaction.

In `src/data/content.ts`, edit each project's `name` and `image`:

```ts
name: 'My project name',
image: 'assets/projects/my-image.webp',
```

Use the path starting at `assets/`, without `public/` or a leading slash. Set `image: ''` to keep the illustrated cover. Missing images fall back to the illustration automatically.

```

## public/assets/your-name.vcf

```
BEGIN:VCARD
VERSION:3.0
FN:Nathanael Nyirenda
N:Nyirenda;Nathanael;;;
EMAIL:n8.vision.00@gmail.com
TITLE:Software Engineer and Systems Administrator
NOTE:Software engineering and systems administration
END:VCARD

```

## public/favicon.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#11141d"/><text x="9" y="43" font-family="sans-serif" font-weight="bold" font-size="27" fill="#aaa1ff">NN</text></svg>
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

## public/social.svg

```
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#090b11"/><circle cx="1000" cy="320" r="240" stroke="#7771b8" stroke-opacity=".25" fill="none"/><text x="90" y="150" fill="#a8a2ee" font-family="sans-serif" font-size="22">NATHANAEL NYIRENDA / SOFTWARE &amp; SYSTEMS</text><text x="85" y="295" fill="#f0f1f6" font-family="sans-serif" font-size="88">Engineering</text><text x="85" y="395" fill="#a8a2ee" font-family="sans-serif" font-size="88">with intention.</text><text x="90" y="510" fill="#959aab" font-family="sans-serif" font-size="25">Web development, systems administration, and design.</text></svg>
```

## README.md

```
# Engineering with intention

A static React 18 + TypeScript portfolio with Tailwind, shadcn-style Button and Radix dialog primitives, Framer Motion, and Lucide icons. All personal details, projects, proficiency scores, achievements, and links are explicitly sample content.

## Run

Use Node 22 or newer. On Windows PowerShell, use `npm.cmd` if the script execution policy blocks `npm`.

```sh
npm install
npm run dev
npm run build
npm run preview
```

`dist/` is the complete deployable site. `npm run assets` regenerates SAMPLE CV PDFs, vCard, SVG artwork, and SOURCE.md; do not run it after replacing those assets with your real files.

## Personalize before publishing

- Update `src/data/content.ts`: name, initials, bio, location, timezone, email, social URLs, actual skills, projects, education, leadership, achievements, references, and CV paths.
- The CV download uses `public/assets/Nathanael Nyirenda resume.pdf`. Replace that file to update your CV, or change its path in `src/data/content.ts`. The contact download uses `your-name.vcf`. The displayed paper is a stylized preview, not a rendering of the PDF.
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

Reduced-motion preferences disable CSS animation and scroll behavior and are respected by reveal/filter animations. Responsive layout targets 360, 390, 768, 1024, 1440, and 1920 pixels. Fonts are fetched from Google Fonts with system fallbacks; self-host for fully offline typography. Lighthouse 95+ is a target, not an audited score; verify performance, contrast, SEO and accessibility on the final production site after replacing content.

`SOURCE.md` contains the source file tree and complete text files. Binary PDFs are generated by `scripts/assets.mjs`; dependencies are reproduced from `package-lock.json`.


```

## scripts/assets.mjs

```
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
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
// Deliver the requested full file tree and source in a reviewable artifact.
async function walk(dir=''){const out=[];for(const item of await readdir(dir||'.',{withFileTypes:true})){const path=dir?`${dir}/${item.name}`:item.name;if(['node_modules','dist','.git','.tools','.npm-cache','test-results','playwright-report'].includes(item.name)||['SOURCE.md','preview.png'].includes(item.name)||item.name.endsWith('.tsbuildinfo'))continue;if(item.isDirectory())out.push(...await walk(path));else out.push(path)}return out}
const files=await walk();let source='# File tree and complete source\n\n```text\n'+files.join('\n')+'\n```\n';for(const file of files.filter(f=>/\.(tsx?|css|js|mjs|json|html|yml|md|txt|xml|svg|vcf)$/.test(f)&&f!=='package-lock.json'))source+=`\n## ${file}\n\n\`\`\`\n${await readFile(file,'utf8')}\n\`\`\`\n`;await writeFile('SOURCE.md',source);

```

## src/App.tsx

```
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Download, Sun, Moon, Command, Github, Mail, Linkedin, Send, MessageCircle, Check, ChevronDown, ChevronLeft, ChevronRight, QrCode, Copy, Menu, Terminal, Server, Code2, Layers, MapPin, ExternalLink } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { content, asset } from './data/content';
import TypewriterRole from './components/TypewriterRole';
import ConnectionNotes from './components/ConnectionNotes';
import { Button } from './components/ui/button';
import { Modal } from './components/ui/dialog';
const QrModal=lazy(()=>import('./components/QrModal'));
type Project=typeof content.projects[number];
const sections=['About','Skills','Projects','Journey','Contact'];
function Reveal({children,className=''}:{children:ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.5}}>{children}</motion.div>}
function Counter({value}:{value:number}){const [n,setN]=useState(0);const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedMotion();useEffect(()=>{let timer:ReturnType<typeof setInterval>;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){observer.disconnect();if(reduced){setN(value);return}let v=0;timer=setInterval(()=>{v++;setN(v);if(v>=value)clearInterval(timer)},120)} });if(ref.current)observer.observe(ref.current);return()=>{observer.disconnect();clearInterval(timer)}},[value,reduced]);return <span ref={ref}>{n.toString().padStart(2,'0')}</span>}
function CVButton({compact=false,onQR}:{compact?:boolean;onQR:()=>void}){const [phase,setPhase]=useState(0);const [selected,setSelected]=useState(0);const [size,setSize]=useState('PDF');const timer=useRef<ReturnType<typeof setTimeout>>();useEffect(()=>()=>clearTimeout(timer.current),[]);useEffect(()=>{const controller=new AbortController();fetch(asset(content.cv[selected].path),{signal:controller.signal}).then(r=>r.blob()).then(b=>setSize(`${(b.size/1024).toFixed(1)} KB`)).catch(()=>setSize(content.cv[selected].format));return()=>controller.abort()},[selected]);function download(e:React.MouseEvent<HTMLAnchorElement>){if(phase)return e.preventDefault();e.preventDefault();setPhase(1);timer.current=setTimeout(()=>{setPhase(2);const a=document.createElement('a');a.href=asset(content.cv[selected].path);a.download='';document.body.append(a);a.click();a.remove();timer.current=setTimeout(()=>setPhase(0),1800)},900)}return <div className="cv-action"><div className="split-button"><a className="button button-primary magnetic" href={asset(content.cv[selected].path)} download onClick={download}>{phase===2?<Check size={17}/>:<Download size={17} className={phase===1?'spin':''}/>} {phase===1?'Preparing…':phase===2?'Downloaded':compact?'Get CV':'Download CV'}</a><Popover.Root><Popover.Trigger className="format-trigger" aria-label="Choose CV format"><ChevronDown size={16}/></Popover.Trigger><Popover.Portal><Popover.Content className="popover" sideOffset={8}><span className="eyebrow">TAKE YOUR PICK</span>{content.cv.map((f,i)=><button key={f.path} onClick={()=>setSelected(i)} className="format-option">{f.label}{selected===i&&<Check size={16}/>}</button>)}<button className="format-option" onClick={onQR}>Take it with you <QrCode size={16}/></button><Popover.Arrow className="popover-arrow"/></Popover.Content></Popover.Portal></Popover.Root></div><span className="sr-only" aria-live="polite">{phase===1?'$ build cv --format=pdf':phase===2?'Your file is ready. Download started.':`${content.cv[selected].label}, ${size}`}</span>{phase===1&&<div className="build-status"><span className="progress-ring"/><code>$ build cv --format={content.cv[selected].format.toLowerCase()}</code></div>}{phase===2&&<span className="confetti" aria-hidden="true">✦ · ✧ · ✦</span>}</div>}
function ProjectCover({project}:{project:Project}){const [failed,setFailed]=useState('');return project.image&&failed!==project.image?<div className={`project-cover project-image ${project.cover}`}><div className="project-image-frame"><img src={asset(project.image)} alt="" loading="lazy" decoding="async" onError={()=>setFailed(project.image)}/></div></div>:<Cover type={project.cover}/>}
function Cover({type}:{type:string}){return <div className={`project-cover ${type}`} aria-hidden="true">{type==='orbit'?<div className="mock-window"><div className="mock-top"><i/><i/><i/><span>orbit / workspace</span></div><div className="mock-layout"><div className="mock-sidebar">o.<br/><br/><span>Overview</span><br/>Projects<br/>Activity</div><div className="mock-body"><small>YOUR WORK, IN FOCUS</small><strong>Make room for good work.</strong><div className="mock-columns">{['To do','In progress','Done'].map((x,i)=><div key={x}><small>{x}</small><b/><b/><b style={{opacity:.3+i*.2}}/></div>)}</div></div></div></div>:type==='pulse'?<div className="pulse-ui"><div><span className="status-dot"/> ALL SYSTEMS OPERATIONAL <Server size={18}/></div><strong>99.98<span>%</span></strong><small>UPTIME / LAST 30 DAYS</small><div className="bars">{Array.from({length:30},(_,i)=><i key={i} style={{height:`${25+(i*37)%65}%`}}/>)}</div><footer>api-server <span>24 ms ↗</span></footer></div>:type==='atlas'?<div className="atlas-ui"><Layers size={30}/><strong>A little more<br/>understanding.</strong><span>KNOWLEDGE, CONNECTED.</span><div>Research <b>12</b></div><div>Systems <b>08</b></div></div>:<div className="terminal-ui"><div><i/> deploy-toolkit  -  bash</div><p><em>~</em> $ deploy production</p><p>✓ Environment verified</p><p>✓ Containers healthy</p><p>✓ Backup complete</p><p className="terminal-success">Deployment successful. <span>▌</span></p></div>}</div>}
export default function App(){const [theme,setTheme]=useState(document.documentElement.dataset.theme||'dark');const [menu,setMenu]=useState(false);const [active,setActive]=useState('');const [filter,setFilter]=useState('All');const [project,setProject]=useState<Project|null>(null);const [palette,setPalette]=useState(false);const [query,setQuery]=useState('');const [qr,setQr]=useState(false);const [toast,setToast]=useState('');const [floating,setFloating]=useState(false);const [time,setTime]=useState('');const hero=useRef<HTMLElement>(null);const toastTimer=useRef<ReturnType<typeof setTimeout>>();const reduced=useReducedMotion();
function toggleTheme(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem('theme',next)}catch{}}
function notify(message:string){setToast(message);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3000)}
async function copyEmail(){try{await navigator.clipboard.writeText(content.email);notify('Email copied to clipboard')}catch{notify(`Email: ${content.email}`)}}
useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(p=>!p)}};document.addEventListener('keydown',key);const observer=new IntersectionObserver(([e])=>setFloating(!e.isIntersecting),{threshold:.08});if(hero.current)observer.observe(hero.current);const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-20% 0px -55% 0px'});sections.forEach(s=>{const el=document.getElementById(s.toLowerCase());if(el)navObserver.observe(el)});const clock=()=>setTime(new Intl.DateTimeFormat('en-GB',{timeZone:content.timezone,hour:'2-digit',minute:'2-digit'}).format(new Date()));clock();const timer=setInterval(clock,30000);const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Person',name:content.name,jobTitle:content.role,email:content.email,sameAs:Object.values(content.links)});document.head.append(schema);return()=>{document.removeEventListener('keydown',key);observer.disconnect();navObserver.disconnect();clearInterval(timer);clearTimeout(toastTimer.current);schema.remove()}},[]);
const actions=[{label:'Download CV',run:()=>{const a=document.createElement('a');a.href=asset(content.cv[0].path);a.download='';a.click()},icon:Download},{label:'Copy email',run:copyEmail,icon:Copy},{label:'Open GitHub',href:content.links.github,icon:Github},{label:'Jump to Projects',href:'#projects',icon:Layers},{label:'Toggle theme',run:toggleTheme,icon:Sun}];
return <><a className="skip-link" href="#main">Skip to content</a><header className="nav-shell"><a href="#" className="brand" aria-label="Back to top">{content.initials}<span> / </span></a><nav aria-label="Main navigation" className="desktop-nav">{sections.map(s=><a key={s} href={`#${s.toLowerCase()}`} className={active===s.toLowerCase()?'active':''}>{s}</a>)}</nav><div className="nav-actions"><button className="icon-button command-button" aria-label="Open command palette" onClick={()=>setPalette(true)}><Command size={16}/><kbd>K</kbd></button><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-button mobile-toggle" aria-label="Open navigation" onClick={()=>setMenu(true)}><Menu size={20}/></button></div></header>
<main id="main"><section className="hero container" ref={hero}><div className="hero-glow"/><motion.div initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="hero-content"><div className="availability"><span className="status-dot"/>{content.status}<ArrowUpRight size={13}/></div><p className="hero-intro">HELLO, I’M {content.name.toUpperCase()} <span className="intro-line"/></p><h1>Engineering<br/>with <span className="gradient-text">intention.</span><span className="heading-dot">.</span></h1><TypewriterRole/><p className="hero-description">{content.tagline}<br/>From the first design to the servers behind it,<br className="desktop-break"/> I enjoy bringing an idea to life.</p><div className="hero-ctas"><CVButton onQR={()=>setQr(true)}/><a href="#projects" className="button button-outline">Explore my work <ArrowUpRight size={17}/></a><a href="#contact" className="hero-contact">Let’s talk <ArrowUpRight size={15}/></a></div><div className="hero-meta"><span><MapPin size={14}/>{content.location}</span><span className="meta-divider"/><span>KNRTU graduate · Computer Science</span></div></motion.div><div className="hero-art" aria-hidden="true"><div className="orbital-ring ring-one"/><div className="orbital-ring ring-two"/><div className="orbital-ring ring-three"/><div className="art-core"><Code2 size={56}/></div><span className="art-label label-one">BUILD WITH PURPOSE</span><span className="art-label label-two">SYSTEMS ONLINE <i/></span><span className="art-coordinate">15.3875° S / 28.3228° E</span><div className="art-node node-one"><Terminal size={20}/></div><div className="art-node node-two"><Server size={20}/></div><span className="orbit-point"/></div><a className="scroll-cue" href="#about"><ArrowDown size={15}/> A LITTLE MORE ABOUT ME <span>SCROLL TO EXPLORE</span></a></section>
<div className="section-divider container"><span>CURIOUS BY NATURE. ENGINEER BY PRACTICE.</span><span>PORTFOLIO / 2026</span></div>
<section id="about" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">01 / THE PERSON BEHIND THE CODE</p><h2>A builder at heart.</h2></div><p>I work on the interface<br/>and what happens behind it.</p></div></Reveal><div className="about-grid"><Reveal className="glass bio-card"><span className="card-label">A LITTLE ABOUT ME <ArrowUpRight size={17}/></span><h3>I like figuring things out.<br/><span className="muted">Then making them better.</span></h3><p>{content.bio}</p><a href="#journey" className="text-link">My journey so far <ArrowUpRight size={16}/></a><div className="stats">{content.stats.map(s=><div key={s.label}><strong><Counter value={s.value}/><span>+</span></strong><small>{s.label}</small></div>)}</div></Reveal><Reveal className="glass currently-card"><span className="card-label"><span className="status-dot"/> CURRENTLY</span>{content.currently.map((item,i)=><div className="currently-item" key={item.label}><span className="currently-icon">{i===0?<Code2 size={18}/>:i===1?<Terminal size={18}/>:<Layers size={18}/>}</span><div><small>{item.label}</small><p>{item.value}</p></div></div>)}<div className="currently-footer">Always a work in progress.<span className="status-dot"/></div></Reveal></div></section>
<section id="skills" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">02 / MY TOOLKIT</p><h2>The right tools.<br/><span className="muted">The right mindset.</span></h2></div><p>The tools I use to build,<br/>design, and keep things running.</p></div></Reveal><p className="skill-swipe-hint">Swipe to explore my toolkit <ArrowUpRight size={14}/></p><div className="skills-grid" tabIndex={0} role="region" aria-label="Skills and design tools">{content.skills.map((s,i)=><Reveal key={s.title} className="glass skill-card"><span className="skill-number">0{i+1}</span><span className="skill-code">{s.code}</span><h3>{s.title}</h3><p>{s.description}</p><div className="chips">{s.items.map(x=><span key={x}>{x}</span>)}</div>{s.level!==null&&<><div className="skill-meter" role="meter" aria-label={`${s.title} sample proficiency`} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${s.level}%`}}/></div><small className="skill-detail">Sample proficiency · replace with your assessment</small></>}</Reveal>)}</div></section>
<section id="projects" className="section container"><Reveal><div className="section-head"><div><p className="eyebrow">03 / SELECTED WORK</p><h2>Ideas, made real<span className="accent">.</span></h2></div><a href={content.links.github} target="_blank" rel="noopener noreferrer" className="text-link">More on GitHub <ArrowUpRight size={16}/></a></div><div className="project-toolbar"><div className="filters" aria-label="Project categories">{['All','Web','Systems','Design'].map(f=><button key={f} aria-pressed={filter===f} className={f===filter?'selected':''} onClick={()=>setFilter(f)}>{f}{f==='All'&&<span>04</span>}</button>)}</div><span className="small muted">WEB / SYSTEMS / DESIGN</span></div></Reveal><motion.div layout className="projects-grid"><AnimatePresence mode="popLayout">{content.projects.filter(p=>filter==='All'||p.category===filter).map(p=><motion.article layout key={p.id} className="glass project-card" initial={reduced?false:{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} transition={{duration:.25}}><button className="cover-button" onClick={()=>setProject(p)} aria-label={`Read ${p.name} case study`}><ProjectCover project={p}/><span className="cover-arrow"><ArrowUpRight size={22}/></span></button><div className="project-info"><div className="project-topline"><span className="eyebrow">{p.category} / {p.label}</span><span className="project-number">{p.number}</span></div><button className="project-title" onClick={()=>setProject(p)}>{p.name}<ArrowUpRight size={20}/></button><p>{p.description}</p><div className="project-footer"><div className="chips">{p.stack.map(x=><span key={x}>{x}</span>)}</div><div className="project-links"><a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live demo (placeholder)`}><ExternalLink size={16}/><span>Live</span></a><a href={p.source} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source (placeholder)`}><Github size={16}/><span>Source</span></a></div></div></div></motion.article>)}</AnimatePresence></motion.div></section>
<section className="section container resume-section"><Reveal className="glass resume-card"><div><p className="eyebrow">THE SHORT VERSION OF MY STORY</p><h2>Good on paper.<br/><span className="gradient-text">Better in person.</span></h2><p>My experience, education, and skills.<br/>A quick way to get to know my work.</p><div className="resume-actions"><CVButton onQR={()=>setQr(true)}/><button className="icon-button" onClick={()=>setQr(true)} aria-label="Show CV QR code"><QrCode size={20}/></button></div><div className="resume-meta"><span className="update-badge">Updated {content.updated}</span><span>PDF / Résumé</span></div></div><a href={asset(content.cv[0].path)} download className="paper-wrap" aria-label="Download CV for Nathanael Nyirenda"><div className="paper"><div className="paper-top"><span>{content.initials}.</span><ArrowUpRight size={18}/></div><h3>{content.name}</h3><p>SOFTWARE ENGINEER & SYSTEMS ADMINISTRATOR</p><div className="paper-rule"/><small>PROFILE</small><div className="paper-lines"><i/><i/><i/></div><small>EXPERIENCE & EDUCATION</small><div className="paper-lines"><i/><i/><i/><i/></div><small>TECHNICAL SKILLS</small><div className="paper-chips"><i/><i/><i/></div><span className="paper-footer">NATHANAEL NYIRENDA · RÉSUMÉ</span><span className="page-peel"/></div><span className="paper-caption">A QUICK LOOK AT MY EXPERIENCE.</span></a></Reveal></section>
<section id="journey" className="section container"><div className="journey-grid"><Reveal><p className="eyebrow">04 / THE JOURNEY</p><h2>Learning.<br/>Building.<br/><span className="muted">Moving forward.</span></h2><p className="journey-intro">I’ve finished my studies at KNRTU.<br/>Now I’m ready for the next step.</p></Reveal><div className="timeline">{content.timeline.map((item,i)=><Reveal key={item.title} className="timeline-item"><span className={`timeline-dot ${i===0?'current':''}`}/><span className="eyebrow">{item.date}</span><h3>{item.title}</h3><span className="timeline-org">{item.organization}</span><p>{item.description}</p></Reveal>)}</div></div><div className="badges-label eyebrow">LEARNING NEVER STOPS / SAMPLE ACHIEVEMENTS</div><div className="marquee"><div className="marquee-track">{[...content.badges,...content.badges].map((b,i)=><span className="badge" key={i} aria-hidden={i>=content.badges.length?true:undefined}><Check size={14}/>{b}</span>)}</div></div></section>
<section className="section container"><Reveal><ConnectionNotes/></Reveal></section>
<section id="contact" className="section container contact-section"><Reveal><div className="availability"><span className="status-dot"/> LET’S WORK TOGETHER</div><h2>Let’s build<br/><span className="gradient-text">what’s next.</span><ArrowUpRight className="contact-arrow"/></h2><p>Have a project or a role in mind?<br/>I’d be happy to hear about it.</p></Reveal><div className="contact-grid"><Reveal><div className="email-row"><a href={`mailto:${content.email}`}>{content.email}<ArrowUpRight size={21}/></a><button className="icon-button" aria-label="Copy email address" onClick={copyEmail}><Copy size={18}/></button></div><div className="socials">{[{name:'GitHub',icon:Github,url:content.links.github},{name:'LinkedIn',icon:Linkedin,url:content.links.linkedin},{name:'Telegram',icon:Send,url:content.links.telegram},{name:'WhatsApp',icon:MessageCircle,url:content.links.whatsapp}].map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} profile (placeholder)`}><s.icon size={20}/><span>{s.name}</span><ArrowUpRight size={13}/></a>)}</div><p className="small muted">Personal details and social links are placeholders.</p></Reveal><Reveal><form className="contact-form" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);window.location.href=`mailto:${content.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`)}&body=${encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`)}`;notify('Opening your email app. Send the message there.')}}><div className="form-row"><label>Your name<input name="name" required maxLength={100} placeholder="Alex Morgan" autoComplete="name"/></label><label>Email address<input name="email" type="email" required maxLength={200} placeholder="alex@company.com" autoComplete="email"/></label></div><label>What do you have in mind?<textarea name="message" required minLength={10} maxLength={3000} placeholder="A little about your project…" rows={3}/></label><Button variant="outline" type="submit">Start a conversation <ArrowUpRight size={16}/></Button><span className="small muted">Opens your email app. No data is stored.</span></form></Reveal></div></section></main>
<footer className="container footer"><a className="brand" href="#">{content.initials}<span> / </span></a><span>© {new Date().getFullYear()} {content.name}. Built with React.</span><span><span className="status-dot"/> {time} · {content.location.split(',')[0]}</span><a href="#" className="text-link">Back to top <ArrowUpRight size={14}/></a></footer>
<AnimatePresence>{floating&&<motion.div className="floating-cv" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}><span className="floating-label">Like what you see?</span><CVButton compact onQR={()=>setQr(true)}/></motion.div>}</AnimatePresence>
<Modal open={menu} onOpenChange={setMenu} title="Explore" description="Find your way around."><nav className="mobile-menu" aria-label="Mobile navigation">{sections.map(s=><a key={s} href={`#${s.toLowerCase()}`} onClick={()=>setMenu(false)}>{s}<ArrowUpRight size={24}/></a>)}</nav></Modal>
<Modal open={!!project} onOpenChange={v=>{if(!v)setProject(null)}} title={project?.name||'Project'} description="Project overview. Live and source links are placeholders.">{project&&<><ProjectCover project={project}/>{['problem','solution','outcome'].map(k=><div className="case-block" key={k}><h3>{k}</h3><p>{project[k as 'problem'|'solution'|'outcome']}</p></div>)}<div className="modal-links"><a className="button button-primary" href={project.live} target="_blank" rel="noopener noreferrer">Live demo (placeholder) <ExternalLink size={16}/></a><a className="button button-outline" href={project.source} target="_blank" rel="noopener noreferrer">Source <Github size={16}/></a></div></>}</Modal>
<Modal open={palette} onOpenChange={v=>{setPalette(v);if(!v)setQuery('')}} title="Command center" description="Your next action, one shortcut away."><label className="sr-only" htmlFor="command-search">Search actions</label><input id="command-search" className="command-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="What would you like to do?"/><div className="command-list">{actions.filter(a=>a.label.toLowerCase().includes(query.toLowerCase())).map(a=>a.href?<a key={a.label} href={a.href} target={a.href.startsWith('https')?'_blank':undefined} rel={a.href.startsWith('https')?'noopener noreferrer':undefined} onClick={()=>setPalette(false)}><a.icon size={18}/>{a.label}<ArrowUpRight size={15}/></a>:<button key={a.label} onClick={()=>{a.run?.();setPalette(false)}}><a.icon size={18}/>{a.label}<span>↵</span></button>)}{!actions.some(a=>a.label.toLowerCase().includes(query.toLowerCase()))&&<p className="muted">No matching actions.</p>}</div><span className="small muted">Tab to navigate · Enter to select · Esc to close</span></Modal>
{qr&&<Suspense fallback={<div className="toast" role="status">Preparing QR code…</div>}><QrModal open={qr} onOpenChange={setQr}/></Suspense>}<div className={`toast ${toast?'visible':''}`} role="status" aria-live="polite">{toast&&<><Check size={16}/>{toast}</>}</div></>}

```

## src/components/ConnectionNotes.tsx

```
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../data/content';

function Note({index}:{index:number}) {
 const note=content.references[index];
 return <><p className="eyebrow">A NOTE ON CONNECTION</p><blockquote>{note.quote}</blockquote><strong>{note.name}</strong><p className="small muted">{note.role}</p><a href={`mailto:${content.email}?subject=Request%20for%20references`} className="text-link">Request references</a></>;
}

export default function ConnectionNotes() {
 const [index,setIndex]=useState(0);
 const [direction,setDirection]=useState(1);
 const [turning,setTurning]=useState(false);
 const reduced=useReducedMotion();
 const turn=(step:number)=>{if(turning)return;setDirection(step);setTurning(true);setIndex(i=>(i+step+content.references.length)%content.references.length)};
 const variants={
  enter:(step:number)=>({rotateY:reduced?0:step*85,opacity:reduced?0:.3}),
  visible:{rotateY:0,opacity:1},
  exit:(step:number)=>({rotateY:reduced?0:-step*85,opacity:reduced?0:.3})
 };
 return <div className="glass reference-card">
  <span className="quote-symbol" aria-hidden="true">“</span>
  <div className="reference-flip-stage">
   {content.references.map((note,i)=><div className="reference-page reference-size-guide" aria-hidden="true" key={i}><p className="eyebrow">A NOTE ON CONNECTION</p><blockquote>{note.quote}</blockquote><strong>{note.name}</strong><p className="small muted">{note.role}</p><span className="text-link">Request references</span></div>)}
   <AnimatePresence mode="wait" custom={direction} initial={false}>
    <motion.div className="reference-page" key={index} custom={direction} variants={variants} initial="enter" animate="visible" exit="exit" transition={{duration:reduced?.12:.38,ease:[.25,.1,.25,1]}} onAnimationComplete={phase=>{if(phase==='visible')setTurning(false)}}><Note index={index}/></motion.div>
   </AnimatePresence>
  </div>
  <div className="carousel-controls"><button className="icon-button" aria-label="Previous reference" aria-disabled={turning} onClick={()=>turn(-1)}><ChevronLeft size={18}/></button><span className="small muted">{index+1} / {content.references.length}</span><button className="icon-button" aria-label="Next reference" aria-disabled={turning} onClick={()=>turn(1)}><ChevronRight size={18}/></button></div>
  <span className="sr-only" role="status" aria-live="polite">Note {index+1} of {content.references.length}: {content.references[index].quote}</span>
 </div>;
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
    if (reduced) { setText(content.roles[0]); return; }
    let index = 0, length = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const role = content.roles[index];
      length += deleting ? -1 : 1;
      setText(role.slice(0, length));
      let delay = deleting ? 18 : 32;
      if (!deleting && length === role.length) { deleting = true; delay = 1600; }
      else if (deleting && length === 0) { deleting = false; index = (index + 1) % content.roles.length; delay = 180; }
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
import { twMerge } from 'tailwind-merge';
const variants=cva('button',{variants:{variant:{default:'button-primary',outline:'button-outline',ghost:'button-ghost'}},defaultVariants:{variant:'default'}});
export const Button=forwardRef<HTMLButtonElement,ButtonHTMLAttributes<HTMLButtonElement>&VariantProps<typeof variants>>(({className,variant,...props},ref)=><button ref={ref} className={twMerge(clsx(variants({variant}),className))} {...props}/>);
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
// Personal details and unconfirmed links are placeholders; selected projects are editable below.
export const content = {
  name: 'Nathanael Nyirenda', initials: 'NN', role: 'Software Engineer', secondaryRole: 'Information Systems Administrator',
  roles: ['Software Engineer', 'Info System Administrator', 'UI/UX Designer', 'Graphic Designer', 'DevOp Eng.'],
  tagline: 'I build websites, design brands, and keep systems running.', bio: 'I’m a KNRTU graduate with a background in computer science. I work across web development, systems administration, and design. I like figuring out how things work, solving practical problems, and making things people enjoy using.',
  location: 'Lusaka, Zambia', timezone: 'Africa/Lusaka', status: 'Open to internships & freelance', email: 'n8.vision.00@gmail.com', updated: 'October 2026',
  links: { github:'https://github.com/Nate-zm', linkedin:'https://www.linkedin.com/in/YOUR_USERNAME', telegram:'https://t.me/Nate_zm', whatsapp:'https://wa.me/260776612267' },
  cv: [{label:'CV (PDF)',path:'assets/Nathanael Nyirenda resume.pdf',format:'PDF'}, {label:'Save my contact',path:'assets/your-name.vcf',format:'VCF'}],
  stats:[{value:4,label:'Selected projects'},{value:2,label:'Connected disciplines'},{value:1,label:'Always learning'}],
  currently: [{label:'Learning',value:'Cloud infrastructure & DevOps'},{label:'Building',value:'Useful tools for everyday problems'},{label:'Reading',value:'Designing Data-Intensive Applications'}],
  skills:[{title:'Frontend engineering',code:'</>',description:'Web interfaces that are easy to use.',items:['TypeScript','React','Tailwind CSS','Accessibility'],level:80},{title:'Backend & data',code:'{ }',description:'APIs and databases that support the app.',items:['Node.js','Python','PostgreSQL','REST APIs','Testing'],level:70},{title:'Systems administration',code:'~/_',description:'Keeping servers and networks running.',items:['Linux','Windows Server','Networking','Virtualization'],level:75},{title:'Cloud & operations',code:'↑_',description:'Automating tasks and spotting issues early.',items:['Docker','Cloud','Security','Monitoring','Backups','ITIL / DevOps'],level:65},{title:'Design tools',code:'✳',description:'Tools I use for UI design, graphics, and visual content.',items:['Figma','Photoshop','Canva'],level:null}],
  // Rename via name; add screenshots in public/assets/projects and set image below.
  projects:[
    {id:'zamket',name:'Zamket',category:'Web',label:'E-commerce website',number:'01',description:'An online store where customers can browse and shop.',problem:'Create an online storefront for browsing and shopping.',solution:'Zamket brings the store experience to the web.',outcome:'Add your contribution, technology stack, and verified results here.',stack:['E-commerce','Web'],live:'https://zamket.vercel.app',source:'https://github.com/YOUR_USERNAME/zamket',cover:'orbit',image:'assets/projects/zamket.png'},
    {id:'nicecream',name:'Nicecream',category:'Design',label:'Premium Foods × Shoprite',number:'02',description:'Nicecream design for Premium Foods Manufacturing Ltd × Shoprite.',problem:'Create a design for Nicecream that presents the product clearly.',solution:'Graphic design work for Premium Foods Manufacturing Ltd × Shoprite.',outcome:'Add the design brief, deliverables, and final results here.',stack:['Graphic design','Food branding'],live:'https://example.com/nicecream',source:'https://github.com/YOUR_USERNAME/nicecream',cover:'pulse',image:'assets/projects/Nicecream.png'},
    {id:'portfolio',name:'Portfolio',category:'Web',label:'Portfolio website',number:'03',description:'A personal portfolio for software, systems, and design work.',problem:'Bring different disciplines and selected work into one place.',solution:'A responsive website presenting projects, skills, and contact details.',outcome:'Add your implementation details and verified results here.',stack:['Portfolio','Web'],live:'https://example.com/portfolio',source:'https://github.com/YOUR_USERNAME/portfolio',cover:'atlas',image:'assets/projects/portfolio.png'},
    {id:'deploy',name:'Deploy toolkit',category:'Systems',label:'Sample concept',number:'04',description:'Repeatable deployments, from the first command.',problem:'Manual server setup is inconsistent and time-consuming.',solution:'Versioned automation for provisioning, backups, and deployment checks.',outcome:'Sample concept: document measured deployment time savings here.',stack:['Bash','Docker','GitHub Actions'],live:'https://example.com/deploy',source:'https://github.com/YOUR_USERNAME/deploy',cover:'deploy',image:''}],
  timeline:[{date:'Graduated',title:'Computer Science graduate',organization:'KNRTU · Kazan',description:'Graduated from KNRTU’s Department of Intelligent Systems and Information Resource Management, with a focus on web development and systems administration.'},{date:'2025–2026',title:'Student Association Chairman',organization:'Leadership · Zambians in Russia',description:'Led student affairs for Zambian students across Russia and served as the link between students and the Zambian embassy.'},{date:'Next chapter',title:'Building a new team',organization:'Zambian Engineers',description:'Bringing together Zambian engineers to share ideas, build together, and reach new heights.'}],
  badges:['Linux foundations · sample','Web development · sample','Cloud fundamentals · sample','Student leadership · sample','Open-source contributor · sample'],
  references:[{quote:'Good work is built on trust. Professional references are available on request.',name:'Let’s start a conversation',role:'No invented testimonials'},{quote:'Have a project in mind? I’d love to talk about the problem you’re solving.',name:'Your next collaboration',role:'Internships · freelance · projects'}]
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

## src/styles.css

```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
:root{--bg:#090b11;--surface:#11141d;--surface-raised:#181c28;--text:#f0f1f6;--muted:#959aab;--border:#ffffff12;--accent:#9695ff;--cyan:#6ddbd9;--radius:20px;--space:24px;--blur:20px;color-scheme:dark}
:root[data-theme=light]{--bg:#f5f6fa;--surface:#fff;--surface-raised:#eceef5;--text:#151827;--muted:#5e6476;--border:#15182718;--accent:#5751cb;--cyan:#067978;color-scheme:light}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:110px}body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.65;-webkit-font-smoothing:antialiased}body:before{content:'';position:fixed;inset:0;pointer-events:none;opacity:.025;z-index:20;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23ffffff' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E")}a{color:inherit;text-decoration:none}button,input,textarea{font:inherit}button{cursor:pointer}button,a,input,textarea{-webkit-tap-highlight-color:transparent}button{color:inherit}button:disabled{cursor:wait}::selection{background:#7772e955}::-webkit-scrollbar{width:7px}::-webkit-scrollbar-thumb{background:#62647a;border-radius:8px}:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.container{width:min(1160px,calc(100% - 96px));margin-inline:auto}.muted{color:var(--muted)}.small{font-size:11px}.eyebrow,.card-label,.hero-intro,.art-label,.art-coordinate,.scroll-cue,.section-divider,.badges-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1.5px;line-height:1.6}.eyebrow{color:var(--accent);margin:0 0 18px}.gradient-text{background:linear-gradient(105deg,#aba3ff 5%,#8fb5ef 65%,#83d8d5);background-clip:text;-webkit-text-fill-color:transparent}:root[data-theme=light] .gradient-text{background-image:linear-gradient(105deg,#6556ce,#197d92)}.accent{color:var(--accent)}h1,h2,h3,p{margin-top:0}h1,h2,h3{line-height:1.12;letter-spacing:-.045em}h2{font-size:clamp(32px,4.2vw,50px);font-weight:500;margin-bottom:0}h3{font-size:23px;font-weight:500}p{color:var(--muted)}.nav-shell{position:absolute;z-index:30;left:50%;transform:translateX(-50%);top:28px;width:min(1160px,calc(100% - 96px));display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:color-mix(in srgb,var(--surface) 75%,transparent);border:1px solid var(--border);border-radius:14px;backdrop-filter:blur(var(--blur))}.brand{font-weight:700;font-size:21px;letter-spacing:-1px}.brand span{color:var(--accent);font-weight:400}.desktop-nav{display:flex;gap:28px}.desktop-nav a{font-size:12px;color:var(--muted);transition:color .2s}.desktop-nav a:hover,.desktop-nav a.active{color:var(--text)}.desktop-nav a.active:after{content:'';display:block;width:4px;height:4px;border-radius:50%;background:var(--accent);margin:auto}.nav-actions{display:flex;gap:10px;align-items:center}.icon-button{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:44px;min-height:44px;background:none;border:1px solid var(--border);border-radius:10px;transition:background .2s}.icon-button:hover{background:var(--surface-raised)}.command-button{font-size:10px;color:var(--muted)}kbd{font-family:inherit}.mobile-toggle{display:none}.hero{position:relative;min-height:790px;display:flex;align-items:center;padding-top:110px;padding-bottom:120px}.hero-glow{position:absolute;top:-100px;right:-40px;width:700px;height:720px;max-width:90vw;background:radial-gradient(ellipse,#6559b61c,transparent 65%);pointer-events:none}.hero-content{position:relative;z-index:2;width:65%}.availability{display:inline-flex;align-items:center;gap:9px;font-size:10px;color:var(--muted);border:1px solid var(--border);border-radius:100px;padding:7px 12px;background:var(--surface);margin-bottom:32px}.status-dot{display:inline-block;width:6px;height:6px;flex-shrink:0;border-radius:50%;background:#80cfa2;box-shadow:0 0 12px #80cfa244;animation:breathe 3s infinite}.hero-intro{display:flex;gap:18px;align-items:center;color:var(--muted);font-size:10px;margin-bottom:18px}.intro-line{height:1px;width:46px;background:var(--border)}h1{font-size:clamp(58px,6.9vw,94px);font-weight:500;line-height:1.04;margin-bottom:25px;letter-spacing:-.06em}.heading-dot{display:none}.role-line{display:flex;align-items:center;gap:10px;font-size:15px;min-height:30px;margin-bottom:22px}.role-symbol{font-family:monospace;color:var(--accent)}.cursor{width:5px;height:15px;background:var(--accent);animation:breathe 1s infinite}.hero-description{font-size:14px;line-height:1.85;margin-bottom:30px}.hero-ctas{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.button{min-height:46px;padding:12px 18px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-size:11px;font-weight:500;border:1px solid transparent;transition:transform .2s,background .2s,box-shadow .2s}.button:hover{transform:translateY(-2px)}.button-primary{color:#fff;background:linear-gradient(120deg,#7362d9,#646dd1);box-shadow:inset 0 1px #ffffff30,0 4px 20px #7568ee18}.button-primary:hover{box-shadow:0 7px 24px #7568ee40}.button-outline{background:var(--surface);border-color:var(--border)}.button-ghost{background:none}.hero-contact{font-size:11px;display:flex;align-items:center;gap:5px;padding:14px 4px;color:var(--muted)}.cv-action{position:relative}.split-button{display:flex}.split-button .button{border-radius:9px 0 0 9px}.format-trigger{min-width:37px;border:0;border-left:1px solid #ffffff22;border-radius:0 9px 9px 0;background:#646bd0;display:grid;place-items:center;color:#fff}.popover{background:var(--surface-raised);padding:16px;min-width:240px;border:1px solid var(--border);border-radius:13px;z-index:80;box-shadow:0 20px 60px #0006}.popover .eyebrow{display:block;color:var(--muted);margin-bottom:10px}.format-option{display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px 8px;border:0;background:none;font-size:12px;text-align:left;border-radius:6px}.format-option:hover{background:var(--border)}.popover-arrow{fill:var(--surface-raised)}.build-status{position:absolute;top:55px;background:var(--surface-raised);border:1px solid var(--border);padding:8px 12px;border-radius:8px;display:flex;align-items:center;gap:8px;white-space:nowrap;font-size:10px;z-index:5}.progress-ring{width:14px;height:14px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:rotate 1s infinite}.spin{animation:rotate 1s infinite}.confetti{position:absolute;left:0;top:-26px;color:var(--cyan);pointer-events:none;animation:confetti 1s both}.hero-meta{display:flex;align-items:center;gap:18px;margin-top:32px;color:var(--muted);font-size:10px}.hero-meta span{display:flex;gap:7px;align-items:center}.meta-divider{width:1px;height:12px;background:var(--border)}.hero-art{position:absolute;right:-15px;top:190px;width:430px;height:430px;opacity:.9;background:radial-gradient(ellipse,#7366e512,transparent 68%);mask-image:linear-gradient(90deg,transparent,#000 15%)}.orbital-ring{position:absolute;inset:50px;border:1px solid #9392cc25;border-radius:50%;transform:rotate(-32deg) scaleY(.6)}.ring-two{inset:20px;transform:rotate(35deg) scaleY(.7);border-color:#9291dc18}.ring-three{inset:0;transform:rotate(-10deg) scaleY(.92);border-style:dashed;border-color:#9291dc14;animation:orbit 70s linear infinite}.art-core{position:absolute;inset:145px;display:grid;place-items:center;color:#b3b0ff;background:linear-gradient(140deg,#8783c325,#1c233550);border:1px solid #a6a0ff30;border-radius:30px;box-shadow:0 0 70px #8074de18,inset 0 0 30px #8c89db15;transform:rotate(-12deg)}.art-core svg{transform:rotate(12deg)}.art-label{position:absolute;color:var(--muted);font-size:8px;letter-spacing:1px}.label-one{top:40px;left:100px}.label-two{bottom:70px;right:30px;display:flex;gap:8px;align-items:center}.label-two i{width:4px;height:4px;background:var(--cyan);border-radius:50%}.art-coordinate{position:absolute;bottom:4px;left:80px;font-size:8px;color:var(--muted);opacity:.5}.art-node{position:absolute;border:1px solid var(--border);background:var(--surface);width:50px;height:50px;border-radius:14px;display:grid;place-items:center;color:var(--muted);animation:float 5s ease-in-out infinite}.node-one{top:100px;right:40px}.node-two{bottom:100px;left:35px;animation-delay:-2s}.orbit-point{position:absolute;top:90px;left:100px;width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 20px var(--accent)}.scroll-cue{position:absolute;bottom:36px;left:0;display:flex;align-items:center;gap:12px;color:var(--muted);font-size:8px}.scroll-cue svg{animation:float 3s infinite}.scroll-cue span{margin-left:25px;color:var(--muted);opacity:.5;font-size:7px}.section-divider{border-top:1px solid var(--border);padding-top:18px;display:flex;justify-content:space-between;font-size:8px;color:var(--muted);letter-spacing:1px}.section{padding-top:100px}.section-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:35px;gap:20px}.section-head>p{font-size:12px;margin-bottom:3px}.glass{position:relative;background:linear-gradient(140deg,color-mix(in srgb,var(--surface) 98%,var(--accent)),var(--surface));border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}.glass:before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 0 0,#9999ff07,transparent 60%)}.glass:hover{border-color:color-mix(in srgb,var(--accent) 25%,transparent)}.about-grid{display:grid;grid-template-columns:1.65fr 1fr;gap:20px}.bio-card{padding:32px}.card-label{color:var(--muted);display:flex;align-items:center;justify-content:space-between;font-size:9px;margin-bottom:30px}.bio-card h3{font-size:29px;line-height:1.3}.bio-card>p{max-width:500px;font-size:12px;line-height:1.9}.text-link{display:inline-flex;align-items:center;gap:10px;font-size:11px;min-height:44px;position:relative}.text-link:after{content:'';position:absolute;left:0;bottom:5px;width:0;height:1px;background:var(--accent);transition:width .2s}.text-link:hover:after{width:100%}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;border-top:1px solid var(--border);padding-top:25px;margin-top:22px}.stats strong{font-size:35px;letter-spacing:-2px;font-weight:500;display:block;line-height:1.2}.stats strong>span:last-child{font-size:21px;color:var(--accent)}.stats small{font-size:9px;color:var(--muted)}.currently-card{padding:28px}.currently-card .card-label{justify-content:flex-start;gap:10px;margin-bottom:24px}.currently-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--border)}.currently-icon{width:36px;height:36px;border-radius:9px;background:var(--surface-raised);display:grid;place-items:center;color:var(--accent);flex-shrink:0}.currently-item small{color:var(--muted);font-size:9px}.currently-item p{font-size:12px;color:var(--text);margin:2px 0 0}.currently-footer{font-size:10px;color:var(--muted);display:flex;justify-content:space-between;align-items:center;padding-top:25px}.skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.skill-card{padding:26px 22px}.skill-number{position:absolute;top:24px;right:22px;color:var(--muted);font-family:monospace;font-size:9px;opacity:.5}.skill-code{display:grid;place-items:center;width:46px;height:46px;background:linear-gradient(140deg,#9183de16,#719dce08);border:1px solid var(--border);border-radius:12px;font-family:monospace;font-size:21px;color:var(--accent);margin-bottom:28px}.skill-card h3{font-size:17px;letter-spacing:-.025em;min-height:40px;margin-bottom:8px}.skill-card>p{font-size:11px;min-height:40px}.chips{display:flex;flex-wrap:wrap;gap:6px}.chips span{border:1px solid var(--border);background:var(--surface-raised);border-radius:5px;padding:3px 7px;font-size:8px;color:var(--muted);transition:color .2s}.chips span:hover{color:var(--accent)}.skill-card .chips{min-height:90px;align-content:flex-start}.skill-meter{height:3px;background:var(--border);margin-top:25px;border-radius:4px;overflow:hidden}.skill-meter span{display:block;height:100%;background:linear-gradient(90deg,#7064b0,#6ba4b0);opacity:.6}.skill-detail{display:block;font-size:8px;color:var(--muted);margin-top:10px;opacity:.5}.project-toolbar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:25px}.filters{display:flex;gap:4px;padding:4px;background:var(--surface);border:1px solid var(--border);border-radius:10px}.filters button{padding:8px 14px;min-height:40px;border:0;border-radius:7px;background:none;font-size:10px;color:var(--muted);display:flex;gap:9px;align-items:center}.filters button.selected{background:var(--surface-raised);color:var(--text)}.filters button span{font-family:monospace;font-size:8px;color:var(--accent)}.project-toolbar>.small{font-family:monospace;font-size:8px;letter-spacing:1px}.projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}.cover-button{width:100%;border:0;background:none;padding:0;display:block;text-align:left;position:relative;overflow:hidden}.project-cover{height:265px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;border-bottom:1px solid var(--border);background:radial-gradient(ellipse at 50% 90%,#7569b72f,transparent 80%),#141520;padding:30px;color:#e9ebf6}.project-cover:before{content:'';position:absolute;inset:0;background-image:linear-gradient(#ffffff03 1px,transparent 1px),linear-gradient(90deg,#ffffff03 1px,transparent 1px);background-size:28px 28px}.cover-arrow{position:absolute;right:20px;bottom:20px;width:36px;height:36px;display:grid;place-items:center;border-radius:50%;border:1px solid #ffffff25;background:#11152090;color:#fff;opacity:0;transform:translateY(8px);transition:.2s}.cover-button:hover .cover-arrow{opacity:1;transform:translateY(0)}.mock-window{position:relative;width:90%;background:#10131d;border:1px solid #ffffff18;border-radius:8px;box-shadow:0 15px 40px #0006;transform:perspective(900px) rotateY(-8deg) rotateX(5deg);transition:transform .5s}.cover-button:hover .mock-window{transform:perspective(900px) rotateY(0) rotateX(0)}.mock-top{height:25px;display:flex;gap:4px;align-items:center;border-bottom:1px solid #ffffff0d;padding:8px}.mock-top i{width:4px;height:4px;background:#55536b;border-radius:50%}.mock-top span{font-size:6px;color:#787b8f;margin-left:10px;font-family:monospace}.mock-layout{display:flex;min-height:165px}.mock-sidebar{width:62px;flex-shrink:0;padding:14px 10px;font-size:6px;line-height:3;color:#7f8499;border-right:1px solid #ffffff0b}.mock-sidebar span{color:#aaa0fa}.mock-body{padding:20px 14px;width:100%}.mock-body>small{font-size:5px;letter-spacing:1px;color:#82849b}.mock-body>strong{display:block;font-size:13px;font-weight:500;margin:8px 0 20px;letter-spacing:-.5px}.mock-columns{display:flex;gap:8px}.mock-columns>div{flex:1;background:#171b28;border-radius:4px;padding:8px}.mock-columns small{font-size:5px;color:#9d9bb7}.mock-columns b{display:block;height:14px;margin-top:6px;background:linear-gradient(90deg,#3b354f,#25283a);border:1px solid #ffffff06;border-radius:3px}.pulse{background:radial-gradient(ellipse at bottom,#3b7b7330,transparent),#101b1c}.pulse-ui{position:relative;width:75%;background:#101b1f;border:1px solid #91d5bf20;border-radius:9px;padding:18px;box-shadow:0 20px 40px #0004}.pulse-ui>div:first-child{display:flex;align-items:center;gap:7px;font-size:5px;letter-spacing:1px;color:#92b7a8}.pulse-ui>div:first-child svg{margin-left:auto}.pulse-ui>strong{font-size:40px;letter-spacing:-2px;font-weight:500;display:block;line-height:1.5}.pulse-ui>strong span{font-size:19px;color:#72b89f}.pulse-ui>small{display:block;font-size:5px;color:#8aada2;letter-spacing:1px}.bars{display:flex;align-items:end;gap:3px;height:40px;margin:15px 0}.bars i{flex:1;background:linear-gradient(#81c4af70,#81c4af10);border-radius:2px}.pulse-ui footer{border-top:1px solid #ffffff12;padding-top:8px;font-size:6px;color:#9dadb5;display:flex;justify-content:space-between}.pulse-ui footer span{color:#80c2ad}.atlas{background:radial-gradient(ellipse at 70% 50%,#86745030,transparent),#201d19}.atlas-ui{position:relative;width:65%;padding:20px;border-left:1px solid #e4d5a635}.atlas-ui svg{color:#c7b489}.atlas-ui strong{display:block;font-size:25px;font-weight:500;line-height:1.1;letter-spacing:-1px;margin:10px 0}.atlas-ui>span{font-size:5px;letter-spacing:2px;color:#a89a7b}.atlas-ui>div{display:flex;justify-content:space-between;font-size:8px;border-bottom:1px solid #ffffff0d;padding:10px 0;color:#c0b69f}.atlas-ui b{font-weight:400;color:#7e7768}.deploy{background:radial-gradient(ellipse at 30% 50%,#536c8e25,transparent),#111821}.terminal-ui{position:relative;width:85%;padding:16px;background:#0e141d;border:1px solid #98b1e222;border-radius:8px;box-shadow:0 15px 35px #0005;font-family:monospace;font-size:9px}.terminal-ui>div{font-size:7px;color:#7e90a8;border-bottom:1px solid #ffffff0d;padding-bottom:12px;margin-bottom:18px;display:flex;align-items:center;gap:8px}.terminal-ui i{width:5px;height:5px;border-radius:50%;background:#677d97}.terminal-ui p{color:#8d9ead;margin:6px 0}.terminal-ui em{color:#899cd5;font-style:normal}.terminal-ui .terminal-success{color:#7dcab1;margin-top:15px}.project-info{padding:25px}.project-topline{display:flex;justify-content:space-between}.project-topline .eyebrow{font-size:8px;letter-spacing:1px;color:var(--muted);margin-bottom:12px}.project-number{font-size:9px;font-family:monospace;color:var(--muted);opacity:.5}.project-title{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0;background:none;border:0;font-size:23px;letter-spacing:-.8px;text-align:left;min-height:44px}.project-title svg{color:var(--muted)}.project-info>p{font-size:11px;margin:7px 0 23px}.project-footer{display:flex;align-items:center;justify-content:space-between;gap:12px}.project-links{display:flex;gap:6px}.project-links a{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;gap:5px;color:var(--muted);font-size:8px}.project-links a:hover{color:var(--accent)}.resume-card{padding:48px 55px;display:grid;grid-template-columns:1.2fr 1fr;align-items:center;background:radial-gradient(ellipse at 85% 80%,#6e669924,transparent 65%),var(--surface)}.resume-card h2{font-size:43px;line-height:1.16;margin-bottom:20px}.resume-card p:not(.eyebrow){font-size:12px}.resume-actions{display:flex;gap:10px;margin-top:25px}.resume-meta{display:flex;gap:15px;align-items:center;font-size:8px;color:var(--muted);margin-top:22px}.update-badge{border:1px solid var(--border);border-radius:20px;padding:4px 8px}.paper-wrap{justify-self:center;perspective:1000px;display:block}.paper{position:relative;width:220px;min-height:290px;background:#eeedf1;padding:23px;color:#262334;border-radius:3px;box-shadow:12px 20px 45px #0005;transform:rotate(7deg) rotateY(-12deg);transition:transform .6s}.paper-wrap:hover .paper{transform:rotate(0) rotateY(0) translateY(-5px)}.paper-top{display:flex;align-items:center;justify-content:space-between;color:#6a5a9b;font-size:24px;font-weight:600;margin-bottom:18px}.paper h3{font-size:19px;margin-bottom:7px}.paper>p{font-size:4px!important;color:#726b82;letter-spacing:.8px;margin-bottom:15px}.paper-rule{height:1px;background:#d0cadb;margin-bottom:15px}.paper small{font-size:5px;letter-spacing:1px;color:#696176;display:block;margin-bottom:8px}.paper-lines{margin-bottom:16px}.paper-lines i{display:block;height:3px;background:#d4d1dc;width:100%;margin:5px 0}.paper-lines i:last-child{width:70%}.paper-chips{display:flex;gap:5px}.paper-chips i{height:9px;width:35px;background:#d9d5e3;border-radius:2px}.paper-footer{display:block;font-size:4px;margin-top:22px;color:#8b829b;letter-spacing:.5px}.page-peel{position:absolute;bottom:0;right:0;width:22px;height:22px;background:linear-gradient(135deg,#d1ccde 50%,#17141e 51%);border-radius:4px 0 0 0;transition:width .3s,height .3s}.paper-wrap:hover .page-peel{width:35px;height:35px}.paper-caption{font-family:monospace;letter-spacing:1px;font-size:6px;color:var(--muted);display:block;text-align:center;margin-top:25px}.journey-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:80px}.journey-intro{font-size:12px;margin-top:24px}.timeline{padding-left:25px;border-left:1px solid var(--border)}.timeline-item{position:relative;padding:0 0 35px 12px}.timeline-item:last-child{padding-bottom:0}.timeline-dot{position:absolute;left:-30px;top:5px;width:9px;height:9px;background:var(--surface-raised);border:1px solid var(--muted);border-radius:50%}.timeline-dot.current{background:var(--accent);border-color:var(--accent);box-shadow:0 0 16px #9189db40}.timeline-item .eyebrow{font-size:8px;margin-bottom:12px;color:var(--muted);display:block}.timeline-item h3{font-size:21px;margin-bottom:6px}.timeline-org{font-size:11px;color:var(--accent)}.timeline-item p{font-size:11px;margin:14px 0 0;max-width:420px}.badges-label{color:var(--muted);font-size:8px;margin-top:60px;margin-bottom:20px}.marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}.marquee-track{display:flex;gap:14px;width:max-content;animation:marquee 40s linear infinite}.marquee:hover .marquee-track{animation-play-state:paused}.badge{display:flex;gap:8px;align-items:center;white-space:nowrap;padding:12px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);font-size:10px;color:var(--muted)}.badge svg{color:var(--accent)}.reference-card{padding:38px 45px;display:flex;gap:30px;align-items:flex-start}.quote-symbol{font-family:Georgia,serif;font-size:95px;color:var(--accent);opacity:.5;line-height:1}.reference-card>div:not(.carousel-controls){max-width:700px}.reference-card .eyebrow{font-size:8px}.reference-card blockquote{margin:0 0 25px;font-size:22px;line-height:1.5;font-weight:400;letter-spacing:-.5px}.reference-card strong{font-size:11px;font-weight:500}.reference-card .small{margin:3px 0 10px}.carousel-controls{display:flex;gap:10px;align-items:center;margin-left:auto;align-self:flex-end;flex-shrink:0}.carousel-controls .icon-button{min-width:36px;min-height:44px}.contact-section{padding-top:130px}.contact-section .availability{background:none;border:0;padding:0;letter-spacing:1px;font-family:monospace;font-size:9px}.contact-section h2{font-size:clamp(55px,7vw,85px);line-height:1.04;position:relative;margin-bottom:27px}.contact-arrow{width:70px;height:70px;margin-left:45px;stroke-width:1;color:var(--muted);vertical-align:baseline}.contact-section>div>p{font-size:13px}.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:40px}.email-row{display:flex;gap:15px;align-items:center;border-bottom:1px solid var(--border);padding-bottom:20px}.email-row>a{font-size:22px;letter-spacing:-.6px;display:flex;gap:20px;align-items:center}.email-row .icon-button{margin-left:auto}.socials{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:25px 0}.socials a{display:flex;gap:10px;align-items:center;min-height:50px;font-size:11px}.socials a>svg:first-child{color:var(--muted)}.socials a>svg:last-child{margin-left:auto;color:var(--muted);opacity:.6}.socials a:hover{color:var(--accent)}.contact-form{display:flex;flex-direction:column;gap:15px}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}.contact-form label{font-size:10px;color:var(--muted);display:block}.contact-form input,.contact-form textarea{width:100%;display:block;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px;color:var(--text);font-size:11px;margin-top:7px;resize:vertical}.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--muted);opacity:.6}.contact-form .button{align-self:flex-start}.contact-form>.small{font-size:9px}.footer{margin-top:100px;padding-top:25px;padding-bottom:110px;display:flex;gap:20px;align-items:center;border-top:1px solid var(--border);color:var(--muted);font-size:9px}.footer>.brand{color:var(--text)}.footer>span:nth-child(3){display:flex;gap:8px;align-items:center;margin-left:auto}.footer .text-link{font-size:9px}.floating-cv{position:fixed;bottom:25px;left:50%;transform:translateX(-50%)!important;z-index:35;background:color-mix(in srgb,var(--surface) 85%,transparent);border:1px solid var(--border);padding:7px 7px 7px 17px;border-radius:15px;backdrop-filter:blur(20px);display:flex;align-items:center;gap:18px;box-shadow:0 10px 50px #0005}.floating-label{white-space:nowrap;font-size:10px;color:var(--muted)}.modal-overlay{position:fixed;inset:0;background:#050812b8;backdrop-filter:blur(8px);z-index:60;animation:fade .2s}.modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(650px,calc(100% - 32px));max-height:85dvh;overflow:auto;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:30px;z-index:65;box-shadow:0 30px 100px #0008}.modal-title{font-size:26px;padding-right:40px;margin-bottom:12px}.modal>.muted{font-size:12px;margin-bottom:25px}.modal-close{position:absolute;top:18px;right:18px}.modal .project-cover{border-radius:10px;height:230px;margin-bottom:25px}.case-block h3{text-transform:capitalize;font-size:16px;margin:20px 0 10px}.case-block p{font-size:12px}.modal-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:25px}.qr{background:#fff;width:max-content;padding:20px;border-radius:12px;margin:25px auto}.modal>.button{display:flex;width:max-content;margin:20px auto}.command-search{width:100%;padding:14px;background:var(--bg);border:1px solid var(--border);border-radius:9px;color:var(--text);margin-bottom:15px}.command-list{margin-bottom:20px}.command-list>button,.command-list>a{display:flex;align-items:center;gap:12px;min-height:48px;padding:12px;width:100%;background:none;border:0;border-radius:7px;text-align:left;font-size:12px}.command-list>button:hover,.command-list>a:hover{background:var(--surface-raised)}.command-list>button>span,.command-list>a>svg:last-child{margin-left:auto;color:var(--muted)}.mobile-menu{display:flex;flex-direction:column}.mobile-menu a{font-size:28px;display:flex;align-items:center;justify-content:space-between;padding:15px 0;border-bottom:1px solid var(--border)}.toast{position:fixed;bottom:105px;left:50%;transform:translateX(-50%);padding:12px 18px;border:1px solid var(--border);border-radius:10px;background:var(--surface-raised);z-index:90;display:none;gap:10px;align-items:center;font-size:12px;max-width:calc(100% - 30px);box-shadow:0 5px 30px #0005}.toast.visible{display:flex}.toast svg{color:var(--cyan)}.skip-link{position:fixed;left:10px;top:-70px;background:var(--surface-raised);padding:10px;z-index:100}.skip-link:focus{top:10px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@keyframes breathe{50%{opacity:.5}}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes float{50%{transform:translateY(-7px)}}@keyframes orbit{to{transform:rotate(350deg) scaleY(.92)}}@keyframes marquee{to{transform:translateX(-50%)}}@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes confetti{from{transform:translateY(20px);opacity:0}40%{opacity:1}to{transform:translateY(-15px);opacity:0}}
.hero-glow{right:0}.glass:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(240px circle at var(--pointer-x,-100px) var(--pointer-y,-100px),#a49bff09,transparent 75%);opacity:0;transition:opacity .3s}.glass:hover:after{opacity:1}.magnetic:hover{transform:translateY(-3px) scale(1.025)}
.hero{overflow:clip}
.skill-swipe-hint{display:none}
@media(max-width:767px){
 #skills .skills-grid{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:min(85%,320px);gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:4px 2px 16px;scroll-padding-inline:2px}
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
/* One display interaction for uploaded images and all illustrated previews. */
.cover-button .project-image-frame,.cover-button .mock-window,.cover-button .pulse-ui,.cover-button .atlas-ui,.cover-button .terminal-ui{--display-scale:1;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale));transition:transform .5s}
.cover-button:hover .project-image-frame,.cover-button:hover .mock-window,.cover-button:hover .pulse-ui,.cover-button:hover .atlas-ui,.cover-button:hover .terminal-ui{transform:perspective(900px) rotateY(0) rotateX(0) scale(var(--display-scale))}
@media(max-width:767px){
 .project-card .cover-button .mock-window,.project-card .cover-button .pulse-ui,.project-card .cover-button .terminal-ui{--display-scale:.58;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale))}
 .project-card .cover-button .atlas-ui{--display-scale:.64;transform:perspective(900px) rotateY(-8deg) rotateX(5deg) scale(var(--display-scale))}
 .project-card .cover-button:hover .mock-window,.project-card .cover-button:hover .pulse-ui,.project-card .cover-button:hover .atlas-ui,.project-card .cover-button:hover .terminal-ui{transform:perspective(900px) rotateY(0) rotateX(0) scale(var(--display-scale))}
}

```

## src/vite-env.d.ts

```
/// <reference types="vite/client" />

```

## tailwind.config.js

```
export default { content: ['./index.html','./src/**/*.{ts,tsx}'], theme: {extend: {}}, plugins: [] };

```

## tests/portfolio.spec.ts

```
import { test, expect } from '@playwright/test';
test('responsive layout, project filter, dialogs, theme, and downloads',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
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

## tsconfig.json

```
{"compilerOptions":{"target":"ES2020","useDefineForClassFields":true,"lib":["ES2020","DOM","DOM.Iterable"],"module":"ESNext","skipLibCheck":true,"moduleResolution":"Bundler","allowImportingTsExtensions":true,"resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx","strict":true},"include":["src","vite.config.ts"]}

```

## vite.config.ts

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], base: './' });

```
