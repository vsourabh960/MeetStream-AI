# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cartFlow.spec.js >> SauceDemo cart flow >> add, remove, and re-add products; verify cart badge and logout
- Location: tests\cartFlow.spec.js:11:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Continue Shopping' })
    - locator resolved to <button id="continue-shopping" name="continue-shopping" data-test="continue-shopping" class="btn btn_secondary back btn_medium">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bike Light" [ref=e34]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bike Light
            - generic [ref=e36]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e37]:
              - generic [ref=e38]: $9.99
              - button "Remove" [ref=e39] [cursor=pointer]
      - generic [ref=e40]:
        - button "Go back Continue Shopping" [ref=e41] [cursor=pointer]:
          - img "Go back" [ref=e42]
          - text: Continue Shopping
        - button "Checkout" [ref=e43] [cursor=pointer]
  - contentinfo [ref=e44]:
    - list [ref=e45]:
      - listitem [ref=e46]:
        - link "Twitter" [ref=e47]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e48]:
        - link "Facebook" [ref=e49]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e50]:
        - link "LinkedIn" [ref=e51]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e52]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | // @ts-check
  2  | 
  3  | class CartPage {
  4  |   /**
  5  |    * @param {import('@playwright/test').Page} page
  6  |    */
  7  |   constructor(page) {
  8  |     this.page = page;
  9  |     this.cartItems = page.locator('.cart_item');
  10 |     this.itemNames = page.locator('.inventory_item_name');
  11 |     this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  12 |     this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  13 |   }
  14 | 
  15 |   /**
  16 |    * @returns {Promise<string[]>}
  17 |    */
  18 |   async getItemNames() {
  19 |     return this.itemNames.allTextContents();
  20 |   }
  21 | 
  22 |   /**
  23 |    * @param {string} productName
  24 |    */
  25 |   async removeItem(productName) {
  26 |     const card = this.cartItems.filter({
  27 |       has: this.page.locator('.inventory_item_name', { hasText: productName }),
  28 |     });
  29 |     await card.getByRole('button', { name: 'Remove' }).click();
  30 |   }
  31 | 
  32 |   async continueShopping() {
> 33 |     await this.continueShoppingButton.click();
     |                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  34 |   }
  35 | }
  36 | 
  37 | module.exports = { CartPage };
  38 | 
```