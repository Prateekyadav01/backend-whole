import { Router } from 'express';
import { shortURLGiven, urlShortener } from '../controller/urlController.js';

const router = Router();

router.route('/url').post(urlShortener); // Ensure this matches the form action
router.route('/:shortUrl').get(shortURLGiven);

export default router;
