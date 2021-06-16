"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.pool = new pg_1.Pool({
    user: process.env.FUNDACION_OXIGENO_DATABASE_USERNAME,
    host: process.env.FUNDACION_OXIGENO_DATABASE_HOST,
    password: process.env.FUNDACION_OXIGENO_DATABASE_PASSWORD,
    database: process.env.FUNDACION_OXIGENO_DATABASE_NAME,
    port: 5432
});
