import {Router} from "express"
import multer from "../../config/multer";
import {saveTitleDescriptionAndDateEventController, uploadPhotosByIdEvent} from "../../controller/EventController";

const router = Router();


router.route("/save/title-description")
.post(saveTitleDescriptionAndDateEventController)

router.route("/update/upload-image/:id")
.put(multer.single('image'),uploadPhotosByIdEvent)

export default router;
