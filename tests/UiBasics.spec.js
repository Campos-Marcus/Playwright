const { test, expect } = require('@playwright/test');

test.only('Browser context Playwright test', async ({ browser }) => {

  const context = await browser.newContext();   // you get a browser instance
  const page = await context.newPage();         // create a page inside that context

  const userName = page.locator('#username');

  const signIn = page.locator("#signInBtn");

  const cardTitles = page.locator(".card-body a")

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator('#username').fill('rahulshetty');
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();

  console.log(await page.locator("[style*='block']").textContent());

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();

  //console.log(await cardTitles.first().textContent());

  //console.log(await cardTitles.nth(1).textContent());

  const allTitles = await cardTitles.allTextContents();

  console.log(allTitles)
});

test('Page playwright test', async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log (await page.title);


  await expect(page).toHaveTitle('Google')

});

