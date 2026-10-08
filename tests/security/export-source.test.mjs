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
