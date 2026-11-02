const { When, Given, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');

setDefaultTimeout(100 * 1000);

After(async function () {
    if (this.browser) await this.browser.close();
});

Given('a login to Ecommer ce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {


    this.browser = await playwright.chromium.launch();

    const context = await this.browser.newContext();

    const page = await context.newPage();

    //world constructor
    this.poManager = new POManager(page);

    const products = page.locator(".card-body");

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);

    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
});

Then('Verify order is present in the Orderhistory', async function () {
    await this.dashboardPage.navigateToOrders();

    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});  
