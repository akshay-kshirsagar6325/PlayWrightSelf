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


})