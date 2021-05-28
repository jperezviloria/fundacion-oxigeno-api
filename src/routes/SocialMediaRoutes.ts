import {Router} from "express"
import {saveSocialMediaController, uploadPhotosById, updateNameSurnameAndLinkById} from "../controller/SocialMedia";
import multer from "../config/multer"

const router = Router();


router.route("/save")
.post(saveSocialMediaController)

router.route("/update/principalinformation")
.put(updateNameSurnameAndLinkById);

router.route("/update/upload-image/:id")
.post(multer.single('image'), uploadPhotosById)
export default router;
