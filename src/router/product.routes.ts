import express from 'express';

import { getAllProducts } from '../controllers/productController';

export default (router: express.Router) => {
    router.get('/products', getAllProducts);
};
