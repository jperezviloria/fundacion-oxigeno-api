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
exports.updateNameAndSurnameById = void 0;
const UserDatabase_1 = require("../database/UserDatabase");
const updateNameAndSurnameById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var user = {
        name: request.body.name,
        surname: request.body.surname,
        idUser: request.body.idUser
    };
    console.log(request.body);
    console.log(user);
    if (!user.idUser || !user.surname || !user.name) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
        });
    }
    const userUpdated = yield UserDatabase_1.updateNameAndSurnameUserById(user);
    return response.json({
        "status": 200,
        "data": userUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.updateNameAndSurnameById = updateNameAndSurnameById;
