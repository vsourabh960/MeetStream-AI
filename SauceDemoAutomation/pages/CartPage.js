// @ts-check

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  /**
   * @returns {Promise<string[]>}
   */
  async getItemNames() {
    return this.itemNames.allTextContents();
  }

  /**
   * @param {string} productName
   */
  async removeItem(productName) {
    const card = this.cartItems.filter({
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    await card.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage };
