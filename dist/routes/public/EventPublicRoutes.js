"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController_1 = require("../../controller/EventController");
const router = express_1.Router();
router.route("/get/events-with-youtubelinks")
    .get(EventController_1.getAllEventsWithYoutubeLinksPublicController);
exports.default = router;
