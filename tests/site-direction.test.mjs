import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");
const postPaths = () =>
  readdirSync(join(root, "src/content/posts"))
    .filter(name => name.endsWith(".md"))
    .map(name => `src/content/posts/${name}`);

test("homepage is a focused service enquiry entry point", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /Accounting 与 Company Secretary 服务需求/);
  assert.match(home, /Accounting／Bookkeeping/);
  assert.match(home, /Company Secretary/);
  assert.match(home, /提交不保证一定获得报价/);
  assert.doesNotMatch(home, /Operations Review|Project Brief Generator|项目资料整理/);
});

test("navigation prioritizes demand capture and the blog", () => {
  const header = read("src/components/Header.astro");
  for (const label of ["找服务", "博客", "关于", "Provider 合作"])
    assert.match(header, new RegExp(label));
  assert.doesNotMatch(header, /label: "服务"|label: "工具"|label: "资料"/);
});

test("enquiry form is bounded, consented and connected", () => {
  const form = read("src/components/EnquiryForm.astro");
  assert.match(form, /quote_request/);
  assert.match(form, /Accounting services/);
  assert.match(form, /Company secretary/);
  assert.match(form, /type="checkbox"[\s\S]*?required/);
  assert.match(form, /隐私说明/);
  assert.match(form, /script\.google\.com/);
  assert.doesNotMatch(form, /Digital marketing|Renovation contractors|Payroll/);
});

test("retired service and generator routes redirect", () => {
  for (const path of [
    "src/pages/services.astro",
    "src/pages/tools/index.astro",
    "src/pages/tools/project-brief.astro",
    "src/pages/contact.astro",
  ])
    assert.match(read(path), /Astro\.redirect\("\/request", 301\)/);
});

test("blog has a clear SME observation remit", () => {
  const blog = read("src/pages/blog.astro");
  assert.match(blog, /对中小型企业的实际观察/);
  assert.match(blog, /不会写成针对某家公司或某个人的抱怨/);
  assert.equal(
    existsSync(
      join(root, "src/content/posts/why-more-approval-makes-work-slower.md")
    ),
    true
  );
});

test("public site does not reveal current hotel work", () => {
  const bundle = [
    read("src/pages/index.astro"),
    read("src/pages/request.astro"),
    read("src/content/pages/about.md"),
    ...postPaths().map(read),
  ].join("\n");
  assert.doesNotMatch(
    bundle,
    /hotel|酒店|creator|room sales|F&B|event sales|breakfast|D Elegance|住宿|房间|餐饮/i
  );
});

test("article titles avoid short-drama framing", () => {
  const posts = postPaths().map(read).join("\n");
  assert.doesNotMatch(
    posts,
    /^title:.*(?:我先|我还是|其实有|如果每次|不一定是)/m
  );
  assert.doesNotMatch(posts, /这个案例证明什么/);
});

test("content keeps observation time separate from publication time", () => {
  for (const path of postPaths()) {
    const post = read(path);
    assert.notEqual(
      /^eventDate:/m.test(post),
      /^eventPeriod:/m.test(post),
      `${path} needs exactly one event time`
    );
    assert.match(post, /^pubDatetime:/m, `${path} needs publication time`);
  }
});

test("original icon and brand palette are restored", () => {
  const header = read("src/components/Header.astro");
  const theme = read("src/styles/theme.css");
  assert.match(header, /smes-site-icon\.png/);
  assert.match(theme, /#0b6b52/);
  assert.match(theme, /ui-sans-serif/);
});

test("positioning is a narrow matching test with honest boundaries", () => {
  const positioning = read("SMES_MY_POSITIONING.md");
  assert.match(positioning, /small matching-desk test/);
  assert.match(positioning, /does not guarantee a match/);
  assert.match(positioning, /Planurhome/);
  assert.match(positioning, /hotel employment/);
  assert.doesNotMatch(positioning, /Operations Review/);
});
