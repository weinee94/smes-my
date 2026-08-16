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

test("SMEs.MY homepage leads with representative work instead of a personal-brand pitch", () => {
  const home = read("src/pages/index.astro");
  assert.match(home, /商业现场很少按部门分开/);
  assert.match(home, /case-hosted-stay-needs-operations/);
  assert.match(home, /note-task-is-waiting-for-whom/);
  assert.match(home, /note-confirmed-is-not-final-revenue/);
  assert.match(home, /现场/);
  assert.match(home, /系统/);
  assert.match(home, /判断/);
  assert.doesNotMatch(home, /由 Wei Nee 主理|Business Operator|Commercial × Business Operations|实验室/);
});

test("About keeps one stable route without a personal-brand hero", () => {
  assert.equal(existsSync(join(root, "src/pages/weineetan.astro")), true);
  const page = `${read("src/pages/weineetan.astro")}\n${read("src/content/pages/about.md")}`;
  assert.match(page, /关于/);
  assert.match(page, /部门交界/);
  assert.match(page, /directory/);
  assert.match(page, /Hotel 是目前最具体的现场，但不是这里要建立的职业标签/);
  assert.doesNotMatch(page, /How I Work|visionary|guru|Head of Department/i);
});

test("primary information architecture is records, Wei Nee, and contact", () => {
  for (const path of [
    "src/pages/index.astro",
    "src/pages/posts/[...page].astro",
    "src/pages/weineetan.astro",
    "src/pages/contact.astro",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
  }
  assert.equal(existsSync(join(root, "src/pages/lab.astro")), false);

  const header = read("src/components/Header.astro");
  for (const label of ["首页", "记录", "Wei Nee", "联系"]) {
    assert.match(header, new RegExp(`>${label}<`));
  }
  assert.doesNotMatch(header, />案例<|>经营笔记</);
  const menuButton = header.match(/<button[\s\S]*?id="menu-btn"[\s\S]*?<\/button>/)?.[0] ?? "";
  assert.doesNotMatch(menuButton, /<li>/);
  assert.doesNotMatch(header, /实验室|由 Wei Nee 主理/);
});

test("every record has one editorial lane", () => {
  for (const path of postFiles()) {
    const post = read(path);
    assert.match(post, /^lane: "(现场|系统|判断)"$/m, `${path} needs one editorial lane`);
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
    "src/pages/contact.astro",
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

test("hotel work appears as anonymised commercial operations evidence", () => {
  for (const path of [
    "src/content/posts/case-hosted-stay-needs-operations.md",
    "src/content/posts/note-confirmed-is-not-final-revenue.md",
    "src/content/posts/note-task-is-waiting-for-whom.md",
    "src/content/posts/note-three-active-priorities.md",
  ]) {
    const post = read(path);
    assert.doesNotMatch(post, /^draft: true$/m);
  }

  const publicPosts = postFiles()
    .map(read)
    .filter(post => !/^draft: true$/m.test(post))
    .join("\n");
  assert.match(publicPosts, /creator/i);
  assert.match(publicPosts, /Confirmed Date/);
  assert.match(publicPosts, /Waiting For/);
  assert.match(publicPosts, /经营现场/);
  assert.match(publicPosts, /系统笔记/);
  assert.match(publicPosts, /案例拆解/);
  assert.match(publicPosts, /实验室/);
  assert.doesNotMatch(
    publicPosts,
    /D Elegance|Politeknik|Ryo Wedding|Kim Hao|Teacher Nor|Elain ROM|AOEMM|KLK Refineries|Ms YZ|Amelia|Izzati|\bAlan\b/i
  );
});

test("public writing avoids AI-drama turns of phrase", () => {
  const publicPosts = postFiles()
    .map(read)
    .filter(post => !/^draft: true$/m.test(post))
    .join("\n");
  assert.doesNotMatch(
    publicPosts,
    /我以为.+后来才|真正的问题[，,]?从来都?不是|那一刻我(才)?意识到|这件事让我重新思考|很多人以为.+其实/
  );
});

test("internal editorial rules do not leak into reader-facing copy", () => {
  const publicCopy = [
    "src/pages/index.astro",
    "src/pages/posts/[...page].astro",
    "src/pages/cases.astro",
    "src/pages/weineetan.astro",
    "src/content/pages/about.md",
    ...postFiles(),
  ]
    .map(read)
    .join("\n");

  assert.doesNotMatch(
    publicCopy,
    /公司名、客户名、金额和内部资料|名字、金额和内部资料|事情还没有结果时，就只写到|不是每件做过的事都放进来|这篇也不写成|这套筛选/
  );
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

test("the site follows Wei Nee's approved voice guide", () => {
  const voice = read("docs/SMES_MY_VOICE.md");
  assert.match(voice, /马来西亚华语/);
  assert.match(voice, /只写真实发生过的事/);
  assert.match(voice, /不总结人生道理/);

  const publicCopy = [
    "site.config.ts",
    "src/pages/index.astro",
    "src/pages/cases.astro",
    "src/pages/contact.astro",
    "src/pages/weineetan.astro",
    "src/components/Footer.astro",
    "src/content/pages/about.md",
  ].map(read).join("\n");

  assert.doesNotMatch(
    publicCopy,
    /visibility|ownership|business outcome|professional proof|可执行的结构|判断过程|不是完整履历/i
  );
});

test("the four abstract drafts stay hidden while concrete pieces remain public", () => {
  for (const path of [
    "src/content/posts/case-operational-visibility.md",
    "src/content/posts/case-readiness-after-attention.md",
    "src/content/posts/note-clear-states.md",
    "src/content/posts/note-service-is-not-the-asset.md",
  ]) {
    assert.match(read(path), /^draft: true$/m, `${path} should stay hidden`);
  }

  const retained = [
    "src/content/posts/note-receivable-is-not-profit.md",
    "src/content/posts/note-one-authoritative-record.md",
    "src/content/posts/case-project-critical-path.md",
    "src/content/posts/case-smes-my-retiring-the-directory.md",
  ].map(read).join("\n");

  assert.match(retained, /整理尾款的时候/);
  assert.match(retained, /几个工互相等/);
  assert.match(retained, /directory 已经做出来/);
  assert.match(retained, /一时也不知道该看哪一份/);
  assert.doesNotMatch(retained, /这个案例证明什么|结果与学习|可迁移的能力|我的价值不在于/);
});
