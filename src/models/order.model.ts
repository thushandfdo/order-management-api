import mongoose from "mongoose";

export interface IOrder {
    id: string;
    customerId: number;
    products: Array<object>;
    dateTime?: string;
}

const orderSchema = new mongoose.Schema({
    customerId: { type: Number, required: true },
    products: { type: Array, required: true },
    dateTime: { type: String, required: true }
});

export const Orders = mongoose.model('Orders', orderSchema);

export const getOrders = () => Orders.find();
export const getOrderById = (id: string) => Orders.findById(id);
export const getOrderByDateAndTime = (dateTime: string) => Orders.findOne({ 'dateTime': dateTime });

export const createOrder = (values: Record<string, any>) => new Orders(values)
    .save().then((order) => {
        const o = order.toObject();

        return {
            id: o._id,
            customerId: o.customerId,
            products: o.products,
            dateTime: o.dateTime
        };
    }
);

export const deleteOrderById = (id: string) => Orders.findOneAndDelete({ _id: id });

export const updateOrderById = (id: string, values: Record<string, any>) => {
    Orders.findByIdAndUpdate(id, values)
};
