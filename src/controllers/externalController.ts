import express from 'express';

import { getAllProductsService, getUserByIdService } from '../services/external.service';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getAllProductsService();

        return res.status(200).json(products).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};

export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(Number(id));

        return res.status(200).json(user).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
}