import {Router} from "express"
import {updateNameAndSurnameById , uploadPhotosById} from "../controller/UserController"
import multer from "../config/multer"

const router = Router();

router.route("/update/nameandsurname")
.put(updateNameAndSurnameById)


router.route("/update/upload-image/:id")
.post(multer.single('image'),uploadPhotosById)

export default router;
