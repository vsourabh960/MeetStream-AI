# MeetStream QA Assignment — Submission

**Candidate submission for:** Online Event Registration Platform — QA Engineer take-home assignment
**Author:** [Your Name]

This README covers the **entire submission**. Each part also has its own detailed
content inside its file; this document is the map that ties them together, plus the
setup instructions, assumptions, and AI usage notes that apply across the whole
assignment (a more detailed, automation-specific README also lives inside
`automation/`).

## Repository Structure

```
.
├── README.md                          # This file — overall submission overview
├── Part1_QA_Strategy.docx             # Part 1 — QA Strategy & risk-based thinking
├── Part2_Test_Case_Design.docx        # Part 2 — Test case design write-up + prioritization
├── Part2_Test_Cases.xlsx              # Part 2 — Full 15 test cases + prioritization (spreadsheet)
├── Part3_Root_Cause_Analysis.docx     # Part 3 — RCA for all 3 scenarios
├── Part4_API_Testing.docx             # Part 4 — API testing approach for all 6 endpoints
├── Part6_AI_Usage.docx                # Part 6 — AI tools used, verification, examples
└── automation/                        # Part 5 — Playwright (JavaScript) automation project
    ├── README.md                      # Automation-specific setup & design notes
    ├── package.json
    ├── playwright.config.js
    ├── fixtures.js
    ├── pages/
    │   ├── LoginPage.js
    │   ├── InventoryPage.js
    │   └── CartPage.js
    ├── tests/
    │   └── cartFlow.spec.js
    └── utils/
        └── testData.js
```

## How to Review This Submission

| Assignment Requirement | Where to find it |
|---|---|
| QA Strategy & Test Cases | `Part1_QA_Strategy.docx`, `Part2_Test_Case_Design.docx`, `Part2_Test_Cases.xlsx` |
| Root Cause Analysis | `Part3_Root_Cause_Analysis.docx` |
| API Testing Approach | `Part4_API_Testing.docx` |
| Automation Project | `automation/` (see its own README for setup/run instructions) |
| README (setup, assumptions, AI tools, notes) | This file, plus `automation/README.md` for automation-specific detail |

## Setup Instructions

Most of the submission is documentation (`.docx` / `.xlsx`) and needs no setup — just
open the files. The only runnable part is the automation project.

```bash
cd automation
npm install
npm run install:browsers   # one-time Playwright browser install
npm test                   # runs the cart flow across Chromium, Firefox, WebKit
```

See `automation/README.md` for the full breakdown (headed mode, single-browser runs,
viewing the HTML report, environment variables, etc.).

## Assumptions

Made across the assignment where the brief didn't specify exact behavior; each part's
file also documents assumptions local to that part in more detail.

- The platform uses standard email/password authentication, with session/token-based
  auth for actions requiring a logged-in user (no SSO/social login assumed).
- "Payment" is a simulated flow (per the assignment's Background doc), assumed to
  support both a success path and a designated decline/failure path for testing.
- The system enforces sensible business rules not explicitly stated but reasonable for
  this type of product: no duplicate registration for the same event by the same user,
  and no registration once an event is fully booked.
- Confirmation emails are sent asynchronously after a successful payment and
  registration are confirmed.
- For the automation task (Part 5), "any two products" was interpreted as any two
  distinct SauceDemo inventory items; **Sauce Labs Backpack** and **Sauce Labs Bike
  Light** were used as concrete examples.

## AI Tools Used (Summary)

Full detail, including verification steps and specific examples of rejected/modified
AI suggestions, is in `Part6_AI_Usage.docx`. In short:

- **Claude (Anthropic)** was used across all parts for drafting, structuring, and
  formatting each deliverable (QA strategy, test cases, root-cause analysis, API
  testing approach, and the initial Playwright automation scaffold).
- **Codex (in VS Code)** was used locally for Part 5 specifically — fixing a fixture
  import issue and adding JSDoc typing in `automation/fixtures.js`, then actually
  running the suite against the live SauceDemo site (`npx playwright test
  tests/cartFlow.spec.js --project=chromium` → `1 passed`), since the drafting
  environment had no network access to `saucedemo.com`.
- All AI-generated content was reviewed and, where needed, corrected against the
  assignment's actual requirements (e.g., the sample API contract, SauceDemo's real DOM
  structure) rather than accepted as-is — see `Part6_AI_Usage.docx` for specific
  examples of suggestions that were rejected or modified.

## Additional Notes

- Documentation files are provided as `.docx`/`.xlsx` for readability and formatting
  (tables, color-coded priorities); all written content is original analysis, with AI
  used as a drafting and formatting aid as described above.
- The automation project was written and syntax/install-verified in a sandboxed
  environment without outbound access to `saucedemo.com`, then downloaded and actually
  executed locally (see `automation/README.md` → "Local fixes via Codex" for details),
  where it passed.
- Any reviewer feedback or questions are welcome — happy to walk through the reasoning
  behind any prioritization or design decision in more depth.
