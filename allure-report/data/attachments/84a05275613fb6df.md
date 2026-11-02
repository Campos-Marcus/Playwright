# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> @web Client App checkout using order fixture
- Location: tests\ClientApp.spec.js:47:20

# Error details

```
Test timeout of 15000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 15000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | class CartPage {
  4  |     constructor(page) {
  5  |         //this.countryField = page.locator("[placeholder*='Country']");
  6  |         this.page = page;
  7  |         this.cartProducts = page.locator("div li").first();
  8  |         this.productsText = page.locator(".card-body b");
  9  |         this.cart = page.locator("[routerlink*='cart']");
  10 |         this.orders = page.locator("button[routerlink*='myorders']");
  11 |         this.checkout = page.locator("text=Checkout");
  12 | 
  13 |     }
  14 | 
  15 |     async VerifyProductIsDisplayed(productName) {
  16 | 
> 17 |         await this.cartProducts.waitFor();
     |                                 ^ Error: locator.waitFor: Test timeout of 15000ms exceeded.
  18 |         const bool = await this.getProductLocator(productName).isVisible();
  19 |         expect(bool).toBeTruthy();
  20 | 
  21 |     }
  22 | 
  23 |     async Checkout() {
  24 |         await this.checkout.click();
  25 |     }
  26 | 
  27 |     getProductLocator(productName) {
  28 |         return this.page.locator("h3:has-text('" + productName + "')");
  29 |     }
  30 | 
  31 |     async TypeCountry() {
  32 |         this.countryField.pressSequentially("ind", { delay: 150 });
  33 |     }
  34 | }
  35 | 
  36 | module.exports = { CartPage };
```