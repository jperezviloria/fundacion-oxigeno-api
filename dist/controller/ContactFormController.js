"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactFormByIdController = exports.changeStatusContactFormController = exports.getContactFormWhenIsFalseController = exports.getAllContactFormController = exports.sendContactFormBySmtp = void 0;
const nodemailer_1 = require("../config/nodemailer");
//import {ContactFormRequest} from "../dto/request/ContactFormRequest";
const ContactFormDatabase_1 = require("../database/ContactFormDatabase");
const moment_1 = __importDefault(require("moment"));
const sendContactFormBySmtp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactForm = {
            name: request.body.name,
            email: request.body.email,
            description: request.body.description,
            country: request.body.country,
            phone: request.body.phone,
            date: moment_1.default().format(),
            enable: false
        };
        const contentHTML = `
    <div style="font-family: 'Lato', sans-serif;">
    <h1>Solicitud de atención desde ${contactForm.country}</h1>
    <h2>Datos personales</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Pais</th>
                <th>description</th>
                <th>fecha</th>

            </tr>
        </thead>
        <tr>
            <td>${contactForm.name}</td>
            <td>${contactForm.email}</td>
	    <td>${contactForm.phone}</td>
            <td>${contactForm.country}</td>
            <td>${contactForm.description}</td>
            <td>${contactForm.date}</td>
        </tr>
    </table>
    </div>
    `;
        console.log(contentHTML);
        yield ContactFormDatabase_1.saveContactForm(contactForm);
        yield nodemailer_1.sendEmail(contentHTML);
        return response.json({
            "status": 200,
            "message": "the email was sended"
        });
    }
    catch (error) {
        console.log(error);
        return response.json({
            "status": 500,
            "message": "error to send email"
        });
    }
});
exports.sendContactFormBySmtp = sendContactFormBySmtp;
const getAllContactFormController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allContactForms = yield ContactFormDatabase_1.getAllContactForm();
    console.log(allContactForms);
    return response.json({ data: allContactForms });
});
exports.getAllContactFormController = getAllContactFormController;
const getContactFormWhenIsFalseController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const contactFormWhenIsFalse = yield ContactFormDatabase_1.getContactFormWhenIdFalse();
    return response.json({ data: contactFormWhenIsFalse });
});
exports.getContactFormWhenIsFalseController = getContactFormWhenIsFalseController;
const changeStatusContactFormController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = yield ContactFormDatabase_1.changeStatusContactForm(parseInt(id));
    return response.json({ data: result });
});
exports.changeStatusContactFormController = changeStatusContactFormController;
const getContactFormByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idRequest = request.params.id;
    if (typeof (idRequest) == typeof (1)) {
        return response.json({ message: "this id isn't a number" });
    }
    const id = parseInt(idRequest);
    const userFinded = yield ContactFormDatabase_1.getContactFormById(id);
    return response.json({ message: userFinded });
});
exports.getContactFormByIdController = getContactFormByIdController;
