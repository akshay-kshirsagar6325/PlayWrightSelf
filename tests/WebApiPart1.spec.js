import { test, expect, request } from '@playwright/test';
const {APiUtils1} = require('./utils/APiUtils1').default;
const loginPayload = {userEmail : "akshay.kshirsagar@nextiva.com", userPassword : "Akshay@6325"}
const orderPayLoad = {orders:[{country:"Cuba", productOrderedId:"6581ca979fd99c85e8ee7faf"}]}

let response;
test.beforeAll( async ()=>
{
    
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils1(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Api testing part 1', async ({page})=>
{


    page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);     //key-value pair....key is token and value will be token value
    }, response.token );

    await page.goto('https://rahulshettyacademy.com/client/');
        //Orders placed verification
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator('tbody').waitFor();

        // const rows = await orderList();
         const rows = await page.locator("tbody tr");

         for (let i = 0; i < await rows.count(); ++i) 
            {
            const rowOrderId = await rows.nth(i).locator("th").textContent();

            if (response.orderId.includes(rowOrderId)) 
            {
               await rows.nth(i).locator("button").first().click();
               break;
            }
         }
         const orderIdDetails = await page.locator(".col-text").textContent();
         expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

        //await page.pause();


})