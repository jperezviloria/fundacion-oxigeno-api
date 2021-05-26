"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controller/UserController");
const router = express_1.Router();
router.route("/update/nameandsurname")
    .put(UserController_1.updateNameAndSurnameById);
exports.default = router;
