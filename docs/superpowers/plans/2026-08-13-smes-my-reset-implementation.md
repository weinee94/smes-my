# SMEs.MY Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the old directory product from the active repository and replace it with a small static holding page for the new Malaysian SME operating-lab direction.

**Architecture:** The reset site is a dependency-free static page: semantic HTML in `index.html`, visual rules in `css/styles.css`, and a single Node built-in test file that guards the product boundary. All provider data, directory routes, lead forms, form backends, and directory SEO surfaces are deleted; core brand images and the internal product-ideas document are preserved.

**Tech Stack:** HTML5, CSS, Node.js built-in test runner, Vercel static hosting configuration

---

## File Map

- `index.html`: the only public page in the reset version.
- `css/styles.css`: all responsive layout, typography, color, and focus styles.
- `tests/reset-site.test.mjs`: filesystem and content guardrails for the reset boundary.
- `README.md`: repository purpose and local preview instructions.
- `PROJECT_STATUS.md`: current strategic and technical handoff.
- `vercel.json`: retained static clean-URL configuration.
- `assets/smes-main-logo.png`, `assets/smes-secondary-logo.png`, `assets/smes-site-icon.png`: preserved brand candidates.
- `docs/tool-app-ideas.md`: preserved internal product research.
- `docs/superpowers/`: approved design and implementation records.

### Task 1: Lock the reset boundary with a failing test

**Files:**
- Create: `tests/reset-site.test.mjs`

- [ ] **Step 1: Replace the old directory test with the reset boundary test**

Delete `tests/provider-content.test.mjs` and create `tests/reset-site.test.mjs` with:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = path => readFileSync(join(root, path), "utf8");

const removedPaths = [
  "providers",
  "accounting-services-malaysia",
  "company-secretary-services-malaysia",
  "digital-marketing-agency-malaysia",
  "electrical-wiring-contractors-malaysia",
  "johor-bahru-suppliers-services",
  "packaging-suppliers-malaysia",
  "payroll-services-malaysia",
  "website-design-services-malaysia",
  "how-matching-works",
  "privacy-notice",
  "terms-of-use",
  "disclaimer",
  "zh",
  "js/app.js",
  "docs/google-apps-script.js",
  "llms.txt",
  "sitemap.xml",
  "robots.txt",
  "5de411d1-21fb-490e-8c74-bcc229039a59.txt",
  "assets/packaging-suppliers-malaysia.jpg",
  "assets/sme-supplier-comparison.jpg",
  "assets/smes-social-preview.png",
];

test("old directory surfaces are absent", () => {
  for (const path of removedPaths) {
    assert.equal(existsSync(join(root, path)), false, `${path} should be removed`);
  }
});

test("reset homepage states the new operating-lab direction", () => {
  const html = read("index.html");
  assert.match(html, /把散乱的生意资料，整理成可以使用的系统/);
  assert.match(html, /客户询问/);
  assert.match(html, /销售资料/);
  assert.match(html, /跟进动作/);
  assert.match(html, /正在重新整理/);
});

test("reset homepage does not expose the retired directory product", () => {
  const bundle = `${read("index.html")}\n${read("css/styles.css")}`;
  for (const phrase of [
    "Find proper suppliers",
    "Provider records",
    "Claim or list your business profile",
    "Request matching",
    "Quote Requests",
    "Provider Listings",
  ]) {
    assert.doesNotMatch(bundle, new RegExp(phrase, "i"));
  }
  assert.doesNotMatch(bundle, /<form\b/i);
  assert.doesNotMatch(bundle, /provider-card|provider-grid|quote-form/i);
});

