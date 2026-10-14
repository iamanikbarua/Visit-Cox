---
name: multi-agent-team-workflow
description: >-
  How the 6 Visit Cox role agents split work, prove it, and hand it to the main
  agent: file ownership, the scripts/check.sh gate, evidence-based reports.
---

# Multi-agent team workflow

## Roles and ownership
Ownership is in the `AGENTS.md` map and each `0N-*/WORKSPACE.md`. Two agents never edit the same file in the same round; the main agent splits tasks by file before dispatch.

| Role | Folder | Owns |
|---|---|---|
| UI/UX | `01-uiux-designer/` | `css/styles.css`, visual markup |
| Frontend | `02-frontend-developer/` | `js/app.js`, `js/features.js`, `js/planner.js`, `js/quickpick.js`, blog rendering |
| Data and integrations | `03-backend-developer/` | `js/data.js`, `js/admin.js`, WhatsApp payload |
| QA | `04-qa-engineer/` | `tests/`, `scripts/check.sh` |
| SEO | `05-seo-specialist/` | `<head>` of pages, `sitemap.xml`, `robots.txt` |
| Marketing | `06-marketing-manager/` | user-facing copy, `todo.md` GTM items |

## A round
1. Main agent reads the newest `CrtiQue_*.md`, turns findings into tasks, assigns each to the owning role, and lists owner-only items in `todo.md`.
2. Each role agent fixes in the real root files (no staging copies), adds or updates a test in `tests/` that loads the real code, and runs `scripts/check.sh`.
3. Each reports: files changed, evidence (command output, viewport tiles), what is left, and requests for other roles.
4. Main agent reads every diff, reruns `scripts/check.sh`, resolves cross-role requests, writes a dated section in `judge.md`, commits and pushes.

## Error correction
A bug found in review becomes a failing test first, then a fix by the owning role, then a green gate. Record recurring mistakes as a new line in `CODING_STANDARDS.md` with its why.

## Hard rules
- No agent commits or pushes; only the main agent does.
- No claim of "passed" or "verified" without the output that shows it.
- No invented facts: prices, fares, numbers and partners need a source and as-of date or go to `todo.md`.
