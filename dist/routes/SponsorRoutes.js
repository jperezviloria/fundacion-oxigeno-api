"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const SponsorController_1 = require("../controller/SponsorController");
const router = express_1.Router();
router.route("/getall")
    .get(SponsorController_1.getAllSponsorController);
router.route("/save")
    .post(SponsorController_1.saveSponsorController);
router.route("/update/upload-image/:id")
    .put(multer_1.default.single('image'), SponsorController_1.uploadSponsorPhotosById);
router.route("/update/name-and-contacts")
    .put(SponsorController_1.updateNameAndContactsSponsorController);
exports.default = router;
