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
