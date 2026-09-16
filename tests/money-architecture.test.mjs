import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("historic lead backend is retained but not promoted publicly", () => {
  assert.ok(existsSync("docs/google-apps-script.js"));
  assert.ok(existsSync("src/components/EnquiryForm.astro"));
  const home = readFileSync("src/pages/index.astro", "utf8");
  assert.doesNotMatch(home, /EnquiryForm|\/request/);
});
