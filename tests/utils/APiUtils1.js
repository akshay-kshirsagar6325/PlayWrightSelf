class APiUtils1
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
        
            })
        
           //expect(loginResponse.ok()).toBeTruthy();  //we are using OK for the sucessfull response like 200, 201, 204
            const loginResponseJason = await loginResponse.json();
            const token = loginResponseJason.token;
            console.log(token);
            return token;
    }

    async createOrder(orderPayLoad)
    {
        
        let response = {};
        response.token = await this.getToken();

            //Myorders response capture
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            
        {
            data : orderPayLoad,
            headers : 
            {
                'Authorization' : response.token,
                'Content-Type' : 'application/json'
            },

        })
        

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    

    }
}

export default {APiUtils1};