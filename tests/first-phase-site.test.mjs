import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");
const postFiles = () => readdirSync(join(root, "src/content/posts"))
  .filter(name => name.endsWith(".md"))
  .map(name => `src/content/posts/${name}`);

test("homepage presents the site as a plain record of real work", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /我把一些实际做过的工作和项目记录留在这里/);
  assert.match(home, /最近的记录/);
  assert.doesNotMatch(home, /商业现场 · 系统 · 判断|Business Operator|能力证明|实验室/);
});

test("navigation has one records index, about, and contact", () => {
  const header = read("src/components/Header.astro");
  for (const label of ["记录", "关于", "联系"]) assert.match(header, new RegExp(`>${label}<`));
  assert.doesNotMatch(header, />案例<|>经营笔记<|>Wei Nee</);
  assert.match(read("src/pages/cases.astro"), /Astro\.redirect\(.*posts/);
});

test("about page stays factual and low-key", () => {
  const about = `${read("src/pages/weineetan.astro")}\n${read("src/content/pages/about.md")}`;
  assert.match(about, /Johor Bahru/);
  assert.match(about, /真正做过的东西留下来/);
  assert.doesNotMatch(about, /我的价值|职业标签|Head of Department|由 Wei Nee 主理/i);
});

test("posts keep event time separate from publication time", () => {
  for (const path of postFiles()) {
    const post = read(path);
    assert.notEqual(/^eventDate:/m.test(post), /^eventPeriod:/m.test(post), `${path} needs exactly one event time`);
    assert.match(post, /^pubDatetime:/m, `${path} needs publication time`);
  }
});

test("abstract drafts remain hidden and concrete records remain public", () => {
  for (const path of ["case-operational-visibility.md", "case-readiness-after-attention.md"])
    assert.match(read(`src/content/posts/${path}`), /^draft: true$/m);
  for (const path of ["case-project-critical-path.md", "case-smes-my-retiring-the-directory.md", "note-one-authoritative-record.md", "note-receivable-is-not-profit.md", "note-clear-states.md", "note-service-is-not-the-asset.md"])
    assert.doesNotMatch(read(`src/content/posts/${path}`), /^draft: true$/m);
});

test("public copy does not expose employers, colleagues, or editorial machinery", () => {
  const publicPosts = postFiles().map(read).filter(post => !/^draft: true$/m.test(post));
  const publicCopy = [read("src/pages/index.astro"), read("src/content/pages/about.md"), ...publicPosts].join("\n");
  assert.doesNotMatch(publicCopy, /D Elegance|Ms Low|Amelia|Izzati|\bAlan\b|能力证明|固定模板|策展框架/i);
});

test("voice guide preserves facts without manufacturing a persona", () => {
  const voice = read("docs/SMES_MY_VOICE.md");
  assert.match(voice, /马来西亚华语/);
  assert.match(voice, /保留真实动作/);
  assert.match(voice, /不总结人生道理/);
  assert.match(voice, /不要为了像 Wei Nee 而主动添加/);
});

test("the retired directory and removed IA stay absent", () => {
  assert.equal(existsSync(join(root, "src/pages/lab.astro")), false);
  const bundle = [read("src/pages/index.astro"), read("src/content/pages/about.md")].join("\n");
  assert.doesNotMatch(bundle, /provider listing|supplier directory|claim provider/i);
});

test("public contact uses Wei Nee's SMEs.MY mailbox", () => {
  const bundle = ["src/pages/weineetan.astro", "src/pages/contact.astro"].map(read).join("\n");
  assert.match(bundle, /weineetan@smes\.com\.my/);
});

test("record rendering shows dates and topics", () => {
  const rendering = `${read("src/components/Card.astro")}\n${read("src/components/Datetime.astro")}`;
  assert.match(rendering, /eventDate/);
  assert.match(rendering, /eventPeriod/);
  assert.match(rendering, /data\.tags/);
});
