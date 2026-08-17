const { test, expect } = require('@playwright/test');

test('Browser context Playwright test', async ({ browser }) => {

  const context = await browser.newContext();   // you get a browser instance
  const page = await context.newPage();         // create a page inside that context

  //How to abort the network calls with playwright - examples
  //block images from being loaded, so it doesn't impact so much in automation (maybe its not relevant for some cases.)
  //page.route('**/*.{jpg,png,jpeg}', route => route.abort());

  const userName = page.locator('#username');

  const signIn = page.locator("#signInBtn");

  const cardTitles = page.locator(".card-body a")

  //to listen to event calls
  //page.on('request', request =>console.log( request.url()));
  //page.on('request', response =>console.log( response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //change the credentials, to make ti fail (that was the inicial assertion)
  await page.locator('#username').fill('rahulshettyacademy');

  await page.locator("[type='password']").fill("Learning@830$3mK2");
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

test.only('Page playwright test', async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log(await page.title());


  await expect(page).toHaveTitle('Google')

});

