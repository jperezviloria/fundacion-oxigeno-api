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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNameSurnameAndLinkById = exports.uploadPhotosById = exports.saveSocialMediaController = void 0;
const UploadImageCloudinary_1 = require("../helper/cloudinary/UploadImageCloudinary");
const DeleteImageCloudinary_1 = require("../helper/cloudinary/DeleteImageCloudinary");
const DeleteFilePath_1 = require("../helper/fs-extra/DeleteFilePath");
const SocialMediaDatabase_1 = require("../database/SocialMediaDatabase");
const saveSocialMediaController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var socialMedia = {
        name: request.body.name,
        username: request.body.username,
        urlProfile: request.body.urlprofile
    };
    console.log(request.body);
    console.log(socialMedia);
    if (!socialMedia.name || !socialMedia.username || !socialMedia.urlProfile) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
        });
    }
    const socialMediaUpdated = yield SocialMediaDatabase_1.saveSocialMedia(socialMedia);
    return response.json({
        "status": 200,
        "data": socialMediaUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.saveSocialMediaController = saveSocialMediaController;
const uploadPhotosById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log(request.file);
    const publicIdToDelete = yield SocialMediaDatabase_1.getPhotoIdByIdSocialMedia(parseInt(id));
    yield DeleteImageCloudinary_1.deletePhotoByPublicIdOnCloudinary(publicIdToDelete.rows[0].publicid);
    const imageUploaded = yield UploadImageCloudinary_1.uploadImage(request.file.path);
    const socialMedia = {
        id: parseInt(id),
        urlimage: imageUploaded.url,
        publicid: imageUploaded.public_id
    };
    const updatedProfile = yield SocialMediaDatabase_1.updateSocialMediaToUploadImage(socialMedia);
    //await fs.unlink(request.file.path)
    yield DeleteFilePath_1.deleteFilePath(request.file.path);
    return response.json({
        usernameUpdated: updatedProfile,
        status: 200
    });
});
exports.uploadPhotosById = uploadPhotosById;
const updateNameSurnameAndLinkById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var user = {
        name: request.body.name,
        username: request.body.username,
        id: request.body.id,
        urlProfile: request.body.urlProfile
    };
    console.log(request.body);
    console.log(user);
    if (!user.id || !user.username || !user.name || !user.urlProfile) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
        });
    }
    const userUpdated = yield SocialMediaDatabase_1.updateSocialMediaToNameUsernameAndLink(user);
    return response.json({
        "status": 200,
        "data": userUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.updateNameSurnameAndLinkById = updateNameSurnameAndLinkById;
