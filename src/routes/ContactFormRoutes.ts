import {Router} from "express"
import {changeStatusContactFormController, getAllContactFormController, getContactFormByIdController, getContactFormWhenIsFalseController, sendContactFormBySmtp} from "../controller/ContactFormController"


const router = Router();

router.route("/getall")
.get(getAllContactFormController)

router.route("/getunchecked")
.get(getContactFormWhenIsFalseController)

router.route("/change-status/:id")
.put(changeStatusContactFormController);

router.route("/smtp/send")
.post(sendContactFormBySmtp)

router.route("/getbyid/:id")
.get(getContactFormByIdController)

export default router;
