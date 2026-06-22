import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("URBANRENO source profile avoids verification overclaim", () => {
  const home = read("index.html") + read("js/app.js");
  const guide = read("electrical-wiring-contractors-malaysia/index.html");
  const publicContent = `${home}\n${guide}`;

  assert.match(publicContent, /URBANRENO/);
  assert.match(publicContent, /URBAN RENO EMPIRE/);
  assert.match(publicContent, /PG0541595-V/);
  assert.match(publicContent, /Profile based on an invoice record/i);
  assert.match(publicContent, /Invoice source noted/i);
  assert.match(publicContent, /details still need buyer/i);
  assert.match(publicContent, /dedicated power points/i);
  assert.match(publicContent, /concealed\/internal wiring from DB/i);

  assert.doesNotMatch(publicContent, /is verified by SMEs\.MY|verified provider|SMEs\.MY verified provider|SMEs\.MY-verified/i);
  assert.doesNotMatch(publicContent, /bank account|account no|account number|maybank|cimb|public bank/i);
});

test("seed provider uses formal business name and does not publish direct contact details", () => {
  const app = read("js/app.js");
  const guide = read("electrical-wiring-contractors-malaysia/index.html");

  assert.match(app, /name:\s*"Urban Reno Empire"/);
  assert.match(guide, /<h2>Urban Reno Empire<\/h2>/);
  assert.match(guide, /Invoice header[\s\S]*URBANRENO/);
  assert.match(guide, /Business name[\s\S]*URBAN RENO EMPIRE/);
  assert.match(app, /detailsUrl:\s*"\/electrical-wiring-contractors-malaysia#urban-reno-empire"/);

  assert.doesNotMatch(guide, /urbanrenoempire@gmail\.com/i);
  assert.doesNotMatch(guide, /017-3999639/);
  assert.match(guide, /Request through SMEs\.MY/i);
});

test("public site stays English-first until category pages have full bilingual support", () => {
  const home = read("index.html");
  const app = read("js/app.js");

  assert.doesNotMatch(home, /class="language-switch"/);
  assert.match(app, /let currentLang = "en";/);
  assert.doesNotMatch(app, /localStorage\.getItem\("smesLang"\)/);
});

