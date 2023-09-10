import express from 'express';

import { addOrderService, deleteOrderService, getAllOrdersService, updateOrderService } from '../services/order.service';

export const getAllOrders = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await getAllOrdersService();

        return res.status(200).json(orders).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};

export const addOrder = async (req: express.Request, res: express.Response) => {
    try {
        const newOrder = req.body;

        const order = await addOrderService(newOrder);

        return res.status(200).json(order).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};

export const updateOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const order = req.body;

        const updatedOrder = await updateOrderService(id, order);

        return res.status(200).json(updatedOrder).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};

export const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedOrder = await deleteOrderService(id);

        return res.status(200).json(deletedOrder).end();
    }
    catch (error) {
        return res.status(400).send('Bad request: ' + error.message ?? error);
    }
};
