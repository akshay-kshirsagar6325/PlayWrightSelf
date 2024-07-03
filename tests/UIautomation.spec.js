const {test, expect} = require('@playwright/test');
const { domainToASCII } = require('url');



test('FirstTC', async ({browser})=> {

    // browser as a fixture i.e. global variable

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signInButton =  page.locator("#signInBtn");
    const cardBody =  page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log (await page.title());
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await signInButton.click();

    //Below highlighted code is when we enter the wrong login details:
    // console.log(await page.locator('[style*="block"]').textContent());
    // await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    console.log(await cardBody.first().textContent());
    console.log(await cardBody.nth(1).textContent());

    const allTitles = await cardBody.allTextContents();
    console.log(allTitles);

})

test('Control elements', async ({page})=> {

    // page as a fixture 

    const radioBtn = page.locator('.radiotextsty');
    const okBtn = page.locator('#okayBtn');
    const dropDown = page.locator('select.form-control');
    const checkBox = page.locator('#terms');
    const docLink = page.locator("[href*=documents-request]");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Radio button
    await radioBtn.last().click(); //or radioBtn.nth(2).click();
    await okBtn.click();
    await expect(radioBtn.last()).toBeChecked();

    //Dropdown
    await dropDown.selectOption("consult");
    expect(dropDown).toContainText("Consultant");

    //checkbox
    await checkBox.click();
    console.log(await checkBox.isChecked());
    await checkBox.uncheck();
    expect (await checkBox.isChecked()).toBeFalsy();

    //blinking text & new tab or child windows
    await expect(docLink).toHaveAttribute("class", "blinkingText");

    await page.pause();

})

test('Child browser window', async ({browser})=>{

    const context  = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const docLink = page.locator("[href*=documents-request]");
    

    page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //if 2 pages are opening then const [page2, page3]
    
    const [page2] = await Promise.all([     

        context.waitForEvent('page'),
        docLink.click()
          
    ])

    const textColor = page2.locator("p.red");
    const textContets = await textColor.textContent();
    const splitText = textContets.split("@") [1]
    const domain = splitText.split(" ") [0]
    console.log(domain);

    await userName.fill(domain);
    await page.pause();
    console.log(await userName.textContent());


})

test('Fcebooktest', async ({browser})=> {

    // browser as a fixture i.e. global variable

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.facebook.com/');
    console.log (await page.title());
    await page.locator('#email').fill("akshay");
    await page.locator('#passContainer').fill("Password");
    await page.locator('[data-testid="royal_login_button"]').click();

})

