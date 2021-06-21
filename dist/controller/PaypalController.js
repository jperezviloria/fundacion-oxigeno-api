"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPayment = exports.executePayment = exports.createPayment = void 0;
const paypal_1 = __importStar(require("../config/paypal"));
const request_1 = __importDefault(require("request"));
const createPayment = (request, response) => {
    const donateRequest = {
        value: request.body.value
    };
    console.log(paypal_1.default);
    console.log(paypal_1.PAYPAL_API);
    const body = {
        intent: "CAPTURE",
        purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: donateRequest.value
                }
            }],
        application_context: {
            brand_name: `Fundacion Oxigeno`,
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `http://72.167.32.219:5000/paypal/execute-payment`,
            cancel_url: `http://72.167.32.219:5000/paypal/cancel-payment`,
        }
    };
    request_1.default.post(`${paypal_1.PAYPAL_API}/v2/checkout/orders`, {
        auth: paypal_1.default,
        body,
        json: true
    }, (err, particularResponse) => {
        response.json({
            data: particularResponse.body
        });
    });
};
exports.createPayment = createPayment;
const executePayment = (request, response) => {
    const token = request.query.token;
    //console.log(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`)
    request_1.default.post(`${paypal_1.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth: paypal_1.default,
        body: {},
        json: true
    }, (err, particularResponse) => {
    });
    response.redirect("http://72.167.32.219:3000/thanks");
};
exports.executePayment = executePayment;
const cancelPayment = (request, response) => {
    response.redirect("http://72.167.32.219:3000");
};
exports.cancelPayment = cancelPayment;
