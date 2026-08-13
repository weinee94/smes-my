# SMEs.MY Evidence-Led Content System Design

Date: 2026-08-13  
Status: Approved direction, awaiting implementation

## Objective

Turn SMEs.MY from a visually complete but thin first release into a durable professional and commercial asset grounded in Wei Nee's real work across employment, PlanurHome, renovation and project coordination, and SMEs.MY's own experiments.

The site must prove a repeated capability: Wei Nee can understand how a business or project operates, identify what is unclear or likely to be missed, create usable structure, and help move execution forward.

## Source of Truth

Public website content is derived from existing authoritative records. It does not become the source of truth for private evidence.

- Employment evidence: Google Drive Career Evidence Register and related work records.
- PlanurHome and personal project evidence: existing Obsidian dashboards, project records, cost trackers, and source files.
- SMEs.MY decisions: `SMES_MY_POSITIONING.md`, `PROJECT_STATUS.md`, git history, and the existing Obsidian SMEs.MY Dashboard.
- Chat history may help locate evidence but is not sufficient proof by itself.

The existing SMEs.MY Dashboard will hold the compact candidate-content list. No second content-management system will be created.

## Date Model

Website dates must not imply that an event happened on the date an article was created.

Each public item may contain:

- `eventDate`: the exact date Wei Nee identified the problem, made the material decision, or began the relevant intervention.
- `eventPeriod`: used instead of `eventDate` when only a month or date range is supported.
- `pubDatetime`: the actual website publication timestamp, retained for feeds and technical metadata.
- `modDatetime`: the most recent material editorial update, when applicable.

Public cards and article headers display `发生于` using `eventDate` or `eventPeriod`. Publication metadata remains secondary and does not replace the event date.

Date selection order:

1. Use the documented discovery or intervention date.
2. If the event was first recorded the following day and the original day is reliably established, use the original event date.
3. If only a period is supported, display that period.
4. Never infer an exact day from file creation time, website build time, or an undated chat.

## Content Architecture

The public site keeps three editorial forms:

### 经营笔记

A reusable operating insight grounded in real experience. It may omit identifying case details, but must state the practical observation and decision logic. Notes are not motivational posts.

### 实战案例

An anonymised account structured as:

Problem → Observation → Decision → System / Process → Execution → Result / Learning

Cases must distinguish confirmed outcomes from inference and disclose meaningful evidence limits.

### 实验室

A real commercial or operational hypothesis being tested. Every experiment follows:

Observation → Problem → Experiment → Evidence of demand → Decision

An idea is not listed merely to make the laboratory look active.

## Experience Coverage

The candidate inventory must cover four evidence lanes:

1. Current employment: commercial operations, follow-up, visibility, coordination, demand-readiness, and execution systems.
2. PlanurHome: homeowner coordination, cost and payment clarity, supplier handling, project controls, and product decisions.
3. Earlier renovation and project work: cross-party coordination, scope clarity, risk control, and lessons that transfer across industries.
4. SMEs.MY itself: retiring the directory, reframing the domain, choosing evidence-led development, and future validated experiments.

The first audit should identify 8–12 candidates, not publish 8–12 articles automatically. Only distinct, supported pieces move to the public site.

## Existing Content Audit

The five launch pieces are provisional editorial seeds. Each must be checked against source evidence for:

- correct event date or period;
- whether it is genuinely distinct;
- whether it should be a Note or Case;
- whether claims exceed available evidence;
- whether sensitive employer, colleague, client, or commercial information remains;
- whether the piece proves a useful judgment or action rather than merely describing activity.

Overlapping pieces should be merged or reframed. Thin pieces should not be retained solely to preserve page count.

## Candidate Selection

A candidate advances only when it answers at least three of these questions:

1. Does it demonstrate Wei Nee's judgment?
2. Does it show how ambiguity or disorder became executable?
3. Does it show a decision, intervention, or ownership rather than activity alone?
4. Could it remain useful to a future employer, partner, SME owner, or client?
5. Is it sufficiently supported and safe to publish?

Each candidate is classified as `hold`, `note`, `case`, or `experiment`. The Dashboard stores only a short title, source pointer, event date or period, evidence state, public-safety state, and publishing decision.

## Privacy and Sanitisation

Public content must exclude employer names, colleague names, private conversations, staff-performance details, customer identities, internal financial or commercial data, credentials, private contact details, and any information that could reasonably identify a confidential situation.

Sanitisation must preserve the business problem and Wei Nee's decision logic without creating false specifics. Removing names is not enough if the remaining facts still identify the organisation or person.

## Personal Page and Contact

`/weineetan` remains the single personal professional route. It connects the cross-industry evidence without becoming a resume homepage.

All public contact links use:

`weineetan@smes.com.my`

## Maintenance Model

- Review new evidence when a real outcome, decision, or learning appears.
- Publish roughly one or two worthwhile Notes per month at most.
- Add a Case only when the evidence is mature enough.
- Add or update an Experiment only when there is a real test or new evidence.
- Refresh About and Now only when facts change.
- Do not manufacture frequency, page count, or SEO volume.

## Implementation Scope

1. Add the event-date fields and presentation rules to the content schema and article/card components.
2. Change all public email links to `weineetan@smes.com.my`.
3. Build the compact candidate inventory in the existing SMEs.MY Dashboard.
4. Trace source records across the four experience lanes.
5. Audit and correct the five existing pieces.
6. Prepare the strongest additional public pieces supported by the evidence audit.
7. Run privacy, content, link, responsive, test, lint, and production-build checks.
8. Deploy through the existing GitHub-to-Vercel path and verify the live site.

## Success Criteria

- No public item uses a fabricated or build-derived event date.
- The site visibly represents more than the current employment context.
- Every retained public piece is distinct, evidence-grounded, and sanitised.
- The contact address is consistent across the site.
- The content pipeline lives in the existing authoritative Dashboard rather than a parallel system.
- The site remains small, credible, and maintainable.
