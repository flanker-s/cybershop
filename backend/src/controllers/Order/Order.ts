import { Request, Response, NextFunction } from 'express';
import Order from '../../models/Order.js';

const createOrder = (req: Request, res: Response, next: NextFunction) => {

    const { userId, deliveryMethodId, paymentMethodId } = req.body;
    const order = new Order({ userId, deliveryMethodId, paymentMethodId, status: "pending" });

    return order.save()
        .then(order => res.status(201).json({ order }))
        .catch(err => res.status(500).json({ err }));
}

const readOrder = (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .then(order => order ? res.status(200).json({ order })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllOrderItems = (req: Request, res: Response, next: NextFunction) => {
    return Order.find()
        .then(orderItems => res.status(200).json({ orderItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateOrder = (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                order.set(req.body);

                return order.save()
                    .then(order => res.status(200).json({ order }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    return Order.findByIdAndDelete(orderId)
        .then(order => order ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createOrder, readOrder, readAllOrderItems, updateOrder, deleteOrder }