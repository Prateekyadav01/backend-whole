import { Router } from "express";
import { sendMail } from "../controller/email.controller.js";

const router = Router();


router.route('/mail').post(sendMail);

export default router;