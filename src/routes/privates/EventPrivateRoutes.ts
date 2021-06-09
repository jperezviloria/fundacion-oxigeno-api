import {Router} from "express"
import multer from "../../config/multer";
import {changeStatusEventController, getPrivatesEventsWithFalseStateController,deleteEventControllerById, getAllPrivatesEventsController, saveTitleDescriptionAndDateEventController, uploadPhotosByIdEvent, saveYoutubeLinkController, getAllEventsWithJoinController} from "../../controller/EventController";

const router = Router();


router.route("/save/title-description")
.post(saveTitleDescriptionAndDateEventController)

router.route("/update/upload-image/:id")
.put(multer.single('image'),uploadPhotosByIdEvent)

router.route("/getall")
.get(getAllPrivatesEventsController)

router.route("/get/withstatusfalse")
.get(getPrivatesEventsWithFalseStateController)

router.route("/update/change-true-status/:id")
.put(changeStatusEventController)

router.route("/deletebyid/:id")
.delete(deleteEventControllerById)

router.route("/save/youtubelink")
.post(saveYoutubeLinkController)

router.route("/get/eventandyoutubelink/:id")
.get(getAllEventsWithJoinController)

export default router;
