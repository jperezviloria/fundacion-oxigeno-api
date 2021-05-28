"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SocialMedia_1 = require("../controller/SocialMedia");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.Router();
router.route("/save")
    .post(SocialMedia_1.saveSocialMediaController);
router.route("/update/principalinformation")
    .put(SocialMedia_1.updateNameSurnameAndLinkById);
router.route("/update/upload-image/:id")
    .post(multer_1.default.single('image'), SocialMedia_1.uploadPhotosById);
exports.default = router;
