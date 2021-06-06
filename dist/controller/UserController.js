"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailController = exports.deleteUserByIdController = exports.changeEnableUserById = exports.getAllUsersEnableWithImageController = exports.getAllUsersController = exports.uploadPhotosById = exports.updateNameAndSurnameById = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
//import {uploadImage} from "../helper/UploadImageCloudinary"
const UserDatabase_1 = require("../database/UserDatabase");
const updateNameAndSurnameById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var user = {
        name: request.body.name,
        surname: request.body.surname,
        idUser: request.body.idUser
    };
    console.log(request.body);
    console.log(user);
    if (!user.idUser || !user.surname || !user.name) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
        });
    }
    const userUpdated = yield UserDatabase_1.updateNameAndSurnameUserById(user);
    return response.json({
        "status": 200,
        "data": userUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.updateNameAndSurnameById = updateNameAndSurnameById;
const uploadPhotosById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log(request.file);
    const result = yield cloudinary_1.default.uploader.upload(request.file.path);
    const particularUser = yield UserDatabase_1.getUserById(parseInt(id));
    console.log(particularUser);
    if (particularUser.urlimage != null) {
        yield deletePhotoByIdWhenIWillUpdate(parseInt(id));
    }
    //await deletePhotoByIdWhenIWillUpdate(parseInt(id));
    console.log(result);
    const profile = {
        id: parseInt(id),
        urlimage: result.url,
        publicid: result.public_id
    };
    //await deletePhotoByIdWhenIWillUpdate(profile.id);
    const updatedProfile = yield UserDatabase_1.uploadImageInformationProfileById(profile);
    yield fs_extra_1.default.unlink(request.file.path);
    return response.json({
        usernameUpdated: updatedProfile,
        status: 200
    });
});
exports.uploadPhotosById = uploadPhotosById;
const deletePhotoByIdWhenIWillUpdate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const photoIdFromDatabase = yield UserDatabase_1.getPhotoIdByIdUser(id);
    yield cloudinary_1.default.uploader.destroy(photoIdFromDatabase.rows[0].publicid);
});
const getAllUsersController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield UserDatabase_1.getAllUsers();
    return response.json({ data: allUsers });
});
exports.getAllUsersController = getAllUsersController;
const checkThatHaveImage = (user) => {
    if (user.urlimage && user.enable) {
        return user;
    }
};
const getAllUsersEnableWithImageController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield UserDatabase_1.getAllUsers();
    const usersFiltered = allUsers.filter(checkThatHaveImage);
    //console.log(usersFiltered)
    return response.json({ data: usersFiltered });
});
exports.getAllUsersEnableWithImageController = getAllUsersEnableWithImageController;
const changeEnableUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userToChangeEnable = {
        idUser: request.body.id,
        enable: request.body.enable
    };
    const userChanged = yield UserDatabase_1.updateEnableUserById(userToChangeEnable);
    return response.json({
        data: userChanged
    });
});
exports.changeEnableUserById = changeEnableUserById;
const deleteUserByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idRequest = request.params.id;
    if (typeof (idRequest) == typeof (1)) {
        return response.json({ message: "this id isn't a number" });
    }
    const id = parseInt(idRequest);
    const userDeleted = yield UserDatabase_1.deleteUserById(id);
    return response.json({ message: userDeleted });
});
exports.deleteUserByIdController = deleteUserByIdController;
const getUserByEmailController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRequest = request.params.email;
    const userSelected = yield UserDatabase_1.getUserByEmail(emailRequest);
    return response.json({
        data: userSelected
    });
});
exports.getUserByEmailController = getUserByEmailController;
