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
exports.saveNewUser = exports.signIn = exports.signUp = exports.createToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecretKey_1 = __importDefault(require("../config/jwtSecretKey"));
const UserDatabase_1 = require("../database/UserDatabase");
const MESSAGE_SEND_COMPLETE_INFO = "Please. Send email, password, level and rol";
const MESSAGE_USER_EXIST = "The User already exist";
const MESSAGE_USER_DONT_EXIST = "The User doesn`t exist";
const MESSAGE_USER_SAVED = "The User was saved successfully";
const MESSAGE_CREATED_TOKEN = "Token created";
const MESSAGE_EMAIL_OR_PASSWORD_WRONG = "The Email or Password are wrong";
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.idUser,
        email: user.emailUser
    }, jwtSecretKey_1.default.jwtSecret, {
        expiresIn: 86400
    });
};
exports.createToken = createToken;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var user = {
        emailUser: req.body.emailUser,
        passwordUser: req.body.passwordUser,
        idRol: req.body.idRol,
        enable: true
    };
    if (!user.emailUser || !user.passwordUser || !user.idRol) {
        return res.json({
            "status": 400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        });
    }
    const existConsult = yield existUserByEmail(res, user.emailUser);
    if (existConsult) {
        return res.json({
            "status": 400,
            "message": MESSAGE_USER_EXIST
        });
    }
    yield exports.saveNewUser(res, user);
    return res.json({
        "status": 201,
        "data": user,
        "message": MESSAGE_USER_SAVED
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    if (!user.email || !user.password) {
        return res.json({
            "status": 400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        });
    }
    const existConsult = yield existUserByEmail(res, user.email);
    if (!existConsult) {
        return res.json({
            "status": 400,
            "message": MESSAGE_USER_DONT_EXIST
        });
    }
    const passwordUserByEmail = yield UserDatabase_1.getPasswordUserByEmail(user.email);
    console.log(JSON.stringify(passwordUserByEmail));
    console.log(JSON.stringify(user.password));
    const isMatch = yield comparePassword(user.password, passwordUserByEmail);
    const userToAuthenticate = yield UserDatabase_1.getUserByEmail(user.email);
    console.log(isMatch);
    if (isMatch) {
        return res.json({
            "status": 200,
            "message": MESSAGE_CREATED_TOKEN,
            "token": exports.createToken(userToAuthenticate),
            "user": userToAuthenticate
        });
    }
    return res.json({
        "status": 400,
        "message": MESSAGE_EMAIL_OR_PASSWORD_WRONG
    });
});
exports.signIn = signIn;
const saveNewUser = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        const passwordEncripted = yield encryptPassword(user);
        yield UserDatabase_1.saveUser(user, passwordEncripted);
    }
    catch (error) {
        return res.json({
            "status": 400,
            "message": MESSAGE_USER_EXIST
        });
    }
});
exports.saveNewUser = saveNewUser;
const existUserByEmail = (res, externalEmail) => __awaiter(void 0, void 0, void 0, function* () {
    var emailFound = yield UserDatabase_1.getEmailUserByEmail(externalEmail);
    if (JSON.stringify(emailFound) == JSON.stringify(externalEmail)) {
        return true;
    }
    else {
        return false;
    }
});
const encryptPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(user.passwordUser, salt);
    return hash;
});
const comparePassword = (externalPassword, passwordFound) => __awaiter(void 0, void 0, void 0, function* () {
    const comparingPassword = yield bcrypt_1.default.compare(externalPassword, passwordFound);
    console.log("aqui");
    console.log(comparingPassword);
    return comparingPassword;
});
