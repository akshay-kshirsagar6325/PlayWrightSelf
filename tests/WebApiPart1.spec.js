const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail : "akshay.kshirsagar@nextiva.com", userPassword : "Akshay@6325"}
let token;

test.beforeAll( async ()=>
{

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload

    })

    expect(loginResponse.ok()).toBeTruthy();  //we are using OK for the sucessfull response like 200, 201, 204
    const loginResponseJason = await loginResponse.json();
    const token = loginResponseJason.token;
    console.log(token);

});

test('Api testing', async ()=>{

    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signInButton = page.locator('[value="Login"]');
    const products = page.locator('.card-body');
    const productName = ('ADIDAS ORIGINAL');
    const cart = page.locator('[routerlink="/dashboard/cart"]');
    const checkOut = page.locator("button[type='button']"); //or page.locator('text=Checkout')
    const dropDown = page.locator('.ta-results');
    const emailVerification = page.locator(".user__name [type='text']"); // parent to child locator "class [attribute='value']"
    const email = ('akshay.kshirsagar@nextiva.com');
    const placeOrderBtn = page.locator('.action__submit');
    const thankYouMsg = page.locator('.hero-primary');
    const orderId = page.locator('.em-spacer-1 .ng-star-inserted') //parent to child locator '.class .class'
    //const orderList = page.locator('tbody tr') // or('tr.ng-star-inserted'); //


    page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill(email);
    await passWord.fill("Akshay@6325");
    await signInButton.click();
    await page.waitForLoadState('networkidle');
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

    // placing the order after checkout page

    await page.locator("[placeholder*='Country']").pressSequentially('ind');
    await dropDown.waitFor();                                                // displayed results list
    const dropDownOptions = await dropDown.locator("button").count();

    for(let i=0; i < dropDownOptions; ++i)
        {
            const text = await dropDown.locator("button").nth(i).textContent();
            if(text === ' India')

                {
                    await dropDown.locator("button").nth(i).click();
                    break;
                }
        }

        await page.locator('.field .txt').nth(1).fill('999');
        await page.locator('.field .txt').nth(2).fill('Akshay Prabhakar Kshirsagar');
        await page.locator('.small .input').nth(0).click();

        await expect(emailVerification.first()).toHaveText(email); //when there are more than 1 matching element then use nth()
        await placeOrderBtn.click();
        await expect(thankYouMsg).toHaveText(' Thankyou for the order. ');
        const orderIds = await orderId.textContent();
        console.log(orderIds);

        //Orders placed verification

        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        await page.locator('tbody').waitFor();

        //await page.locator('button.btn').nth(4).click();

        // const rows = await orderList();
         const rows = page.locator("tbody tr");
 
 
         for (let i = 0; i < await rows.count(); ++i) 
            {
            const rowOrderId = await rows.nth(i).locator("th").textContent();

            if (orderIds.includes(rowOrderId)) 
            {
               await rows.nth(i).locator("button").first().click();
               break;
            }
         }
         const orderIdDetails = await page.locator(".col-text").textContent();
         expect(orderIds.includes(orderIdDetails)).toBeTruthy();

        await page.pause();


})