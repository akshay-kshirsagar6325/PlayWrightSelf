const {test, expect} = require('@playwright/test');
const { describe } = require('node:test');



test('Special locators by playwright', async ({page})=> 
{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByText('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Employed').check();
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', {name : 'Submit'}).click();
    await page.getByText(" The Form has been submitted successfully!. ").isVisible();
    await page.getByRole('link', {name : 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})