import {Router} from "express"
import {cancelPayment, createPayment, executePayment} from "../controller/PaypalController";

const router = Router();

router.route("/create-payment")
.post(createPayment)

router.route("/execute-payment")
.get(executePayment);

router.route("/cancel-payment")
.get(cancelPayment);

export default router;
