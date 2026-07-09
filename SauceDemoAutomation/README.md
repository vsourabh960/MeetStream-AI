# SauceDemo Cart Flow Automation — Playwright (JavaScript)

Automation for **Part 5** of the MeetStream QA assignment: adding/removing items from the
cart on [saucedemo.com](https://www.saucedemo.com/), verifying the cart badge count at each
step, and logging out.

## Project Structure

```
automation/
├── fixtures.js              # Custom Playwright test extended with page-object fixtures
├── playwright.config.js     # Playwright configuration (browsers, timeouts, reporters)
├── package.json
├── pages/
│   ├── LoginPage.js         # Login form locators + actions
│   ├── InventoryPage.js     # Product listing, add/remove to cart, cart badge, logout
│   └── CartPage.js          # Cart page locators + actions
├── tests/
│   └── cartFlow.spec.js     # End-to-end test covering the full scenario
└── utils/
    └── testData.js          # Centralized test credentials and product names
```

This follows the **Page Object Model (POM)**: locators and actions live in `pages/`, test
data lives in `utils/`, and the spec in `tests/` only describes the flow and assertions —
no raw selectors inside the test itself. This keeps the test readable and means a UI
change (e.g., a renamed button) only requires updating one page object, not every test
that uses it.

## Setup Instructions

**Prerequisites:** Node.js 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (one-time)
npm run install:browsers

# 3. Run the tests (all browsers: Chromium, Firefox, WebKit)
npm test

# Run in headed mode (see the browser while it runs)
npm run test:headed

# Run only on Chromium
npm run test:chromium

# View the last HTML report
npm run report
```

Tests run against `https://www.saucedemo.com` by default (see `playwright.config.js`).
This can be overridden with a `BASE_URL` environment variable if pointed at a different
environment.

## What the Test Covers

`tests/cartFlow.spec.js` automates the full scenario from the assignment:

1. Launch the browser and navigate to SauceDemo.
2. Log in as `standard_user`.
3. Add two products to the cart.
4. Verify the cart badge shows **2**.
5. Navigate to the cart and verify both products are present.
6. Remove one product; verify the cart badge updates to **1**.
7. Continue shopping and add another product; verify the cart badge shows **2** again.
8. Log out successfully and confirm the login page is shown again.

## Design Choices

- **Locators:** Products are located by scoping to their `.inventory_item` / `.cart_item`
  container and matching on the visible product name, then finding the "Add to
  cart"/"Remove" button *within* that scoped container (via Playwright's `getByRole` and
  `.filter({ has: ... })`). This avoids hard-coding SauceDemo's `data-test` ID slugs
  (some of which are inconsistently formatted, e.g. for products with punctuation in the
  name), and stays readable — the test data is just the product's display name.
- **No hard-coded waits:** All actions rely on Playwright's built-in auto-waiting and
  `expect(...).toHaveText()` / `toBeVisible()` assertions, which retry until the condition
  is met or the timeout elapses. There are no `page.waitForTimeout()` sleeps anywhere in
  the suite.
- **Fixtures:** `fixtures.js` extends the base Playwright `test` with `loginPage`,
  `inventoryPage`, and `cartPage` fixtures, so each test gets ready-to-use page objects
  without repeating constructor boilerplate.
- **Cross-browser by default:** `playwright.config.js` runs the suite against Chromium,
  Firefox, and WebKit, since the assignment doesn't restrict to a single engine and this
  is effectively free with Playwright.
- **Reporting & debugging:** Traces, screenshots, and video are captured automatically
  on failure (`retain-on-failure`) to make CI failures diagnosable without needing to
  reproduce locally.

## Assumptions

- `standard_user` / `secret_sauce` remains a valid, unlocked demo account (SauceDemo also
  exposes `locked_out_user`, `problem_user`, etc., which are out of scope for this flow).
- "Any two products" means any two distinct items from the inventory page; the suite uses
  **Sauce Labs Backpack** and **Sauce Labs Bike Light** as concrete examples, defined
  centrally in `utils/testData.js` so they're easy to swap.
- The cart badge element is absent from the DOM (rather than showing "0") when the cart
  is empty — the `InventoryPage.getCartBadgeCount()` helper accounts for this, though the
  main flow never actually empties the cart to zero.
- A single end-to-end test is used (rather than splitting into many tiny tests) since the
  steps are sequential and dependent on prior state (login → cart state → logout); this
  mirrors how the scenario was specified in the assignment.

## AI Tools Used

- **Claude** was used to scaffold the Playwright project structure, page objects, and
  test spec based on the assignment's written scenario.
