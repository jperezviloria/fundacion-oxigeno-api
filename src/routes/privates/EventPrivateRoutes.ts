import {Router} from "express"
import multer from "../../config/multer";
import {changeStatusEventController, getPrivatesEventsWithFalseStateController,deleteEventControllerById, getAllPrivatesEventsController, saveTitleDescriptionAndDateEventController, uploadPhotosByIdEvent} from "../../controller/EventController";

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

export default router;
