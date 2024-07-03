const {test, expect} = require('@playwright/test');

test('morevalidations', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //await page.pause();

    //Handling the alert pop-ups
    page.on('dialog', dialog => dialog.accept());   //to click on OK button
   // page.on('dialog', dialog => dialog.dismiss()); //to click on Cancel button
    

    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    await page.pause();
    //iframes

    const framespage = page.frameLocator("#courses-iframe");  //use page.frameslocato for iframes
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framespage.locator(".text h2 ").textContent();
    console.log(textcheck.split(" ")[1]);

})