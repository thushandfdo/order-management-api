import express from 'express';

import { getAllProducts } from '../controllers/externalController';

export default (router: express.Router) => {
    router.get('/products', getAllProducts);
};
