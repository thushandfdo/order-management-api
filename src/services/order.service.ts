import { IOrder, createOrder, deleteOrderById, getOrderByDateAndTime, getOrderById, getOrders } from '../models/order.model';

export const getAllOrdersService = async () => {
    try {
        const orders = await getOrders();

        return orders.map(order => ({
            id: order._id,
            customerId: order.customerId,
            products: order.products,
            dateTime: order.dateTime
        }));
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const addOrderService = async (newOrder: IOrder) => {
    try {
        if (!newOrder) {
            throw new Error('Missing fields');
        }

        const order = await getOrderByDateAndTime(newOrder.dateTime);

        if (order) {
            throw new Error('User already exists');
        }

        const newUser = await createOrder({
            customerId: newOrder.customerId,
            products: newOrder.products,
            dateTime: new Date()
        });

        return newUser;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateOrderService = async (id: string, updatedOrder: IOrder) => {
    try {
        if (!id || !updatedOrder) {
            throw new Error('Missing id or order');
        }

        const order = await getOrderById(id);

        order.customerId = updatedOrder.customerId ?? order.customerId;
        order.products = updatedOrder.products ?? order.products;
        order.dateTime = updatedOrder.dateTime ?? order.dateTime;

        await order.save();

        return {
            id: order._id,
            customerId: order.customerId,
            products: order.products,
            dateTime: order.dateTime
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteOrderService = async (id: string) => {
    try {
        if (!id) {
            throw new Error('Missing id');
        }

        const deletedOrder = await deleteOrderById(id);

        return {
            id: deletedOrder._id,
            customerId: deletedOrder.customerId,
            products: deletedOrder.products,
            dateTime: deletedOrder.dateTime
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
