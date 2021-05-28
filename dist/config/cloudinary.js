"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
dotenv_1.config();
cloudinary_1.v2.config({
    cloud_name: process.env.FUNDACION_OXIGENO_CLOUD_NAME_CLOUDINARY,
    api_key: process.env.FUNDACION_OXIGENO_API_KEY_CLOUDINARY,
    api_secret: process.env.FUNDACION_OXIGENO_API_SECRET_CLOUDINARY
});
exports.default = cloudinary_1.v2;
