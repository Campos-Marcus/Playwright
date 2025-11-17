const { test, expect } = require('@playwright/test');


test.beforeAll(async({browser})=>{

    const context =await browser.newContext();
    const page = context.newPage();

    const email = "anshika@gmail.com";
    const productName = 'Fav Gucci';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
})

test.only('Browser context Playwright test', async ({ page }) => {


    await page.locator(".card-body b").first().waitFor();

    //await page.waitForLoadState('networkidle');
    // await page.locator(".card-body b").first();waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


    const count = await products.count();

    for (let i = 0; i< count;i++){
        if (await products.nth(i).locator("b").textContent() == productName){
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='car']").click();

    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy;

    await page.locator("text=Checkout").click()
    //add card information

    //select country in the dropdown

    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});
    
    const dropdown = page.locator(".ta-results");
    
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i< optionsCount; i++){
         const text = await dropdown.locator("button").nth(i).textContent();
         if(text === " India"){
            //or text.includes("India")
            
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator('div:has-text("Name on Card") + input').fill("John Doe");

    await page.locator('div:has-text("CVV Code ?") + input').fill("123");
    'th+'

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator("a[class='btnn action__submit ng-star-inserted']").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //to get content from a locator..
    const orderId =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const table = page.locator("tbody tr");

    const elements = await table.count();

    //TODO, iterate the table to find the orderId

    for (let i = 0; i< elements; i++){
        const currentTableOrderId = await table.nth(i).locator("th").textContent();
        if(orderId.includes(currentTableOrderId)){
            //click the view button in this row, cause' it's the only one that'll be visible 
            await table.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();


});

