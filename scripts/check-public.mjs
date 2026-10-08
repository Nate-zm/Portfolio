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
