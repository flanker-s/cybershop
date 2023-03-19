import { Request, Response, NextFunction } from 'express';
import Order from '../../models/Order.js';

const createOrderProduct = (req: Request, res: Response, next: NextFunction) => {

    const { orderId } = req.params;
    const { userId, text } = req.body;
    const orderProduct = {
        userId,
        text
    }

    return Order.findOneAndUpdate({ _id: orderId })
        .then((order) => {
            if (order) {
                const newOrderProduct = order.orderProducts.create(orderProduct);
                return res.status(201).json(newOrderProduct);
            } else {
                return res.status(404).json({ message: "Order no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readOrderProduct = (req: Request, res: Response, next: NextFunction) => {

    const { orderId, orderProductId } = req.params;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                const orderProduct = order.orderProducts.id(orderProductId);
                if (orderProduct) {
                    return res.status(200).json(orderProduct);
                } else {
                    return res.status(404).json({ message: "Order product not found" });
                }
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllOrderProductItems = (req: Request, res: Response, next: NextFunction) => {

    const { orderId } = req.params;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                const orderProductItems = order.orderProducts;
                return res.status(200).json({ orderProductItems });
            } else { //TODO: add id to all not found response orderProducts
                return res.status(404).json({ message: `Order with an id:${orderId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateOrderProduct = (req: Request, res: Response, next: NextFunction) => {

    const { orderId, orderProductId } = req.params;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                const orderProduct = order.orderProducts.id(orderProductId);
                if (orderProduct) {
                    orderProduct.set(req.body);
                    return order.save()
                        .then(() => res.status(200).json(orderProduct))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Order product not found" });
                }
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteOrderProduct = (req: Request, res: Response, next: NextFunction) => {

    const { orderId, orderProductId } = req.params;

    return Order.findOneAndUpdate({ _id: orderId })
        .then((order) => {
            if (order) {
                const initOrderProductCount = order.orderProducts.length;
                const remainedItems = order.orderProducts.remove(orderProductId);

                if (remainedItems.length !== initOrderProductCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Order product not found" });
                }
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createOrderProduct,
    readOrderProduct,
    readAllOrderProductItems,
    updateOrderProduct,
    deleteOrderProduct
}