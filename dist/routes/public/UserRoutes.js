"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controller/UserController");
const router = express_1.Router();
router.route("/update/nameandsurname")
    .put(UserController_1.updateNameAndSurnameById);
router.route("/getall")
    .get(UserController_1.getAllUsersEnableWithImageController);
exports.default = router;
