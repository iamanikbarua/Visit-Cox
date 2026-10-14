# Visit Cox — judge log

Gaps and next steps. Newest section last; read it first.

## Update 1 (2026-10-15): agents overpowered

- Rewrote `AGENTS.md` as an operating contract: file ownership map, ship-in-place (no staging copies), evidence-or-it-did-not-happen, no invented facts, owner-only decisions go to `todo.md`.
- Added `CODING_STANDARDS.md`, `scripts/check.sh` (JS syntax, `node --test`, local links/assets, stray files, secret scan) and `tests/` with a harness that loads the real `js/` files.
- Rewrote all six role briefs (`0N-*/WORKSPACE.md`) with owned paths, standards and required proof. Role 03 is now "data and integrations": there is no backend.
- Gate state at this point: fails on `no secrets` (admin password in `js/admin.js`). Next: independent critique, then role fixes.
