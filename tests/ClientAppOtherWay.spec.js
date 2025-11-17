const { test, expect } = require('@playwright/test');
 

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();


   await page.pause();

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

