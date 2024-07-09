const {test, expect} = require('@playwright/test');
let webContext;

// skipping the login for all test cases by login and storing the data once

test.beforeAll(async ({browser})=>{



    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const email = ('akshay.kshirsagar@nextiva.com');
    const signInButton = page.locator('[value="Login"]');

    await page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill(email);
    await passWord.fill("Akshay@6325");
    await signInButton.click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

})


test('API part2 testing', async ()=>{

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    const products = page.locator('.card-body');
    const productName = ('ADIDAS ORIGINAL');
    const cart = page.locator('[routerlink="/dashboard/cart"]');
    const checkOut = page.locator("button[type='button']"); //or page.locator('text=Checkout')
    // const dropDown = page.locator('.ta-results');
    // const emailVerification = page.locator(".user__name [type='text']"); // parent to child locator "class [attribute='value']"
    
    // const placeOrderBtn = page.locator('.action__submit');
    // const thankYouMsg = page.locator('.hero-primary');
    // const orderId = page.locator('.em-spacer-1 .ng-star-inserted'); 

    

    //parent to child locator '.class .class'
    //const orderList = page.locator('tbody tr') // or('tr.ng-star-inserted'); //


   
    const count = await products.count();
    

    //for loop to identify the desire product
    for (let i=0; i < count; ++i)
    {

        if (await products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
    }

    await cart.click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();   //new locator style
    expect(bool).toBeTruthy();
    await checkOut.nth(1).click();
})