const { test, expect } = require('@playwright/test');
test.only('Playwright Special locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");



    //getbyplaceholder

    await page.getByPlaceholder("Password").fill("abc123");

    //case, there are many buttons, want exactly the one who has submit
    await page.getByRole("button", {name: 'Submit'}).click();

    await page.getByText("Success! The form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name : "Shop"}).click();

    //this basically replaces that loop over a list of elements to find what you need
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})