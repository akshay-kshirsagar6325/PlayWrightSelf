const {test, expect} = require('@playwright/test');



test('ClientTest', async ({page})=> 
{

    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signInButton = page.locator('[value="Login"]');
    const allElements = page.locator('.card-body b');


    await page.goto('https://rahulshettyacademy.com/client/');
    console.log (await page.title());
    await userName.fill("akshay.kshirsagar@nextiva.com");
    await passWord.fill("Akshay@6325");
    await signInButton.click();
    await page.waitForLoadState('networkidle');
    const allTitles = await allElements.allTextContents();
    console.log(allTitles);

})

test.only('e2e testing', async ({page})=>{

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

        //await page.pause();
    })




        test('table and dropdown testing', async ({page})=>{

            //const tablePrice = page.locator('#product:nth-child(2) tr:nth-child(6) td:nth-child(3)');
            //const tableCity = page.locator('#product:nth-child(1) tr:nth-child(5) td:nth-child(3)');
            // const dropDowns = page.locator('#dropdown-class-example');


            function getTableCellXPath(row, col) {
                return `(//table/tbody)[1]/tr[${row}]/td[${col}]`;   // hardcoded locator (//table/tbody)[1]/tr[2]/td[3]
              }
              const cellXPath = getTableCellXPath(2, 3);
            
            

            page.goto("https://rahulshettyacademy.com/AutomationPractice/");

            const priceValue = await page.locator(cellXPath).textContent();
            const city = tableCity.textContent();
            console.log(priceValue, city);
            
            await page.selectOption('#dropdown-class-example', { index: 2 });

        //    await dropDowns.click();
        //    await page.waitForTimeout(4000);
        //    await page.locator('//option[@value="option2"]').click();


            await page.pause();



    })
