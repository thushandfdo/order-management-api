import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const PRODUCT_ENDPOINTS = {
    GET_ALL_PRODUCTS: 'api/products',
    UPDATE_STORE: 'api/products/order',
}

const USER_ENDPOINTS = {
    GET_USER_BY_ID: 'api/User/get/',
}

export const getAllProductsService = async () => {
    try {
        const _axios = axios.create({
            baseURL: process.env.PRODUCT_BASE_URL,
            headers: {
                // 'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });

        const products = await _axios.get(PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS);

        return products.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserByIdService = async (id: number) => {
    try {
        const _axios = axios.create({
            baseURL: process.env.USER_BASE_URL,
            headers: {
                // 'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        
        const user = await _axios.get(USER_ENDPOINTS.GET_USER_BY_ID + id);

        return user.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateStoreService = async (updatedStore: any) => {
    try {
        if (!updatedStore) {
            throw new Error('Missing data');
        }

        const _axios = axios.create({
            baseURL: process.env.PRODUCT_BASE_URL,
            headers: {
                // 'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });

        const products = updatedStore.map((product: any) => ({
            product_id: product.id,
            quantity: product.quantity
        }));

        await _axios.patch(PRODUCT_ENDPOINTS.UPDATE_STORE, products);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}