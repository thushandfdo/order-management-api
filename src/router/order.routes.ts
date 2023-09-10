import express from 'express';

import { addOrder, deleteOrder, getAllOrders, updateOrder } from '../controllers/orderController';

export default (router: express.Router) => {
    router.get('/orders', getAllOrders);
    router.post('/orders', addOrder);
    router.delete('/orders/:id', deleteOrder);
    router.patch('/orders/:id', updateOrder);
};
