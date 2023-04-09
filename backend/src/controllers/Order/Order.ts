import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import IHasOwner from '../../models/interfaces/IHasOwner.js';
import Order from '../../models/Order.js';
import { checkOwner, checkRoles, checkUser } from '../../services/auth.js';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { userId, deliveryMethodId, paymentMethodId } = req.body;

        if (await checkRoles(req, roles) || checkUser(req, userId)) {
            const order = await Order.create({
                userId,
                deliveryMethodId,
                paymentMethodId,
                status: "pending"
            });
            return res.status(201).json({ order });
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            return res.status(200).json({ order });
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readAllOrderItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const orderItems = await Order.find();
        return res.status(200).json({ orderItems });

    } catch (err) {
        next(err);
    }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        order.set(req.body);
        await order.save();
        return res.status(200).json({ order });

    } catch (err) {
        next(err);
    }
}

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createOrder, readOrder, readAllOrderItems, updateOrder, deleteOrder }