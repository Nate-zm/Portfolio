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
