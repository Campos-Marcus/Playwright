const { test, expect } = require('@playwright/test');

const { POManager } = require('../PageObjects/POManager');


test.only('Browser context Playwright test', async ({ page }) => {

    const poManager = new POManager(page);

    const email = "anshika@gmail.com";
    const password = "Iamking@000";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();


    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();

    console.log(orderId)

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

