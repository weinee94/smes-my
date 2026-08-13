# Evidence-Led Content System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder event dates, broaden SMEs.MY beyond one employment context, establish a source-backed candidate inventory, and publish the strongest sanitised first additions.

**Architecture:** Keep private evidence in its existing authoritative sources and store only a compact publication inventory in the SMEs.MY Dashboard. Extend the Astro content schema with event-date metadata while retaining publication timestamps for feeds and structured data. Public posts remain Markdown entries filtered into Notes and Cases.

**Tech Stack:** Astro 7, TypeScript, Markdown content collections, Node test runner, Vercel through GitHub `main`.

---

### Task 1: Establish the private candidate inventory

**Files:**
- Modify: `C:/Users/Wynne/Documents/Obsidian Vault/03 Projects/SMEs.MY/SMEs.MY Dashboard.md`

- [ ] Read the Career Evidence Register, PlanurHome dashboards, renovation/project records, SMEs.MY authority files, and git history.
- [ ] Record 8–12 candidates with source pointer, supported date/period, evidence state, privacy state, and decision.
- [ ] Keep private facts in their source records; do not reproduce sensitive evidence in the Dashboard.

### Task 2: Add event-date behavior using TDD

**Files:**
- Modify: `tests/first-phase-site.test.mjs`
- Modify: `src/content.config.ts`
- Modify: `src/components/Card.astro`
- Modify: `src/pages/posts/[...slug]/index.astro`
- Modify: `src/components/Datetime.astro`

- [ ] Write tests requiring every public post to have exactly one supported `eventDate` or `eventPeriod`, cards/article pages to label it `发生于`, and publication dates not to be presented as event dates.
- [ ] Run `corepack pnpm test` and verify the new assertions fail because the fields and rendering do not exist.
- [ ] Add optional `eventDate` and `eventPeriod` fields with a schema refinement requiring exactly one.
- [ ] Render the event date or period as the primary visible date while preserving `pubDatetime` for RSS and structured data.
- [ ] Run `corepack pnpm test` and verify all tests pass.

### Task 3: Correct existing content and contact details using TDD

**Files:**
- Modify: `tests/first-phase-site.test.mjs`
- Modify: `src/content/posts/*.md`
- Modify: `src/pages/weineetan.astro`
- Modify: `src/content/pages/now.md`

- [ ] Write tests requiring `weineetan@smes.com.my`, rejecting `hello@smes.com.my`, and rejecting the five August 9–13 placeholder event dates.
- [ ] Run tests and verify failure on the old email and missing event metadata.
- [ ] Assign only source-supported event dates or periods; merge or reframe overlapping content when necessary.
- [ ] Replace all public contact references with `weineetan@smes.com.my`.
- [ ] Run tests and verify all assertions pass.

### Task 4: Add cross-experience public evidence using TDD

**Files:**
- Modify: `tests/first-phase-site.test.mjs`
- Create: `src/content/posts/case-planurhome-project-clarity.md`
- Create: `src/content/posts/note-owner-receivable-is-not-profit.md`
- Create: `src/content/posts/case-smes-my-retiring-the-directory.md`
- Modify: `src/pages/index.astro`

- [ ] Write tests requiring public content from current work, PlanurHome/project operations, and SMEs.MY's own decision history without exposing client identifiers or retired-directory functionality.
- [ ] Run tests and verify failure because the cross-experience posts are absent.
- [ ] Add the smallest set of distinct, sanitised posts supported by current records.
- [ ] Update homepage selections so the first screen of evidence does not imply a hotel-only identity.
- [ ] Run tests and verify all assertions pass.

### Task 5: Verify, publish, and record state

**Files:**
- Modify: `PROJECT_STATUS.md`
- Modify: `C:/Users/Wynne/Documents/Obsidian Vault/03 Projects/SMEs.MY/SMEs.MY Dashboard.md`

- [ ] Run `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`, and `git diff --check`.
- [ ] Review generated pages for event-date labels, privacy leaks, links, and responsive layout.
- [ ] Commit implementation and push GitHub `main` under the user's direct deployment authorization.
- [ ] Verify `https://smes.my`, `/weineetan`, Notes, Cases, and the new email on production.
- [ ] Record the deployed state and future maintenance rule in `PROJECT_STATUS.md` and the existing Dashboard.
