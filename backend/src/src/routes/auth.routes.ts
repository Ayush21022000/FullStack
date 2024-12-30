import express from 'express';
import { loginController, signUpController } from '../controllers/authcontroller';

const router = express.Router();

router.post('/login', loginController);
router.post('/signup',signUpController);


export default router;
