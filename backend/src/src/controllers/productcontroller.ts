import { Request, Response } from 'express';
import Products from '../models/products';
export const productController = async (req: Request, res: Response) => {
    try {
        res.json({ message: 'Product route' });
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};