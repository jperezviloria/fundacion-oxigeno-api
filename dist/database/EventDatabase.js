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
exports.updatePositionYoutubeEventById = exports.updateLinkYoutubeEventById = exports.updateNameYoutubeEventById = exports.getYoutubeLinksById = exports.getAllEventsWithJoin = exports.getEventsWithTrueState = exports.getEventsWithFalseState = exports.getAllEvents = exports.changeStatusEventById = exports.updateYoutubeEventById = exports.deleteYoutubeEventById = exports.saveYoutubeEvent = exports.updateImageUrlAndPublicId = exports.getPhotoIdByIdEvent = exports.getEventById = exports.deleteEventById = exports.saveTitleDescriptionAndDateEvent = void 0;
const database_1 = require("../config/database");
const saveTitleDescriptionAndDateEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(event);
        const newEvent = yield database_1.pool.query(`INSERT INTO Events (title, description, dates, enable) VALUES ( 
													 '${event.title}', 
													 '${event.description}',
													 '${event.date}',
													 ${event.enable})
													 RETURNING *;`);
        return newEvent.rows[0];
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveTitleDescriptionAndDateEvent = saveTitleDescriptionAndDateEvent;
const deleteEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield database_1.pool.query(` DELETE FROM Events WHERE id = ${id}`);
        return "deleted";
    }
    catch (error) {
        return "not deleted";
    }
});
exports.deleteEventById = deleteEventById;
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield database_1.pool.query(`SELECT * FROM Events WHERE id = ${id}`);
        return event.rows[0];
    }
    catch (error) {
        return "not updated";
    }
});
exports.getEventById = getEventById;
const getPhotoIdByIdEvent = (idEvent) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.pool.query(`SELECT publicid FROM Events WHERE id = ${idEvent}`);
    return query;
});
exports.getPhotoIdByIdEvent = getPhotoIdByIdEvent;
const updateImageUrlAndPublicId = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const image = yield database_1.pool.query(`UPDATE Events SET imageurl = '${data.imageurl}', publicid = '${data.publicid}' WHERE id = ${data.id}`);
        return "updated";
    }
    catch (error) {
        return "not updated";
    }
});
exports.updateImageUrlAndPublicId = updateImageUrlAndPublicId;
const saveYoutubeEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(event);
        const newUser = yield database_1.pool.query(`INSERT INTO Eventyoutube (name, idEvent, link, position) VALUES ( '${event.name}', ${event.idEvent}, '${event.link}', ${event.position} );`);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveYoutubeEvent = saveYoutubeEvent;
const deleteYoutubeEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield database_1.pool.query(` DELETE FROM Eventyoutube WHERE id = ${id}`);
        return "deleted";
    }
    catch (error) {
        return "not deleted";
    }
});
exports.deleteYoutubeEventById = deleteYoutubeEventById;
const updateYoutubeEventById = (youtubeevent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(event);
        const eventUpdated = yield database_1.pool.query(`UPDATE Eventyoutube SET name = '${youtubeevent.name}', idEvent = ${youtubeevent.idevent}, link = '${youtubeevent.link}', position = ${youtubeevent.position} WHERE id = ${youtubeevent.id}`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateYoutubeEventById = updateYoutubeEventById;
const changeStatusEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield database_1.pool.query(`UPDATE Events SET enable = true WHERE id = ${id}`);
        return "changed";
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeStatusEventById = changeStatusEventById;
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM Events ORDER BY dates DESC `);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllEvents = getAllEvents;
const getEventsWithFalseState = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM Events WHERE enable = false ORDER BY dates DESC `);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEventsWithFalseState = getEventsWithFalseState;
const getEventsWithTrueState = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM Events WHERE enable = true ORDER BY dates DESC `);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEventsWithTrueState = getEventsWithTrueState;
const getAllEventsWithJoin = (idEvent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactForms = yield database_1.pool.query(`SELECT * FROM Events as ev JOIN EventYoutube as ey ON ev.id = ey.idEvent AND ev.id = ${idEvent} ORDER BY ey.position , ey.id`);
        return allContactForms.rows;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllEventsWithJoin = getAllEventsWithJoin;
const getYoutubeLinksById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield database_1.pool.query(`SELECT * FROM eventyoutube WHERE idEvent = ${id} ORDER BY position DESC, id DESC`);
        return event.rows;
    }
    catch (error) {
        return "not updated";
    }
});
exports.getYoutubeLinksById = getYoutubeLinksById;
const updateNameYoutubeEventById = (youtubeevent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventUpdated = yield database_1.pool.query(`UPDATE Eventyoutube SET name = '${youtubeevent.name}' WHERE id = ${youtubeevent.id}`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateNameYoutubeEventById = updateNameYoutubeEventById;
const updateLinkYoutubeEventById = (youtubeevent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventUpdated = yield database_1.pool.query(`UPDATE Eventyoutube SET link = '${youtubeevent.link}' WHERE id = ${youtubeevent.id}`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updateLinkYoutubeEventById = updateLinkYoutubeEventById;
const updatePositionYoutubeEventById = (youtubeevent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventUpdated = yield database_1.pool.query(`UPDATE Eventyoutube SET position = ${youtubeevent.position} WHERE id = ${youtubeevent.id}`);
        return "updated";
    }
    catch (error) {
        return "no updated";
    }
});
exports.updatePositionYoutubeEventById = updatePositionYoutubeEventById;
