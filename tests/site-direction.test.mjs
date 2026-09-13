import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");
const postPaths = () => readdirSync(join(root, "src/content/posts")).filter(name => name.endsWith(".md")).map(name => `src/content/posts/${name}`);

test("homepage is a service and tools entry point", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /可以帮忙的部分/);
  assert.match(home, /Project Brief Generator/);
  assert.match(home, /项目资料整理/);
  assert.doesNotMatch(home, /关于这个网站|最近的记录|小生意运营实验室|现场 · 系统 · 判断/);
});

test("navigation prioritizes services, tools, resources and contact", () => {
  const header = read("src/components/Header.astro");
  for (const label of ["可以帮什么", "工具", "资料", "关于", "联系"]) assert.match(header, new RegExp(label));
  assert.doesNotMatch(header, />记录<|>案例</);
});

test("a useful browser-only tool is included", () => {
  const tool = read("src/pages/tools/project-brief.astro");
  assert.match(tool, /Project Brief Generator/);
  assert.match(tool, /navigator\.clipboard/);
  assert.match(tool, /只在这个页面处理/);
});

test("public site does not reveal current hotel work", () => {
  const bundle = [
    read("src/pages/index.astro"),
    read("src/pages/services.astro"),
    read("src/content/pages/about.md"),
    ...postPaths().map(read),
  ].join("\n");
  assert.doesNotMatch(bundle, /hotel|酒店|creator|room sales|F&B|event sales|breakfast|D Elegance|住宿|房间|餐饮/i);
});

test("resource titles avoid short-drama framing", () => {
  const posts = postPaths().map(read).join("\n");
  assert.doesNotMatch(posts, /^title:.*(?:我先|我还是|其实有|如果每次|不一定是)/m);
  assert.doesNotMatch(posts, /这个案例证明什么/);
});

test("content keeps event time separate from publication time", () => {
  for (const path of postPaths()) {
    const post = read(path);
    assert.notEqual(/^eventDate:/m.test(post), /^eventPeriod:/m.test(post), `${path} needs exactly one event time`);
    assert.match(post, /^pubDatetime:/m, `${path} needs publication time`);
  }
});

test("retired and private routes are absent", () => {
  for (const file of [
    "case-hosted-stay-needs-operations.md",
    "case-operational-visibility.md",
    "case-readiness-after-attention.md",
    "note-confirmed-is-not-final-revenue.md",
    "note-task-is-waiting-for-whom.md",
    "note-three-active-priorities.md",
  ]) assert.equal(existsSync(join(root, "src/content/posts", file)), false);
  assert.match(read("src/pages/cases.astro"), /Astro\.redirect\(.*posts/);
});

test("visual system is modern, light and sans-serif", () => {
  const theme = read("src/styles/theme.css");
  const layout = read("src/layouts/Layout.astro");
  assert.match(theme, /ui-sans-serif/);
  assert.match(layout, /data-theme="light"/);
  assert.doesNotMatch(layout, /prefers-color-scheme/);
});

test("positioning preserves service, Planurhome and privacy boundaries", () => {
  const positioning = read("SMES_MY_POSITIONING.md");
  assert.match(positioning, /服务/);
  assert.match(positioning, /Planurhome/);
  assert.match(positioning, /不透露 Wei Nee 在酒店任职/);
  assert.match(positioning, /不是个人博客/);
});
