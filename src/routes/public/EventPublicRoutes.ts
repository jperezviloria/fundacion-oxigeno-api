import {Router} from "express"
import {getAllEventsWithYoutubeLinksPublicController} from "../../controller/EventController";

const router = Router();

router.route("/get/events-with-youtubelinks")
.get(getAllEventsWithYoutubeLinksPublicController)


export default router;
