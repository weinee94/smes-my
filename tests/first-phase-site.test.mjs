import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");

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