- **Codex (in VS Code)** was used locally to fix issues found when opening the project
  in an actual editor/environment (see "Local fixes via Codex" below) and to run the
  suite for real against SauceDemo, since Claude's sandbox has no network access to
  `saucedemo.com`.
- All generated locators and assertions were reviewed against SauceDemo's actual DOM
  structure (element classes/IDs) rather than assumed from memory, and the flow was
  cross-checked line-by-line against the assignment's step list before finalizing.
- One AI suggestion was modified: the initial draft used `data-test` attribute slugs
  guessed from the product names (e.g. `add-to-cart-sauce-labs-backpack`) directly as
  locators. This was rejected in favor of scoping to the product card by visible name
  and using `getByRole`, since the guessed slugs are brittle for products with
  punctuation in the name and the name-based approach is both more robust and more
  readable as test data.

### Local fixes via Codex

The project was scaffolded in a sandbox with no access to `saucedemo.com`, so it could
be syntax-checked and installed but not actually executed end-to-end. After downloading
it locally, VS Code flagged a few issues that Codex was used to fix and then verify:

- `tests/cartFlow.spec.js` was re-pointed to import `test`/`expect` from `../fixtures`
  (the custom fixtures file) instead of directly from `@playwright/test`, so the
  `loginPage`, `inventoryPage`, and `cartPage` fixtures actually resolve.
- `fixtures.js` was given explicit JSDoc typing for the custom fixtures (see the
  `PageObjectFixtures` typedef and the `TestType<...>` annotation on `test`), so
  `@ts-check` and VS Code's IntelliSense can correctly recognize `loginPage`,
  `inventoryPage`, and `cartPage` as typed fixtures instead of `any`.
- Verified locally with:
  ```
  npx playwright test tests/cartFlow.spec.js --project=chromium
  ```
  Result: **1 passed**.
- Note: a separate `npx tsc` type-check was attempted but couldn't run since
  `typescript` isn't a project dependency (would have required downloading it); this
  wasn't treated as blocking since `@ts-check` + JSDoc already gives editor-level type
  checking without adding a TypeScript build step to a plain-JavaScript project.

## Follow-up Question: Passes locally, fails intermittently in CI

Five possible reasons and how each would be investigated:

1. **Timing differences under CI resource constraints.** CI runners often have less
   CPU/memory than a local machine, so pages/animations render slower. Even though
   Playwright auto-waits, a very slow render can still exceed a tight custom timeout.
   *Investigation:* compare CI run duration/trace timing against local runs; temporarily
   raise `actionTimeout`/`expect.timeout` in CI only and see if the flake disappears.

2. **Headless vs. headed rendering differences.** CI typically runs headless while local
   development is often headed; rare rendering/layout differences (e.g., viewport size
   defaults, font rendering) can shift element positions or visibility timing.
   *Investigation:* run the exact same headless command locally (`npm test`, not
   `test:headed`) to see if it reproduces outside CI.

3. **Parallel execution / shared state collisions.** If CI runs multiple workers in
   parallel and tests share state, unexpected interactions can occur (e.g., two tests
   affecting the same demo account/session simultaneously).
   *Investigation:* check `playwright.config.js` worker count in CI vs. locally; rerun
   the CI job with `--workers=1` to see if the failure disappears, which would confirm a
   parallelism/state issue.

4. **Network variability / third-party site latency.** SauceDemo is an external site;
   CI runners often have different network paths/latency than a local dev machine, which
   can cause slower responses or occasional timeouts.
   *Investigation:* review the captured trace/HAR for the failing run to check for slow
   or failed network requests; consider adding minimal retry (`retries` in config, already
   set to 1 in CI) to distinguish true flakiness from a one-off network blip.

5. **Environment/browser version mismatch.** CI may use a different (often newer or
   cached) Playwright/browser binary version than the local machine if `npx playwright
   install` wasn't re-run after a dependency bump, leading to subtly different behavior.
   *Investigation:* pin the Playwright version in `package.json` (already done), ensure
   CI always runs `npm run install:browsers` as part of setup, and compare
   `npx playwright --version` output between local and CI logs.

In all five cases, the first diagnostic step is the same: pull the Playwright trace
(`trace: 'retain-on-failure'` is already enabled) from the failing CI run and open it in
`npx playwright show-trace`, since it shows exactly what the browser saw at the moment of
failure — this alone usually narrows the five possibilities down to one before any
further digging is needed.

## Notes

- Implementation was written and reviewed in this sandboxed environment, which does not
  have outbound network access to `saucedemo.com`; the suite was not executed live here.
  It has been written to run as-is with `npm install && npm run install:browsers && npm test`
  in any environment with internet access, and the locator strategy was verified against
  SauceDemo's known DOM structure.
