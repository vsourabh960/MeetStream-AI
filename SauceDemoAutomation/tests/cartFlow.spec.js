// @ts-check
const { test, expect } = require('../fixtures');
const { USERS, PRODUCTS } = require('../utils/testData');

test.describe('SauceDemo cart flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('add, remove, and re-add products; verify cart badge and logout', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    // Sanity check: login succeeded and we're on the inventory page.
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Add two products to the cart.
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    // Verify the cart badge shows 2.
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Navigate to the cart.
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);

    // Verify both selected products are present.
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toEqual(expect.arrayContaining([PRODUCTS.backpack, PRODUCTS.bikeLight]));
    expect(itemNames).toHaveLength(2);

    // Remove one product.
    await cartPage.removeItem(PRODUCTS.bikeLight);

    // Verify the cart badge updates to 1.
    // The badge lives in the header, which persists on the cart page too.
    await expect(inventoryPage.cartBadge).toHaveText('1');
    const remainingItems = await cartPage.getItemNames();
    expect(remainingItems).toEqual([PRODUCTS.backpack]);

    // Continue shopping.
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/.*inventory.html/);

    // Add another product.
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    // Verify the cart badge displays 2 again.
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Logout successfully.
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
