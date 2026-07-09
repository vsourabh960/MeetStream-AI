// @ts-check

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.pageTitle = page.locator('.title');
  }

  /**
   * Returns the inventory_item container that matches the given product name.
   * Scoping to the product card (rather than a guessed data-test slug) keeps
   * this resilient to naming inconsistencies in SauceDemo's product IDs.
   * @param {string} productName
   */
  productCard(productName) {
    return this.inventoryList
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });
  }

  /**
   * @param {string} productName
   */
  async addProductToCart(productName) {
    const card = this.productCard(productName);
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * @param {string} productName
   */
  async removeProductFromCart(productName) {
    const card = this.productCard(productName);
    await card.getByRole('button', { name: 'Remove' }).click();
  }

  /**
   * Returns the cart badge count as a number, or 0 if the badge isn't shown.
   */
  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    const text = await this.cartBadge.textContent();
    return Number(text?.trim() ?? 0);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
