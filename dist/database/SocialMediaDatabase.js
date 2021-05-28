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
exports.getPhotoIdByIdSocialMedia = exports.updateSocialMediaToNameUsernameAndLink = exports.updateSocialMediaToUploadImage = exports.saveSocialMedia = void 0;
const database_1 = require("../config/database");
const saveSocialMedia = (socialMedia) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(socialMedia);
        const newUser = yield database_1.pool.query(`INSERT INTO SocialMedia (name, username, urlProfile) VALUES ( 
													 '${socialMedia.name}', 
													 '${socialMedia.username}',
													 '${socialMedia.urlProfile}');`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveSocialMedia = saveSocialMedia;
const updateSocialMediaToUploadImage = (socialMedia) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield database_1.pool.query(`UPDATE SocialMedia SET urlimage = '${socialMedia.urlimage}', publicid = '${socialMedia.publicid}' WHERE id = ${socialMedia.id} ;`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.updateSocialMediaToUploadImage = updateSocialMediaToUploadImage;
const updateSocialMediaToNameUsernameAndLink = (socialMedia) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield database_1.pool.query(`UPDATE SocialMedia SET name = '${socialMedia.name}', username = '${socialMedia.username}' , urlProfile = '${socialMedia.urlProfile}' WHERE id = ${socialMedia.id} ;`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateSocialMediaToNameUsernameAndLink = updateSocialMediaToNameUsernameAndLink;
const getPhotoIdByIdSocialMedia = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.pool.query(`SELECT publicid FROM SocialMedia WHERE id = ${id} ;`);
    return query;
});
exports.getPhotoIdByIdSocialMedia = getPhotoIdByIdSocialMedia;
