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
router.route("/getall")
    .get(EventController_1.getAllPrivatesEventsController);
router.route("/get/withstatusfalse")
    .get(EventController_1.getPrivatesEventsWithFalseStateController);
router.route("/update/change-true-status/:id")
    .put(EventController_1.changeStatusEventController);
router.route("/deletebyid/:id")
    .delete(EventController_1.deleteEventControllerById);
router.route("/save/youtubelink")
    .post(EventController_1.saveYoutubeLinkController);
router.route("/get/eventandyoutubelink/:id")
    .get(EventController_1.getAllEventsWithJoinController);
exports.default = router;
