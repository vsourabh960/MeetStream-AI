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
  - waiting for locator('#logout_sidebar_link')
    - locator resolved to <a href="#" id="logout_sidebar_link" class="bm-item menu-item" data-test="logout-sidebar-link">Logout</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    15 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [active] [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - generic [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: Name (A to Z)
          - combobox [ref=e20]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - link "Sauce Labs Backpack" [ref=e27] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e28]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - link "Sauce Labs Backpack" [ref=e31] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e32]: Sauce Labs Backpack
            - generic [ref=e33]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e34]:
            - generic [ref=e35]: $29.99
            - button "Remove" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - link "Sauce Labs Bike Light" [ref=e39] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e40]
        - generic [ref=e41]:
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bike Light
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e46]:
            - generic [ref=e47]: $9.99
            - button "Remove" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e51] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e55] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e56]: Sauce Labs Bolt T-Shirt
            - generic [ref=e57]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e58]:
            - generic [ref=e59]: $15.99
            - button "Add to cart" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - link "Sauce Labs Fleece Jacket" [ref=e63] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - link "Sauce Labs Fleece Jacket" [ref=e67] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e68]: Sauce Labs Fleece Jacket
            - generic [ref=e69]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e70]:
            - generic [ref=e71]: $49.99
            - button "Add to cart" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - link "Sauce Labs Onesie" [ref=e75] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - link "Sauce Labs Onesie" [ref=e79] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e80]: Sauce Labs Onesie
            - generic [ref=e81]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e82]:
            - generic [ref=e83]: $7.99
            - button "Add to cart" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e87] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e88]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e91] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e92]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e93]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e94]:
            - generic [ref=e95]: $15.99
            - button "Add to cart" [ref=e96] [cursor=pointer]
  - contentinfo [ref=e97]:
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "Twitter" [ref=e100] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e101]:
        - link "Facebook" [ref=e102] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e103]:
        - link "LinkedIn" [ref=e104] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e105]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | // @ts-check
  2  | 
  3  | class InventoryPage {
  4  |   /**
  5  |    * @param {import('@playwright/test').Page} page
  6  |    */
  7  |   constructor(page) {
  8  |     this.page = page;
  9  |     this.inventoryList = page.locator('.inventory_list');
  10 |     this.cartBadge = page.locator('.shopping_cart_badge');
  11 |     this.cartLink = page.locator('.shopping_cart_link');
  12 |     this.menuButton = page.locator('#react-burger-menu-btn');
  13 |     this.logoutLink = page.locator('#logout_sidebar_link');
  14 |     this.pageTitle = page.locator('.title');
  15 |   }
  16 | 
  17 |   /**
  18 |    * Returns the inventory_item container that matches the given product name.
  19 |    * Scoping to the product card (rather than a guessed data-test slug) keeps
  20 |    * this resilient to naming inconsistencies in SauceDemo's product IDs.
  21 |    * @param {string} productName
  22 |    */
  23 |   productCard(productName) {
  24 |     return this.inventoryList
  25 |       .locator('.inventory_item')
  26 |       .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });
  27 |   }
  28 | 
  29 |   /**
  30 |    * @param {string} productName
  31 |    */
  32 |   async addProductToCart(productName) {
  33 |     const card = this.productCard(productName);
  34 |     await card.getByRole('button', { name: 'Add to cart' }).click();
  35 |   }
  36 | 
  37 |   /**
  38 |    * @param {string} productName
  39 |    */
  40 |   async removeProductFromCart(productName) {
  41 |     const card = this.productCard(productName);
  42 |     await card.getByRole('button', { name: 'Remove' }).click();
  43 |   }
  44 | 
  45 |   /**
  46 |    * Returns the cart badge count as a number, or 0 if the badge isn't shown.
  47 |    */
  48 |   async getCartBadgeCount() {
  49 |     if (await this.cartBadge.count() === 0) return 0;
  50 |     const text = await this.cartBadge.textContent();
  51 |     return Number(text?.trim() ?? 0);
  52 |   }
  53 | 
  54 |   async goToCart() {
  55 |     await this.cartLink.click();
  56 |   }
  57 | 
  58 |   async logout() {
  59 |     await this.menuButton.click();
> 60 |     await this.logoutLink.click();
     |                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  61 |   }
  62 | }
  63 | 
  64 | module.exports = { InventoryPage };
  65 | 
```