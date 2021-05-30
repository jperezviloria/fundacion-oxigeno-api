"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaypalController_1 = require("../controller/PaypalController");
const router = express_1.Router();
router.route("/create-payment")
    .post(PaypalController_1.createPayment);
router.route("/execute-payment")
    .get(PaypalController_1.executePayment);
exports.default = router;
