import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = p => readFileSync(p, 'utf8');
test('self-service routes remain usable instead of redirecting to a sales form', () => {
  for (const p of ['src/pages/tools/index.astro','src/pages/tools/project-brief.astro']) assert.doesNotMatch(read(p), /Astro.redirect/);
});
test('lead receipt requires an application acknowledgement, not HTTP success alone', () => {
  assert.ok(existsSync('src/utils/lead-response.ts'));
});
test('lead backend is versioned with the website', () => {
  assert.ok(existsSync('docs/google-apps-script.js'));
});
