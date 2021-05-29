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
exports.updateNameAndContactsSponsorController = exports.uploadSponsorPhotosById = exports.getAllSponsorController = exports.saveSponsorController = void 0;
const SponsorDatabase_1 = require("../database/SponsorDatabase");
const DeleteImageCloudinary_1 = require("../helper/cloudinary/DeleteImageCloudinary");
const UploadImageCloudinary_1 = require("../helper/cloudinary/UploadImageCloudinary");
const DeleteFilePath_1 = require("../helper/fs-extra/DeleteFilePath");
const saveSponsorController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var sponsor = {
        name: request.body.name,
        web: request.body.web,
        email: request.body.email,
        facebook: request.body.facebook,
        instagram: request.body.instagram,
        youtube: request.body.youtube,
        twitter: request.body.twitter
    };
    if (!sponsor.name) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A NAME"
        });
    }
    const sponsorUpdated = yield SponsorDatabase_1.saveSponsorDatabase(sponsor);
    return response.json({
        "status": 200,
        "data": sponsorUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.saveSponsorController = saveSponsorController;
const getAllSponsorController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allSponsor = yield SponsorDatabase_1.getAllSponsorDatabase();
    return response.json({
        data: allSponsor
    });
});
exports.getAllSponsorController = getAllSponsorController;
const uploadSponsorPhotosById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log(request.file);
    const publicIdToDelete = yield SponsorDatabase_1.getPhotoIdByIdSponsorDatabase(parseInt(id));
    console.log(publicIdToDelete);
    yield DeleteImageCloudinary_1.deletePhotoByPublicIdOnCloudinary(publicIdToDelete);
    const imageUploaded = yield UploadImageCloudinary_1.uploadImage(request.file.path);
    const socialMedia = {
        id: parseInt(id),
        urlimage: imageUploaded.url,
        publicid: imageUploaded.public_id
    };
    const updatedProfile = yield SponsorDatabase_1.updateSponsorToUploadImage(socialMedia);
    //await fs.unlink(request.file.path)
    yield DeleteFilePath_1.deleteFilePath(request.file.path);
    return response.json({
        sponsornameUpdated: updatedProfile,
        status: 200
    });
});
exports.uploadSponsorPhotosById = uploadSponsorPhotosById;
const updateNameAndContactsSponsorController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var sponsor = {
        name: request.body.name,
        email: request.body.email,
        id: request.body.id,
        web: request.body.web,
        facebook: request.body.facebook,
        instagram: request.body.instagram,
        youtube: request.body.youtube,
        twitter: request.body.twitter
    };
    console.log(request.body);
    console.log(sponsor);
    if (!sponsor.id || !sponsor.name) {
        return response.json({
            "status": 400,
            "message": "TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
        });
    }
    const sponsorUpdated = yield SponsorDatabase_1.updateNameAndContactsSponsor(sponsor);
    return response.json({
        "status": 200,
        "data": sponsorUpdated,
        "message": "USER WAS UPDATED"
    });
});
exports.updateNameAndContactsSponsorController = updateNameAndContactsSponsorController;
