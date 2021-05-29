import {Router} from "express"
import {changeStatusContactFormController, getAllContactFormController, getContactFormWhenIsFalseController, sendContactFormBySmtp} from "../controller/ContactFormController"


const router = Router();

router.route("/getall")
.get(getAllContactFormController)

router.route("/getunchecked")
.get(getContactFormWhenIsFalseController)

router.route("/change-status/:id")
.put(changeStatusContactFormController);

router.route("/smtp/send")
.post(sendContactFormBySmtp)


export default router;
