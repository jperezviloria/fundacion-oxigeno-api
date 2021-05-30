"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYPAL_API = exports.SECRET = exports.CLIENT = void 0;
exports.CLIENT = process.env.FUNDACION_OXIGENO_PAYPAL_CLIENT;
exports.SECRET = process.env.FUNDACION_OXIGENO_PAYPAL_SECRET;
exports.PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const auth = {
    user: exports.CLIENT,
    pass: exports.SECRET
};
exports.default = auth;
