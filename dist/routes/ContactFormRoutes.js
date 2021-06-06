"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactFormController_1 = require("../controller/ContactFormController");
const router = express_1.Router();
router.route("/getall")
    .get(ContactFormController_1.getAllContactFormController);
router.route("/getunchecked")
    .get(ContactFormController_1.getContactFormWhenIsFalseController);
router.route("/change-status/:id")
    .put(ContactFormController_1.changeStatusContactFormController);
router.route("/smtp/send")
    .post(ContactFormController_1.sendContactFormBySmtp);
router.route("/getbyid/:id")
    .get(ContactFormController_1.getContactFormByIdController);
exports.default = router;
