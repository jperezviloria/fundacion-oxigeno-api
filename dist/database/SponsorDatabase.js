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
exports.updateNameAndContactsSponsor = exports.updateSponsorToUploadImage = exports.getPhotoIdByIdSponsorDatabase = exports.getAllSponsorDatabase = exports.saveSponsorDatabase = void 0;
const database_1 = require("../config/database");
const saveSponsorDatabase = (sponsor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(sponsor);
        const newUser = yield database_1.pool.query(`INSERT INTO Sponsor (name, email, web, facebook, instagram, youtube, twitter ) VALUES ('${sponsor.name}','${sponsor.email}', '${sponsor.web}','${sponsor.facebook}','${sponsor.instagram}', '${sponsor.youtube}', '${sponsor.twitter}');`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveSponsorDatabase = saveSponsorDatabase;
const getAllSponsorDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSponsor = yield database_1.pool.query(`SELECT * FROM Sponsor`);
        return allSponsor.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllSponsorDatabase = getAllSponsorDatabase;
const getPhotoIdByIdSponsorDatabase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`SELECT publicId FROM Sponsor WHERE id = ${id}`);
        return query.rows[0].publicid;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPhotoIdByIdSponsorDatabase = getPhotoIdByIdSponsorDatabase;
const updateSponsorToUploadImage = (sponsor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`UPDATE Sponsor SET urlimage = '${sponsor.urlimage}', publicid = '${sponsor.publicid}' WHERE id = ${sponsor.id} ;`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateSponsorToUploadImage = updateSponsorToUploadImage;
const updateNameAndContactsSponsor = (sponsor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`UPDATE Sponsor SET name = '${sponsor.name}', web = '${sponsor.web}' , email = '${sponsor.email}', facebook = '${sponsor.facebook}', instagram = '${sponsor.instagram}' , youtube = '${sponsor.youtube}', twitter = '${sponsor.twitter}' WHERE id = ${sponsor.id} ;`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateNameAndContactsSponsor = updateNameAndContactsSponsor;
