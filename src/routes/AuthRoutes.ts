import {Router} from "express";
import {signUp, signIn} from "../controller/AuthController";


const router = Router();

router.route("/signin")
.post(signIn);

router.route("/signup")
.post(signUp);

export default router;
