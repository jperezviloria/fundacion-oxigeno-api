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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusContactForm = exports.getContactFormWhenIdFalse = exports.getAllContactForm = exports.saveContactForm = void 0;
const database_1 = require("../config/database");
const saveContactForm = (contactForm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield database_1.pool.query(`INSERT INTO contactform (name, email, phone, description, country, dates, enable) VALUES ('${contactForm.name}', '${contactForm.email}','${contactForm.phone}','${contactForm.description}','${contactForm.country}', '${contactForm.date}', ${contactForm.enable});`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveContactForm = saveContactForm;
const getAllContactForm = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM ContactForm ORDER BY dates DESC `);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllContactForm = getAllContactForm;
const getContactFormWhenIdFalse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM ContactForm WHERE enable = false ORDER BY dates DESC `);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getContactFormWhenIdFalse = getContactFormWhenIdFalse;
const changeStatusContactForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`UPDATE ContactForm SET enable = true WHERE id = ${id}`);
        return "changed";
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeStatusContactForm = changeStatusContactForm;
