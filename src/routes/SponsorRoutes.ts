import {Router} from "express"
import multer from "../config/multer";
import {getAllSponsorController, saveSponsorController, updateNameAndContactsSponsorController, uploadSponsorPhotosById} from "../controller/SponsorController";


const router = Router();

router.route("/getall")
.get(getAllSponsorController)

router.route("/save")
.post(saveSponsorController)

router.route("/update/upload-image/:id")
.put(multer.single('image'), uploadSponsorPhotosById)

router.route("/update/name-and-contacts")
.put(updateNameAndContactsSponsorController)

export default router;
