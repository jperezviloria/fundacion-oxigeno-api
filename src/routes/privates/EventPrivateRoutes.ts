import {Router} from "express"
import multer from "../../config/multer";
import {changeStatusEventController, getPrivatesEventsWithFalseStateController,deleteEventControllerById, getAllPrivatesEventsController, saveTitleDescriptionAndDateEventController, uploadPhotosByIdEvent, saveYoutubeLinkController, getAllEventsWithJoinController, getAllEventsWithYoutubeLinksController, updateOnlyNameYoutubeLinkByIdController, updateOnlyLinkYoutubeLinkByIdController, updateOnlyPositionYoutubeLinkById, deleteYoutubeLinkByIdController} from "../../controller/EventController";

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

router.route("/get/eventandyoutubelink2/:id")
.get(getAllEventsWithJoinController)

router.route("/get/eventandyoutubelink/:id")
.get(getAllEventsWithYoutubeLinksController)

router.route("/update/youtubelink/name")
.put(updateOnlyNameYoutubeLinkByIdController)

router.route("/update/youtubelink/link")
.put(updateOnlyLinkYoutubeLinkByIdController)

router.route("/update/youtubelink/position")
.put(updateOnlyPositionYoutubeLinkById)

router.route("/delete/youtubelinkbyid/:id")
.delete(deleteYoutubeLinkByIdController)
export default router;
