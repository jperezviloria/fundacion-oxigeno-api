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
const passport_jwt_1 = require("passport-jwt");
//import configJwt from "./jwtSecretKey"
const UserDatabase_1 = require("../database/UserDatabase");
var opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'somesecrettoken'
};
exports.default = new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserDatabase_1.getUserById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        console.log(error);
    }
}));
