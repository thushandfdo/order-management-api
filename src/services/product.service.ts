import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const ENDPOINTS = {
    GET_ALL_PRODUCTS: '/products/get',
}

const getAxios = (token: string) => {
    const _axios = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

    return _axios;
};

export const getAllProductsService = async (token: string) => {
    try {
        const _axios = getAxios(token);
        
        const users = await _axios.get(ENDPOINTS.GET_ALL_PRODUCTS);

        return users.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};