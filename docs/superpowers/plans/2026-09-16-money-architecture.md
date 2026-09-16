# Money architecture implementation plan

1. Verify production routes, remote commit/deployment, existing spreadsheet and active Apps Script deployment.
2. Add regression tests for restored tool routes and confirmed receipt semantics; replace obsolete redirect assertions.
3. Restore generator and tools hub; link two paths in homepage/navigation/footer; add a small digital-products placeholder.
4. Implement validated, idempotent lead handling and source/consent tracking; keep old records and require explicit persistence acknowledgement. Test invalid payloads, duplicate retry, formula safety and notification failure.
5. Add receipt page, error recovery and confirmation-aware form; preserve entered data on failure.
6. Run tests, lint, Astro check/build; browser-test tool and lead flow. Deploy and verify one clearly labelled synthetic lead in the spreadsheet, including notification status.
7. Update positioning, operating runbook and project status with exact production state and dependencies.
