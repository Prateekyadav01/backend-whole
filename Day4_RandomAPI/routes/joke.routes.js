import { Router } from "express";
import { randomJokeApi } from "../controller/randomJoke.controller.js";


const router = Router();

// console.log("hello")
router.route('/randomJoke').get(randomJokeApi);


export default router;