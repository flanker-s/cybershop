import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import IHasOwner from '../../models/interfaces/IHasOwner.js';
import Order from '../../models/Order.js';
import { checkOwner, checkRoles } from '../../services/auth.js';
import Product from '../../models/Product.js';
import { validationResult } from 'express-validator';

const createOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'shipper', 'support'];
        const { orderId } = req.params;
        const { productId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            const orderProduct = order.orderProducts.push({
                productId: product._id,
                price: product.price
            });
            await order.save();
            return res.status(201).json(orderProduct);
        } else {
            throw ApiError.forbidden();
        }
    } catch (err) {
        next(err);
    }
}

const readOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { orderId, orderProductId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        const orderProduct = order.orderProducts.id(orderProductId);
        if (!orderProduct) {
            throw ApiError.notFound('OrderProduct', orderProductId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            return res.status(201).json(orderProduct);
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readAllOrderProductItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            const orderProductItems = order.orderProducts;
            return res.status(200).json({ orderProductItems });
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const updateOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'shipper', 'support'];
        const { orderId, orderProductId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        const orderProduct = order.orderProducts.id(orderProductId);
        if (!orderProduct) {
            throw ApiError.notFound('OrderProduct', orderProductId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            orderProduct.set(req.body);
            await order.save();
            return res.status(200).json(orderProduct);
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const deleteOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { orderId, orderProductId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            throw ApiError.notFound('Order', orderId);
        }
        const orderProduct = order.orderProducts.id(orderProductId);
        if (!orderProduct) {
            throw ApiError.notFound('OrderProduct', orderProductId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, order as IHasOwner)) {
            order.orderProducts.remove(orderProductId);
            await order.save();
            return res.status(204).json("deleted");
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

export default {
    createOrderProduct,
    readOrderProduct,
    readAllOrderProductItems,
    updateOrderProduct,
    deleteOrderProduct
}