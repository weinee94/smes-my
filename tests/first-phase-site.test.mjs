import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");
const postFiles = () =>
  readdirSync(join(root, "src/content/posts"))
    .filter(name => name.endsWith(".md"))
    .map(name => `src/content/posts/${name}`);

test("SMEs.MY is the platform-first homepage", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /SMEs\.MY/);
  assert.match(home, /由 Wei Nee 主理/);
  assert.match(home, /把散乱的生意资料[、，]流程和行动/);
  assert.match(home, /经营笔记/);
  assert.match(home, /实战案例/);
  assert.match(home, /实验室/);
  assert.doesNotMatch(home, /我是 Wei Nee/);
});

test("Wei Nee has one stable professional route", () => {
  assert.equal(existsSync(join(root, "src/pages/weineetan.astro")), true);
  const page = `${read("src/pages/weineetan.astro")}\n${read("src/content/pages/about.md")}`;
  assert.match(page, /Commercial × Business Operations/);
  assert.match(page, /Business Operator \/ System Builder/);
  assert.match(page, /How I Work/);
});

test("first-phase information architecture exists", () => {
  for (const path of [
    "src/pages/index.astro",
    "src/pages/posts/[...page].astro",
    "src/pages/cases.astro",
    "src/pages/lab.astro",
    "src/pages/weineetan.astro",
    "src/pages/now.astro",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
  }
});

test("retired directory and sensitive employment language stay absent", () => {
  const files = [
    "src/pages/index.astro",
    "src/pages/weineetan.astro",
    "src/content/pages/about.md",
    "src/content/pages/now.md",
  ];
  const bundle = files.filter(path => existsSync(join(root, path))).map(read).join("\n");
  assert.doesNotMatch(bundle, /provider listing|supplier directory|claim provider|D Elegance|HOD|Head of Department/i);
});

test("public posts separate event dates from publication timestamps", () => {
  const launchSeeds = new Set([
    "src/content/posts/case-operational-visibility.md",
    "src/content/posts/case-readiness-after-attention.md",
    "src/content/posts/note-clear-states.md",
    "src/content/posts/note-marketing-exposes-operations.md",
    "src/content/posts/note-ownership-before-tracker.md",
  ]);
  for (const path of postFiles()) {
    const post = read(path);
    const hasEventDate = /^eventDate:/m.test(post);
    const hasEventPeriod = /^eventPeriod:/m.test(post);
    assert.notEqual(hasEventDate, hasEventPeriod, `${path} must have exactly one event date or period`);
    if (launchSeeds.has(path)) {
      assert.doesNotMatch(post, /^eventDate: 2026-08-(09|10|11|12|13)/m, `${path} must not reuse launch placeholder dates`);
    }
  }

  const rendering = `${read("src/components/Card.astro")}\n${read("src/components/Datetime.astro")}\n${read("src/pages/posts/[...slug]/index.astro")}`;
  assert.match(rendering, /发生于/);
  assert.match(rendering, /eventDate/);
  assert.match(rendering, /eventPeriod/);
});

test("public contact uses Wei Nee's SMEs.MY mailbox", () => {
  const bundle = [
    "src/pages/weineetan.astro",
    "src/content/pages/now.md",
    "src/pages/index.astro",
  ].map(read).join("\n");
  assert.match(bundle, /weineetan@smes\.com\.my/);
  assert.doesNotMatch(bundle, /hello@smes\.com\.my/);
});

test("public evidence spans work, project operations, and SMEs.MY decisions", () => {
  for (const path of [
    "src/content/posts/case-project-critical-path.md",
    "src/content/posts/note-receivable-is-not-profit.md",
    "src/content/posts/case-smes-my-retiring-the-directory.md",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
  }

  const posts = postFiles().map(read).join("\n");
  assert.match(posts, /项目运营/);
  assert.match(posts, /SMEs\.MY/);
  assert.doesNotMatch(posts, /A-34-07|D Elegance|Ms Low|Amelia|\bAlan\b|Urban Reno|ES Nice/i);
});

test("the first public set favors distinct experience lanes over duplicate angles", () => {
  for (const path of [
    "src/content/posts/note-one-authoritative-record.md",
    "src/content/posts/note-service-is-not-the-asset.md",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
  }

  for (const path of [
    "src/content/posts/note-marketing-exposes-operations.md",
    "src/content/posts/note-ownership-before-tracker.md",
  ]) {
    assert.equal(existsSync(join(root, path)), false, `${path} should be consolidated`);
  }
});
