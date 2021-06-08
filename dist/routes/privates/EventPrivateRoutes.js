"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../../config/multer"));
const EventController_1 = require("../../controller/EventController");
const router = express_1.Router();
router.route("/save/title-description")
    .post(EventController_1.saveTitleDescriptionAndDateEventController);
router.route("/update/upload-image/:id")
    .put(multer_1.default.single('image'), EventController_1.uploadPhotosByIdEvent);
exports.default = router;
