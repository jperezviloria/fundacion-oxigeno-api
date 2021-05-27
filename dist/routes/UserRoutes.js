"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.Router();
router.route("/update/nameandsurname")
    .put(UserController_1.updateNameAndSurnameById);
router.route("/update/upload-image/:id")
    .post(multer_1.default.single('image'), UserController_1.uploadPhotosById);
exports.default = router;
