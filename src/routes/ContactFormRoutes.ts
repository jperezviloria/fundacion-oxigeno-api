import {Router} from "express"
import {sendContactFormBySmtp} from "../controller/ContactFormController"


const router = Router();


router.route("/smtp/send")
.post(sendContactFormBySmtp)


export default router;
