const {test, expect} = require('@playwright/test');


test('Calendar testing', async ({page})=>
{
    const monthNumber = "6";
    const monthDate = "June 15, 2027";
    const year = "2027";
    const expectedList = [monthNumber, monthDate, year]; //all the values are in the array

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div[class='react-date-picker__inputGroup']").click();
    await page.locator("button[style='flex-grow: 1;']").click();
    await page.locator("button[style='flex-grow: 1;']").click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber-1)).click();
    await page.locator("[aria-label='"+monthDate+"']").click();
    const inputs = await page.locator('.react-date-picker__inputGroup input'); // "class value <space> common tagname(input)" 
    
    for (let index=0; index < inputs; index++) 
        {
            const value = inputs[index].getAttribute("value"); //one element out of four is hidden element so playwright will skip it
            expect(value).toEqual(expectedList[index]);
        }


})