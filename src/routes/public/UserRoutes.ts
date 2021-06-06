import {Router} from "express"
import {updateNameAndSurnameById, getAllUsersEnableWithImageController} from "../../controller/UserController"


const router = Router();

router.route("/update/nameandsurname")
.put(updateNameAndSurnameById)

router.route("/getall")
.get(getAllUsersEnableWithImageController)

export default router;
