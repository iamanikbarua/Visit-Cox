---
name: multi-agent-team-workflow
description: >-
  Operational protocols, peer review handoffs, error-correction procedures,
  and Main Agent verification standards for the 6 Visit Cox subagents.
---

# Multi-Agent Collaborative Team Workflow Skill 🤖🤝

Use this skill to govern how the 6 specialized agents collaborate, review each other's deliverables, and prepare verified code for Main Agent sign-off.

---

## 1. The 6-Agent Roles Matrix

1. **UI/UX Designer (`uiux_designer`):** Delivers design tokens, UX flows, mobile responsive specifications into `01-uiux-designer/`.
2. **Frontend Developer (`frontend_developer`):** Implements interactive tools, HTML/CSS/JS components into `02-frontend-developer/`.
3. **Backend Developer (`backend_developer`):** Implements booking contracts, payment webhooks, database schemas into `03-backend-developer/`.
4. **QA Engineer (`qa_engineer`):** Conducts functional testing, currency verification, edge case audits into `04-qa-engineer/`.
5. **SEO Specialist (`seo_specialist`):** Implements Schema.org JSON-LD, meta dictionaries, high-intent keywords into `05-seo-specialist/`.
6. **Marketing Manager (`marketing_manager`):** Delivers conversion copy, WhatsApp lead funnels, package pricing into `06-marketing-manager/`.

---

## 2. Peer Review & Handoff Checklist
* **Handoff from UI/UX to Frontend:** Color codes, spacing units, and responsive breakpoints must be clearly specified in `design-tokens.json`.
* **Handoff from Backend to Frontend:** JSON schemas and endpoint URLs must match request/response contracts.
* **Handoff to QA:** QA tests for:
  - BDT (৳) and USD ($) conversion accuracy (`120 BDT = 1 USD`).
  - Mobile responsiveness down to 320px screen width.
  - Bengali & English language toggles.
  - Zero browser console errors.

---

## 3. Error Correction Protocol
If QA or a peer agent discovers an error:
1. Document the exact steps to reproduce in `collaboration_log.md`.
2. The responsible agent adjusts their code within their designated folder.
3. Re-test until all test assertions pass.

---

## 4. Main Agent Verification & Git Push
* No agent directly commits to production or Git.
* Once all tests pass, the Main Agent reviews the staged code against the master project rules and performs the merge to root files.
