// @ts-check
const base = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage } = require('./pages/CartPage');

/**
 * @typedef {object} PageObjectFixtures
 * @property {LoginPage} loginPage
 * @property {InventoryPage} inventoryPage
 * @property {CartPage} cartPage
 */

/**
 * Extends the base Playwright test with ready-to-use page objects,
 * so individual specs stay focused on flow/assertions rather than wiring.
 * @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs & PageObjectFixtures,
 *   import('@playwright/test').PlaywrightWorkerArgs
 * >}
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

const expect = base.expect;

module.exports = { test, expect };
