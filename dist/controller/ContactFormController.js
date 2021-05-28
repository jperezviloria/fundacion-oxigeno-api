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
exports.sendContactFormBySmtp = void 0;
//import {} from "../database/ContactFormDatabase"
const sendContactFormBySmtp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, description, country, date, phone } = request.body;
        const contentHTML = `
    <div style="font-family: 'Lato', sans-serif;">
    <h1>Solicitud de atención desde ${country}</h1>
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
            <td>${name}</td>
            <td>${email}</td>
	    <td>${phone}</td>
            <td>${country}</td>
            <td>${description}</td>
            <td>${date}</td>
        </tr>
    </table>
    </div>
    `;
        console.log(contentHTML);
        return response.json(request.body);
    }
    catch (error) { }
});
exports.sendContactFormBySmtp = sendContactFormBySmtp;
