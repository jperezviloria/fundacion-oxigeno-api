import {Request, Response} from "express"
import auth, {PAYPAL_API} from "../config/paypal"
import requestHandle from "request"

export const createPayment = (request: Request, response: Response) =>{

    const donateRequest = {
      value: request.body.value
    }


    console.log(auth)
    console.log(PAYPAL_API)
    const body = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "USD",
                value: donateRequest.value
            }
        }],
        application_context:{
            brand_name:`Fundacion Oxigeno`,
            landing_page:'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `http://72.167.32.219:5000/paypal/execute-payment`,
            cancel_url: `http://72.167.32.219:5000/paypal/cancel-payment`,
        }
    }

    requestHandle.post(`${PAYPAL_API}/v2/checkout/orders`,{
        auth,
        body,
        json: true
    }, (err, particularResponse) =>{
        response.json({
            data: particularResponse.body
        })
    })
    
}

export const executePayment = (request: Request, response: Response) =>{

    const token = request.query.token;
    //console.log(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`)
    requestHandle.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, particularResponse) =>{

    })
    response.redirect("http://72.167.32.219:3000/thanks")

}

export const cancelPayment = (request: Request, response: Response) =>{
    response.redirect("http://72.167.32.219:3000")
}
