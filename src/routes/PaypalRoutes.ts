import {Router} from "express"
import {createPayment, executePayment} from "../controller/PaypalController";

const router = Router();

router.route("/create-payment")
.post(createPayment)

router.route("/execute-payment")
.get(executePayment);

export default router;
