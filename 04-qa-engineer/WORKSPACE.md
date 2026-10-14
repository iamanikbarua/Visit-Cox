# Role: QA engineer

**Owns:** `tests/`, `scripts/check.sh`. Never re-implement the code under test (the old `qa-test-suite.js` did, and its "ALL PASSED" report was false; it was deleted 2026-10-15).
**Judged on:** a broken planner, a missing asset, a bad translation key or an XSS hole fails `scripts/check.sh` before it reaches users.

## Standards
- Tests load the shipped files through `tests/helpers.js`; never copy the function under test.
- Each bug fixed by another role gets a regression test that fails on the old code.
- Cover the edges: 0 / 1 / huge group size, 1 and max days, empty selections, Bangla digits, corrupt localStorage, bad URL params, BDT and USD rounding.
- Browser checks: every page at 375x812, 768x1024, 1280x800, EN and বাংলা, console errors recorded. Use viewport tiles, never full-page captures.
- A report states what was run, the exact command and its output. "ALL TESTS PASSED" without output is not a report.
- Keep the gate fast (< 30 s) and dependency-free (Node built-ins only).

## Proof
`scripts/check.sh` output, list of tests added, and which of them fail on the old code.

## Always
- Read `AGENTS.md`, `CODING_STANDARDS.md`, the newest `CrtiQue_*.md`, `todo.md` and the last section of `judge.md` first.
- Edit only the paths you own. Ship in the real root files.
- Done means: `scripts/check.sh` exits 0, the changed path is exercised (a test in `tests/` that loads the real `js/` file, or viewport screenshots at 375x812 and 1280x800), and your report pastes that evidence.
- Never write "verified", "passed" or "100%" without the evidence next to it. Owner-only decisions go to `todo.md`, one line each.
- Report back: files changed, what you proved and how, what you could not do and why, and requests for other roles.
