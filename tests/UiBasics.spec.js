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

  await page.locator("[type='password']").fill("Learning@830$3mK2d");
  await page.locator("#signInBtn").click();

  console.log(await page.locator("[style*='block']").textContent());

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await page.locator("[type='password']").fill("Learning@830$3mK2");
  await signIn.click();

  console.log(await cardTitles.first().textContent());

  //console.log(await cardTitles.nth(1).textContent());

  const allTitles = await cardTitles.allTextContents();

  console.log(allTitles)
});

test('Page playwright test', async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log(await page.title());


  await expect(page).toHaveTitle('Google')

});

test('latest test', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  //await page.pause();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");


});


test('Child window handling', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([   //these guarantuee the next steps will happen in paralel
    context.waitForEvent('page'),  //listen for any new page  pending, rejected, fulfilled 
    documentLink.click(),//new page is opened

  ])

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@")
  const domain = arrayText[1].split(" ")[0]
  console.log(domain)

  await page.locator("#username").fill(domain);

  // await page.pause();

  console.log(await page.locator("#username").inputValue());

})


test.only('Child window handlingf', async ({ page }) => {

  const email = "marcustestt@testt.com";
  const password = "Test123456*"
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type(password);
  await page.locator("[value='Login']").click();

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);

  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();

      //await page.locator(".card-body").nth(0).locator("text= Add to Cart").click();
      break
    }
  }

  await page.locator("[routerlink*='cart']").click()

  await page.locator("div li").first().waitFor();
  //playwright doesn't automatically await the isvisible(), check the table, so we have to "force" this wait

  const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click()
  await page.locator("[placeholder*='Country']").pressSequentially("bra", { delay: 150 });


  const creditCardField = page.locator('.field').filter({
    hasText: 'Credit Card Number'
  });

  await creditCardField.locator('input').fill('142598745589');

  const expiryMonthDropdown = page.locator("select").nth(0);
  const expiryYearDropdown = page.locator("select").nth(1);

  await expiryMonthDropdown.selectOption("05");
  await expiryYearDropdown.selectOption("20");

  const cvvCode = page.locator("input[class='input txt']").first();

  await cvvCode.fill("123");

  const nameOnCard = page.locator("input[class='input txt']").last();

  await nameOnCard.fill("Campos")

  const dropdown = page.locator(".ta-results");

  await dropdown.waitFor();

  const optionscount = await dropdown.locator("button").count();


  for (let i = 0; i < count; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " Brazil") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click()

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);
})
