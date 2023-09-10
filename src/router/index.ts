import express from 'express';

// local imports
import orders from './order.routes';
import products from './product.routes';

const router = express.Router();

export default () : express.Router => {
    orders(router);
    products(router);
    
    return router;
};
