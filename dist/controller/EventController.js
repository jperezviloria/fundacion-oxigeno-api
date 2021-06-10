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
exports.updateOnlyLinkYoutubeLinkByIdController = exports.updateOnlyNameYoutubeLinkByIdController = exports.deleteYoutubeLinkByIdController = exports.updateOnlyPositionYoutubeLinkById = exports.getAllEventsWithYoutubeLinksPublicController = exports.getAllEventsWithYoutubeLinksController = exports.getAllEventsWithJoinController = exports.saveYoutubeLinkController = exports.changeStatusEventController = exports.deleteEventControllerById = exports.getPrivatesEventsWithFalseStateController = exports.getAllPrivatesEventsController = exports.uploadPhotosByIdEvent = exports.saveTitleDescriptionAndDateEventController = void 0;
const EventDatabase_1 = require("../database/EventDatabase");
const moment_1 = __importDefault(require("moment"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const saveTitleDescriptionAndDateEventController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const EventRequest = {
        title: request.body.title,
        description: request.body.description,
        date: moment_1.default(request.body.date).format(),
        enable: false
    };
    if (!EventRequest.title && !EventRequest.description) {
        return response.json({
            message: "Necesitas colocar el titulo y la descripcion"
        });
    }
    const eventSaved = yield EventDatabase_1.saveTitleDescriptionAndDateEvent(EventRequest);
    return response.json({
        message: eventSaved
    });
});
exports.saveTitleDescriptionAndDateEventController = saveTitleDescriptionAndDateEventController;
const uploadPhotosByIdEvent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log(request.file);
    const result = yield cloudinary_1.default.uploader.upload(request.file.path);
    const particularUser = yield EventDatabase_1.getEventById(parseInt(id));
    console.log(particularUser);
    if (particularUser.urlimage != null) {
        yield deletePhotoByIdWhenIWillUpdate(parseInt(id));
    }
    //await deletePhotoByIdWhenIWillUpdate(parseInt(id));
    console.log(result);
    const eventImage = {
        id: parseInt(id),
        imageurl: result.url,
        publicid: result.public_id
    };
    //await deletePhotoByIdWhenIWillUpdate(profile.id);
    const updatedEvent = yield EventDatabase_1.updateImageUrlAndPublicId(eventImage);
    yield fs_extra_1.default.unlink(request.file.path);
    return response.json({
        eventUpdated: updatedEvent,
        status: 200
    });
});
exports.uploadPhotosByIdEvent = uploadPhotosByIdEvent;
const deletePhotoByIdWhenIWillUpdate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const photoIdFromDatabase = yield EventDatabase_1.getPhotoIdByIdEvent(id);
    yield cloudinary_1.default.uploader.destroy(photoIdFromDatabase.rows[0].publicid);
});
const getAllPrivatesEventsController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allContactForms = yield EventDatabase_1.getAllEvents();
    console.log(allContactForms);
    return response.json({ data: allContactForms });
});
exports.getAllPrivatesEventsController = getAllPrivatesEventsController;
const getPrivatesEventsWithFalseStateController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const allContactForms = yield EventDatabase_1.getEventsWithFalseState();
    console.log(allContactForms);
    return response.json({ data: allContactForms });
});
exports.getPrivatesEventsWithFalseStateController = getPrivatesEventsWithFalseStateController;
const deleteEventControllerById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = yield EventDatabase_1.deleteEventById(parseInt(id));
    return response.json({ data: result });
});
exports.deleteEventControllerById = deleteEventControllerById;
const changeStatusEventController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = yield EventDatabase_1.changeStatusEventById(parseInt(id));
    return response.json({ data: result });
});
exports.changeStatusEventController = changeStatusEventController;
const saveYoutubeLinkController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const YoutubeLinkRequest = {
        name: request.body.name,
        idEvent: request.body.idEvent,
        link: request.body.link,
        position: request.body.position
    };
    if (!YoutubeLinkRequest.name && !YoutubeLinkRequest.idEvent && !YoutubeLinkRequest.link && !YoutubeLinkRequest.position) {
        return response.json({
            message: "Faltan datos"
        });
    }
    const youtubeLinkSaved = yield EventDatabase_1.saveYoutubeEvent(YoutubeLinkRequest);
    return response.json({
        message: youtubeLinkSaved
    });
});
exports.saveYoutubeLinkController = saveYoutubeLinkController;
const getAllEventsWithJoinController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = yield EventDatabase_1.getAllEventsWithJoin(parseInt(id));
    return response.json({ data: result });
});
exports.getAllEventsWithJoinController = getAllEventsWithJoinController;
const getAllEventsWithYoutubeLinksController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const event = yield EventDatabase_1.getEventById(parseInt(id));
    const youtubeLinks = yield EventDatabase_1.getYoutubeLinksById(parseInt(id));
    const eventWithYoutubeLink = {
        title: event.title,
        dates: event.dates,
        youtubeLink: youtubeLinks
    };
    //console.log(eventWithYoutubeLink)
    return response.json({ data: eventWithYoutubeLink });
});
exports.getAllEventsWithYoutubeLinksController = getAllEventsWithYoutubeLinksController;
const filteringEventWithinImageUrl = (event) => {
    if (event.imageurl && event.enable && event.title && event.description) {
        return event;
    }
};
const iteratingYoutubeLinks = (events) => __awaiter(void 0, void 0, void 0, function* () {
    var allEventsWithYoutubeLinks = [];
    events.map((particularEvent) => __awaiter(void 0, void 0, void 0, function* () {
        const youtubeLinks = yield EventDatabase_1.getYoutubeLinksById(particularEvent.id);
        const eventWithYoutubeLink = {
            imageurl: particularEvent.imageurl,
            title: particularEvent.title,
            dates: particularEvent.dates,
            description: particularEvent.description,
            youtubeLink: youtubeLinks
        };
        //console.log(eventWithYoutubeLink)
        // allEventsWithYoutubeLinks.push(eventWithYoutubeLink)
        allEventsWithYoutubeLinks = [...allEventsWithYoutubeLinks, eventWithYoutubeLink];
    }));
    console.log("aaaaaaaaaa");
    return allEventsWithYoutubeLinks;
});
const getAllEventsWithYoutubeLinksPublicController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield EventDatabase_1.getEventsWithTrueState();
    if (!events) {
        return response.json({
            message: "having error in getAllEventsWithYoutubeLinksPublicController"
        });
    }
    const eventsFiltered = events.filter(filteringEventWithinImageUrl);
    /*
    const allEventsWithYoutubeLinks = new Array()
    
    eventsFiltered.map(async particularEvent =>{
      const youtubeLinks = await getYoutubeLinksById(particularEvent.id)
      const eventWithYoutubeLink = {
      imageurl: particularEvent.imageurl,
      title: particularEvent.title,
      dates: particularEvent.dates,
      description: particularEvent.description,
      youtubeLink : youtubeLinks
    }
    console.log(eventWithYoutubeLink)
    allEventsWithYoutubeLinks.push(eventWithYoutubeLink)

    })
    */
    const result = yield iteratingYoutubeLinks(eventsFiltered);
    console.log("ADDDDD");
    console.log(result);
    return response.json({ data: result });
});
exports.getAllEventsWithYoutubeLinksPublicController = getAllEventsWithYoutubeLinksPublicController;
const updateOnlyPositionYoutubeLinkById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const youtubeLink = {
        id: request.body.id,
        position: request.body.position
    };
    const result = yield EventDatabase_1.updatePositionYoutubeEventById(youtubeLink);
    return response.json({ data: result });
});
exports.updateOnlyPositionYoutubeLinkById = updateOnlyPositionYoutubeLinkById;
const deleteYoutubeLinkByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = yield EventDatabase_1.deleteYoutubeEventById(parseInt(id));
    return response.json({ data: result });
});
exports.deleteYoutubeLinkByIdController = deleteYoutubeLinkByIdController;
const updateOnlyNameYoutubeLinkByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const youtubeLink = {
        id: request.body.id,
        name: request.body.name
    };
    const result = yield EventDatabase_1.updateNameYoutubeEventById(youtubeLink);
    return response.json({ data: result });
});
exports.updateOnlyNameYoutubeLinkByIdController = updateOnlyNameYoutubeLinkByIdController;
const updateOnlyLinkYoutubeLinkByIdController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const youtubeLink = {
        id: request.body.id,
        link: request.body.link
    };
    const result = yield EventDatabase_1.updateLinkYoutubeEventById(youtubeLink);
    return response.json({ data: result });
});
exports.updateOnlyLinkYoutubeLinkByIdController = updateOnlyLinkYoutubeLinkByIdController;
