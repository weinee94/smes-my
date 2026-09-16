import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");
const postPaths = () => readdirSync(join(root, "src/content/posts"))
  .filter(name => name.endsWith(".md"))
  .map(name => `src/content/posts/${name}`);

test("homepage makes the problem, operator and contact path clear", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /客户有询问，团队却接不住/);
  assert.match(home, /Wei Nee Tan/);
  assert.match(home, /BeforeTax 省税会计/);
  assert.match(home, /href="\/contact"/);
  assert.doesNotMatch(home, /Project Brief Generator|Company Secretary|EnquiryForm/);
});

test("retired public offers are gone", () => {
  for (const path of [
    "src/pages/request.astro",
    "src/pages/request/received.astro",
    "src/pages/tools/index.astro",
    "src/pages/tools/project-brief.astro",
    "src/pages/services.astro",
  ]) assert.equal(existsSync(join(root, path)), false, path);
  const header = read("src/components/Header.astro");
  assert.match(header, /人才观察/);
  assert.match(header, /关于 Wei Nee/);
  assert.doesNotMatch(header, /Provider 合作|找服务|自己解决/);
});

test("only discussed talent observations are publicly listed", () => {
  const published = postPaths().filter(path => !/^draft: true$/m.test(read(path)));
  assert.deepEqual(published, ["src/content/posts/why-more-approval-makes-work-slower.md"]);
  const blog = read("src/pages/blog.astro");
  assert.match(blog, /人才与管理观察/);
});

test("contact uses the dedicated Google form and avoids sensitive data", () => {
  const contact = read("src/pages/contact.astro");
  assert.match(contact, /docs.google.com\/forms\/d\/e\//);
  assert.match(contact, /现在谁负责回复与跟进/);
  assert.match(contact, /请勿填写客户或员工敏感资料/);
  assert.doesNotMatch(contact, /mailto:/);
});

test("public copy does not reveal current hotel work", () => {
  const bundle = [
    read("src/pages/index.astro"),
    read("src/pages/contact.astro"),
    read("src/content/pages/about.md"),
    read("src/pages/blog.astro"),
    read("src/content/posts/why-more-approval-makes-work-slower.md"),
  ].join("\n");
  assert.doesNotMatch(bundle, /hotel|酒店|D Elegance|F&B|breakfast|住宿|房间|餐饮/i);
});

test("content keeps observation time separate from publication time", () => {
  for (const path of postPaths()) {
    const post = read(path);
    assert.notEqual(/^eventDate:/m.test(post), /^eventPeriod:/m.test(post));
    assert.match(post, /^pubDatetime:/m);
  }
});

test("existing brand icon and palette remain", () => {
  assert.match(read("src/components/Header.astro"), /smes-site-icon\.png/);
  assert.match(read("src/styles/theme.css"), /#0b6b52/);
});
