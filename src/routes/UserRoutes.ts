import {Router} from "express"
import {updateNameAndSurnameById} from "../controller/UserController"


const router = Router();

router.route("/update/nameandsurname")
.put(updateNameAndSurnameById)


export default router;