test("only approved legacy assets remain", () => {
  for (const path of [
    "assets/smes-main-logo.png",
    "assets/smes-secondary-logo.png",
    "assets/smes-site-icon.png",
    "docs/tool-app-ideas.md",
    "vercel.json",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should be preserved`);
  }
});
```

- [ ] **Step 2: Run the test and confirm it fails against the old site**

Run:

```powershell
node --test tests/reset-site.test.mjs
```

Expected: FAIL because old routes still exist and the old homepage lacks the new positioning.

- [ ] **Step 3: Commit the boundary test**

```powershell
git add tests/provider-content.test.mjs tests/reset-site.test.mjs
git commit -m "test: define SMEs.MY reset boundary"
```

### Task 2: Remove the old directory product

**Files:**
- Delete: `providers/`
- Delete: `accounting-services-malaysia/`
- Delete: `company-secretary-services-malaysia/`
- Delete: `digital-marketing-agency-malaysia/`
- Delete: `electrical-wiring-contractors-malaysia/`
- Delete: `johor-bahru-suppliers-services/`
- Delete: `packaging-suppliers-malaysia/`
- Delete: `payroll-services-malaysia/`
- Delete: `website-design-services-malaysia/`
- Delete: `how-matching-works/`
- Delete: `privacy-notice/`
- Delete: `terms-of-use/`
- Delete: `disclaimer/`
- Delete: `zh/`
- Delete: `js/app.js`
- Delete: `docs/google-apps-script.js`
- Delete: `llms.txt`
- Delete: `sitemap.xml`
- Delete: `robots.txt`
- Delete: `5de411d1-21fb-490e-8c74-bcc229039a59.txt`
- Delete: `assets/packaging-suppliers-malaysia.jpg`
- Delete: `assets/sme-supplier-comparison.jpg`
- Delete: `assets/smes-social-preview.png`

- [ ] **Step 1: Verify every destructive target is inside the repository**

Run:

```powershell
$repo = (Resolve-Path '.').Path
$targets = @(
  'providers','accounting-services-malaysia','company-secretary-services-malaysia',
  'digital-marketing-agency-malaysia','electrical-wiring-contractors-malaysia',
  'johor-bahru-suppliers-services','packaging-suppliers-malaysia',
  'payroll-services-malaysia','website-design-services-malaysia','how-matching-works',
  'privacy-notice','terms-of-use','disclaimer','zh','js/app.js',
  'docs/google-apps-script.js','llms.txt','sitemap.xml','robots.txt',
  '5de411d1-21fb-490e-8c74-bcc229039a59.txt',
  'assets/packaging-suppliers-malaysia.jpg','assets/sme-supplier-comparison.jpg',
  'assets/smes-social-preview.png'
)
$targets | ForEach-Object {
  $candidate = [IO.Path]::GetFullPath((Join-Path $repo $_))
  if (-not $candidate.StartsWith($repo + [IO.Path]::DirectorySeparatorChar)) {
    throw "Target escaped repository: $candidate"
  }
  [PSCustomObject]@{ Target = $_; Resolved = $candidate; Exists = Test-Path -LiteralPath $candidate }
}
```

Expected: every resolved path starts with the repository path; all targets report `Exists=True` before removal.

- [ ] **Step 2: Delete only the verified legacy targets**

Use the exact target list above with native PowerShell `Remove-Item -LiteralPath`; use `-Recurse` only when `Test-Path -PathType Container` is true. Do not delete `.git`, `docs/tool-app-ideas.md`, `vercel.json`, `.gitignore`, or the three preserved brand files.

- [ ] **Step 3: Verify the deletion boundary test now fails only on the replacement homepage**

Run:

```powershell
node --test tests/reset-site.test.mjs
```

Expected: the old-surface and preserved-asset tests PASS; homepage positioning tests still FAIL.

- [ ] **Step 4: Commit the legacy removal**

```powershell
git add -A
git commit -m "remove: retire SMEs.MY directory product"
```

### Task 3: Build the static reset homepage

**Files:**
- Replace: `index.html`
- Replace: `css/styles.css`

- [ ] **Step 1: Replace `index.html` with the approved holding-page structure**

The page must include:

```html
<!doctype html>
<html lang="zh-Hans">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SMEs.MY — 把散乱的生意资料，整理成可以使用的系统</title>
    <meta name="description" content="SMEs.MY 正在重新整理：帮助马来西亚小生意把客户询问、销售资料与跟进动作变成清楚、可重复使用的经营系统。">
    <meta name="robots" content="index,follow">
    <meta property="og:type" content="website">
    <meta property="og:title" content="SMEs.MY — 小生意经营系统">
    <meta property="og:description" content="把散乱的客户询问、销售资料与跟进动作，整理成可以使用的系统。">
    <link rel="icon" href="/assets/smes-site-icon.png">
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/" aria-label="SMEs.MY 首页">
        <img src="/assets/smes-main-logo.png" alt="" width="48" height="48">
        <span>SMEs.MY</span>
      </a>
      <span class="status">正在重新整理</span>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <p class="eyebrow">Malaysia SME Operating Lab</p>
        <h1 id="hero-title">把散乱的生意资料，<br>整理成可以使用的系统。</h1>
        <p class="intro">很多小生意不是没有经验，而是经验散在 WhatsApp、价目表、旧文件和老板的脑里。SMEs.MY 正在重新建立，帮助这些资料变成更清楚、可重复使用的经营资产。</p>
      </section>

      <section class="focus" aria-labelledby="focus-title">
        <div class="section-heading">
          <p class="eyebrow">目前聚焦</p>
          <h2 id="focus-title">先把最常漏掉的三件事整理好</h2>
        </div>
        <div class="focus-grid">
          <article>
            <span>01</span>
            <h3>客户询问</h3>
            <p>客户到底在问什么、还缺什么资料、下一句该怎么回复。</p>
          </article>
          <article>
            <span>02</span>
            <h3>销售资料</h3>
            <p>把服务、价格、流程、FAQ 与可信证明整理成随时能用的说明。</p>
          </article>
          <article>
            <span>03</span>
            <h3>跟进动作</h3>
            <p>让报价、待确认事项和后续联系不再只靠记忆。</p>
          </article>
        </div>
      </section>

      <section class="rebuild" aria-labelledby="rebuild-title">
        <p class="eyebrow">What is changing</p>
        <h2 id="rebuild-title">从“收集更多资料”，转向“让资料真正能被使用”。</h2>
        <p>第一阶段会围绕 Business Sales Kit 展开：把一家生意已经知道的东西，整理成客户看得懂、团队拿得起、下一次不用重做的资产。</p>
      </section>
    </main>

    <footer>
      <p>SMEs.MY · 为马来西亚小生意整理更清楚的经营方式</p>
      <p>New direction in progress · 2026</p>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Replace `css/styles.css` with a small editorial design system**

Implement these exact design rules:

- Neutral paper background `#f4f0e8`, ink `#17201b`, muted `#667069`, green accent `#355f4a`, hairline `#cfd2ca`.
- System Chinese font stack beginning with `"Noto Sans SC", "Microsoft YaHei"`.
- Maximum content width `1180px`.
- Sticky header with translucent paper background and a 1px bottom border.
- Hero uses generous vertical spacing and `clamp(2.75rem, 7vw, 6.5rem)` heading size.
- Three focus articles form equal columns on screens wider than 760px and stack below 760px.
- No gradients, shadows, pills, rounded card containers, decorative blobs, or animation.
- Every link and focusable element must have a visible `:focus-visible` outline.
- At 520px and below, reduce side padding to 20px and keep the header status legible without overlap.

- [ ] **Step 3: Run the reset boundary test**

Run:

```powershell
node --test tests/reset-site.test.mjs
```

Expected: all four tests PASS.

- [ ] **Step 4: Commit the replacement page**

```powershell
git add index.html css/styles.css tests/reset-site.test.mjs
git commit -m "feat: add SMEs.MY reset homepage"
```

### Task 4: Rewrite continuity documentation

**Files:**
- Replace: `README.md`
- Replace: `PROJECT_STATUS.md`

- [ ] **Step 1: Rewrite `README.md`**

Use:

```markdown
# SMEs.MY

SMEs.MY is being rebuilt as a practical operating lab for Malaysian small businesses.

The current public reset page introduces the new direction: turning scattered customer enquiries, sales information, prices, FAQs, proof, and follow-up work into clearer reusable systems.

## Current scope

- Static reset homepage
- Chinese-first positioning with necessary English business terms
- No provider directory, matching, listing claim, lead form, AI demo, or account system
- No personal Wei Nee website content

## Local preview

From the repository root:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Verification

```powershell
node --test tests/reset-site.test.mjs
```

## Deployment

The repository remains configured as a static Vercel site. Deployment is not part of the reset unless Wei Nee confirms it separately.
```

- [ ] **Step 2: Rewrite `PROJECT_STATUS.md`**

The file must record:

- Reset approved on `2026-08-13`.
- Old directory/listing product removed from active files; recovery is Git history only.
- New direction: practical operating lab for Malaysian small businesses.
- First product lane: Business Sales Kit.
- Reset homepage is local-only until deployment approval.
- External Google Sheets, Vercel, DNS, mail, Search Console, Facebook, and other accounts were not changed.
- Next decision: validate the Business Sales Kit problem and first buyer before building a full product.
- Personal website is separate and will use a separate domain/project.

- [ ] **Step 3: Check documentation for retired language**

Run:

```powershell
rg -n -i "provider directory|supplier directory|claim.*profile|quote request|listing platform" README.md PROJECT_STATUS.md
```

Expected: no active-product claim remains; historical mentions are allowed only when explicitly saying the directory was removed.

- [ ] **Step 4: Commit the continuity rewrite**

```powershell
git add README.md PROJECT_STATUS.md
git commit -m "docs: record SMEs.MY product reset"
```

### Task 5: Verify content, layout, and repository boundary

**Files:**
- Verify: all active repository files

- [ ] **Step 1: Run automated checks**

Run:

```powershell
node --test tests/reset-site.test.mjs
git diff --check HEAD~3..HEAD
```

Expected: all tests PASS and `git diff --check` prints no errors.

- [ ] **Step 2: Search the active repository for legacy provider data**

Run:

```powershell
rg -n -i --glob '!docs/superpowers/**' --glob '!docs/tool-app-ideas.md' "PLL Packaging|CSY Electric|C&G Corporate|Urban Reno Empire|Provider Listings|Quote Requests|Claim or list your business profile|provider-card|provider-grid"
```

Expected: no matches.

- [ ] **Step 3: Inspect the reset page at desktop and mobile sizes**

Start the static server:

```powershell
python -m http.server 4173
```

Inspect `http://127.0.0.1:4173/` at approximately 1440px and 390px widths. Confirm:

- The first viewport communicates the new purpose.
- Header content does not overlap.
- Chinese text wraps naturally.
- Focus columns stack cleanly on mobile.
- No horizontal scrolling, clipped text, missing images, or broken links appear.

- [ ] **Step 4: Review the final deletion list and working tree**

Run:

```powershell
git status --short --branch
git log --oneline -5
git show --stat --oneline HEAD~3..HEAD
```

Expected: clean working tree, local branch ahead of origin only by the approved local reset commits, and no push or deployment performed.

- [ ] **Step 5: Report completion and recovery boundary**

Report that old active files were deleted, Git history is the only recovery path, the new page is local-only, and external systems were untouched.
