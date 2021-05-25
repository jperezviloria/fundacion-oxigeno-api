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
exports.saveUser = exports.getPasswordUserByEmail = exports.getEmailUserByEmail = exports.getUsersByLevel = exports.getUserByEmail = exports.getUserById = exports.getUserFiltered = exports.getAllUsers = void 0;
const database_1 = require("../config/database");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield database_1.pool.query(`SELECT * FROM Users`);
    return allUsers;
});
exports.getAllUsers = getAllUsers;
const getUserFiltered = (email, level, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const usersFiltered = yield database_1.pool.query(`EXEC GetFilteredUser @emailUser = ${email},@levelUser = ${level},@rol = ${rol}`);
    console.log(usersFiltered);
    return usersFiltered;
});
exports.getUserFiltered = getUserFiltered;
const getUserById = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.pool.query(`SELECT * FROM Users WHERE id = ${idUser}`);
    return query;
});
exports.getUserById = getUserById;
const getUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.pool.query(`SELECT * FROM Users WHERE email = '${emailUser}'`);
    return query.rows[0];
});
exports.getUserByEmail = getUserByEmail;
const getUsersByLevel = (idLevel) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.pool.query(`SELECT * FROM Users WHERE level = ${idLevel}`);
    return query;
});
exports.getUsersByLevel = getUsersByLevel;
const getEmailUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`SELECT email FROM Users WHERE email = '${emailUser}'`);
        return query.rows[0].email;
    }
    catch (error) {
        return "";
    }
});
exports.getEmailUserByEmail = getEmailUserByEmail;
const getPasswordUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`SELECT password FROM Users WHERE email = '${emailUser}'`);
        return query.rows[0].password;
    }
    catch (error) {
        return "";
    }
});
exports.getPasswordUserByEmail = getPasswordUserByEmail;
const saveUser = (user, passwordEncripted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        const newUser = yield database_1.pool.query(`INSERT INTO Users (email, password, idrol, enable) VALUES ( 
													 '${user.emailUser}', 
													 '${passwordEncripted}',
													 ${user.idRol},
													 ${user.enable});`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveUser = saveUser;
