import express from 'express';
import { loginController, signUpController } from '../controllers/authcontroller';
import { productController } from '../controllers/productcontroller';

const router = express.Router();

router.post('/add-product', productController);


export default router;
