export const CLIENT = process.env.FUNDACION_OXIGENO_PAYPAL_CLIENT;
export const SECRET = process.env.FUNDACION_OXIGENO_PAYPAL_SECRET;
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const auth = {
    user: CLIENT,
    pass: SECRET
}


export default auth;
