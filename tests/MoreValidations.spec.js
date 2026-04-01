const { test,expect }= require('@playwright/test')

test("Popup validations", async({page}) =>{

    //hidden/displayed elements
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com");

    //await page.goBack();

    //await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   // await page.pause();

    //popups
    page.on('dialog', dialog => dialog.accept());

    await page.locator("#confirmbtn").click();

    //hover

    await page.locator("#mousehover").hover();

    //handle frames 

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    
    const  textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

})


test("Screenshot & Visual comparison", async ({page})=>{

        //screenshots!
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#confirmbtn')).toBeVisible();
    await page.locator('#confirmbtn').screenshot({path:'patialScreenshot.png'});
    await page.addLocatorHandler("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});


test.only("visual testing", async ({page})=>{
    await page.goto("https://flightware.com/");

    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});