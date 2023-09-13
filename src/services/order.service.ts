import { IOrder, createOrder, deleteOrderById, getOrderByCustomerAndProducts, getOrderById, getOrders } from '../models/order.model';
import { getAllProductsService, getUserByIdService, updateStoreService } from './external.service';

export const getAllOrdersService = async () => {
    try {
        const orders = await getOrders();

        return orders.map(order => ({
            id: order._id,
            customerId: order.customerId,
            products: order.products,
            dateTime: order.dateTime,
            price: order.price
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

        const customer = await getUserByIdService(newOrder.customerId);

        if (!customer) {
            throw new Error(`Customer (id: ${newOrder.customerId}) not found`);
        }

        newOrder.customerName = customer.firstName + ' ' + customer.lastName;

        const excisingOrder = await getOrderByCustomerAndProducts(newOrder.customerId, newOrder.products);

        if (excisingOrder) {
            throw new Error('Order already exists');
        }

        const customerProducts = newOrder.products;

        const productsList = await getAllProductsService();

        let price = 0;

        customerProducts.map((customerProduct: any) => {
            const product = productsList.find((product: any) => customerProduct.id === product.id);

            if (!product) {
                throw new Error(`Product (id: ${customerProduct.id}) not found`);
            }

            if (product.quantity < customerProduct.quantity) {
                throw new Error(`Product (${customerProduct.id}: ${product.name}) quantity is not enough`);
            }

            price += product.price * customerProduct.quantity;
            customerProduct.availableQuantity = product.quantity - customerProduct.quantity;
            customerProduct.price = product.price * customerProduct.quantity;
            customerProduct.name = product.name;
        });

        await updateStoreService(customerProducts);

        await createOrder({
            customerId: newOrder.customerId,
            products: [...customerProducts.map((customerProduct: any) => ({
                id: customerProduct.id,
                quantity: customerProduct.quantity,
                price: customerProduct.price,
            }))],
            dateTime: new Date(),
            price: price
        });

        return newOrder;
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
            dateTime: order.dateTime,
            price: order.price
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
            dateTime: deletedOrder.dateTime,
            price: deletedOrder.price
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
