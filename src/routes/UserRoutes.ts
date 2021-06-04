import {Router} from "express"
import {getAllUsersController, updateNameAndSurnameById , uploadPhotosById, deleteUserByIdController, changeEnableUserById, getUserByEmailController} from "../controller/UserController"
import multer from "../config/multer"

const router = Router();


router.route("/getall")
.get(getAllUsersController)

router.route("/update/nameandsurname")
.put(updateNameAndSurnameById)


router.route("/update/upload-image/:id")
.post(multer.single('image'),uploadPhotosById)

router.route("/delete/:id")
.delete(deleteUserByIdController)

router.route("/change/enable")
.put(changeEnableUserById)

router.route("/getbyemail/:email")
.get(getUserByEmailController)

export default router;