test("homepage applies marketplace reference without changing logo assets", () => {
  const home = read("index.html");
  const styles = read("css/styles.css");
  const app = read("js/app.js");

  assert.match(home, /assets\/smes-main-logo\.png/);
  assert.match(home, /assets\/smes-site-icon\.png/);
  assert.match(home, /class="directory-visual"/);
  assert.match(home, /class="quote-panel compact-quote"/);
  assert.match(styles, /--brand-blue:\s*#073c86/);
  assert.match(styles, /\.directory-cube/);
  assert.match(app, /icon:\s*"calculator"/);
  assert.match(app, /icon:\s*"building"/);

  assert.doesNotMatch(home + styles + app, /is verified by SMEs\.MY|verified provider|SMEs\.MY verified provider|SMEs\.MY-verified/i);
});

test("Johor Bahru area page adds provider shortlist content without verification overclaim", () => {
  const page = read("johor-bahru-suppliers-services/index.html");
  const sitemap = read("sitemap.xml");
  const llms = read("llms.txt");
  const home = read("index.html");

  assert.match(page, /Johor Bahru provider shortlist/);
  assert.match(page, /Source listed, needs buyer check/);
  assert.match(page, /PLL Packaging Sdn Bhd/);
  assert.match(page, /CSY Electric Sdn\. Bhd\./);
  assert.match(page, /C&amp;G Corporate Services/);
  assert.match(page, /DTL Accounting Firm/);
  assert.match(page, /TJW Group/);
  assert.match(page, /YCS Accounting/);
  assert.match(page, /A listed source note is not the same as SMEs\.MY verification/);

  assert.match(sitemap, /https:\/\/smes\.my\/johor-bahru-suppliers-services/);
  assert.match(llms, /Johor Bahru suppliers and services/);
  assert.match(home, /\/johor-bahru-suppliers-services/);

  assert.doesNotMatch(page, /is verified by SMEs\.MY|verified provider|SMEs\.MY verified provider|SMEs\.MY-verified/i);
  assert.doesNotMatch(page, /ProfilePage|Review Snippet|review stars/i);
});

test("first Johor Bahru provider profiles are linked and labelled correctly", () => {
  const app = read("js/app.js");
  const area = read("johor-bahru-suppliers-services/index.html");
  const sitemap = read("sitemap.xml");
  const llms = read("llms.txt");
  const pll = read("providers/pll-packaging-sdn-bhd/index.html");
  const csy = read("providers/csy-electric-sdn-bhd/index.html");
  const cg = read("providers/cg-corporate-services/index.html");
  const publicProfileContent = `${app}\n${area}\n${sitemap}\n${llms}\n${pll}\n${csy}\n${cg}`;

  assert.match(app, /publicSource:\s*"Source listed"/);
  assert.match(app, /name:\s*"PLL Packaging Sdn Bhd"/);
  assert.match(app, /name:\s*"CSY Electric Sdn\. Bhd\."/);
  assert.match(app, /name:\s*"C&G Corporate Services"/);
  assert.match(area, /\/providers\/pll-packaging-sdn-bhd/);
  assert.match(area, /\/providers\/csy-electric-sdn-bhd/);
  assert.match(area, /\/providers\/cg-corporate-services/);
  assert.match(pll, /Source listed, needs buyer check/);
  assert.match(csy, /needs buyer check/i);
  assert.match(cg, /Licensed secretary evidence/i);
  assert.match(cg, /fee\/package details/i);
  assert.match(sitemap, /https:\/\/smes\.my\/providers\/pll-packaging-sdn-bhd/);
  assert.match(llms, /C&G Corporate Services provider profile/);

  assert.doesNotMatch(publicProfileContent, /is verified by SMEs\.MY|verified provider|SMEs\.MY verified provider|SMEs\.MY-verified/i);
});

test("homepage puts source-listed provider records before example profiles", () => {
  const home = read("index.html");
  const app = read("js/app.js");

  assert.match(home, /Provider profiles/);
  assert.match(home, /service scope, location, source notes/i);
  assert.match(app, /providersTitle:\s*"Compare suppliers and service providers by what matters before you enquire\."/);
  assert.match(app, /function providerSortRank\(provider\)/);
  assert.match(app, /publicSource:\s*0/);
  assert.match(app, /invoiceBacked:\s*1/);
  assert.match(app, /sampleProfile:\s*9/);
  assert.match(app, /\.sort\(\(a, b\) => providerSortRank\(a\) - providerSortRank\(b\)/);
});

test("provider cards use user-facing signal labels instead of unclear status text", () => {
  const app = read("js/app.js");
  const styles = read("css/styles.css");

  assert.match(app, /function providerSignalItems\(provider\)/);
  assert.match(app, /Open item/);
  assert.match(app, /Needs direct check/);
  assert.doesNotMatch(app, /Not confirmed|Not shown on invoice/);
  assert.match(styles, /\.provider-signals small/);
});

test("public-facing pages do not expose internal profile-build wording", () => {
  const publicFiles = [
    "index.html",
    "johor-bahru-suppliers-services/index.html",
    "electrical-wiring-contractors-malaysia/index.html",
    "providers/pll-packaging-sdn-bhd/index.html",
    "providers/csy-electric-sdn-bhd/index.html",
    "providers/cg-corporate-services/index.html",
    "llms.txt",
  ];
  const publicContent = publicFiles.map((file) => read(file)).join("\n");

  assert.doesNotMatch(publicContent, /public-source|sample formats?|invoice-backed seed/i);
  assert.doesNotMatch(publicContent, /Browse real public-source profiles before sample formats/i);
  assert.doesNotMatch(publicContent, /Not confirmed|Not shown on invoice/);
});
