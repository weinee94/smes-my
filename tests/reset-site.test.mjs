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
