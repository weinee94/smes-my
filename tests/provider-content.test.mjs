import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("URBANRENO seed profile is invoice-backed without verification overclaim", () => {
  const home = read("index.html") + read("js/app.js");
  const guide = read("electrical-wiring-contractors-malaysia/index.html");
  const publicContent = `${home}\n${guide}`;

  assert.match(publicContent, /URBANRENO/);
  assert.match(publicContent, /URBAN RENO EMPIRE/);
  assert.match(publicContent, /PG0541595-V/);
  assert.match(publicContent, /invoice-backed provider information/i);
  assert.match(publicContent, /details not yet independently verified by SMEs\.MY/i);
  assert.match(publicContent, /dedicated power points/i);
  assert.match(publicContent, /concealed\/internal wiring from DB/i);

  assert.doesNotMatch(publicContent, /is verified by SMEs\.MY|verified provider|SMEs\.MY verified provider/i);
  assert.doesNotMatch(publicContent, /bank account|account no|account number|maybank|cimb|public bank/i);
});
