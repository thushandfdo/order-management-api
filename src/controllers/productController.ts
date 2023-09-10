import express from 'express';
import * as dotenv from 'dotenv';

import { getAllProductsService } from '../services/product.service';

dotenv.config();

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const token = req.cookies[process.env.TOKEN_NAME];

        const products = await getAllProductsService(token);

        return res.status(200).json(products).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};