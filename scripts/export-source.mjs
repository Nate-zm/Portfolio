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
