import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import DeliveryMethod from '../../models/DeliveryMethod.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createDeliveryMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { name } = req.body;
        const deliveryMethod = await DeliveryMethod.create({ name });
        return res.status(201).json({ deliveryMethod });

    } catch (err) {
        next(err);
    }
}

const readDeliveryMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { deliveryMethodId } = req.params;

        const deliveryMethod = await DeliveryMethod.findById(deliveryMethodId);
        if (!deliveryMethod) {
            throw ApiError.notFound('DeliveryMethod', deliveryMethodId);
        }
        return res.status(200).json({ deliveryMethod });

    } catch (err) {
        next(err);
    }
}

const readAllDeliveryMethodItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deliveryMethodItems = await DeliveryMethod.find();
        return res.status(200).json({ deliveryMethodItems });
    } catch (err) {
        next(err);
    }
}

const updateDeliveryMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { deliveryMethodId } = req.params;

        const deliveryMethod = await DeliveryMethod.findById(deliveryMethodId);
        if (!deliveryMethod) {
            throw ApiError.notFound('DeliveryMethod', deliveryMethodId);
        }
        deliveryMethod.set(req.body);
        await deliveryMethod.save();
        return res.status(200).json({ deliveryMethod });

    } catch (err) {
        next(err);
    }
}
const deleteDeliveryMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { deliveryMethodId } = req.params;

        const deliveryMethod = await DeliveryMethod.findByIdAndDelete(deliveryMethodId);
        if (!deliveryMethod) {
            throw ApiError.notFound('DeliveryMethod', deliveryMethodId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createDeliveryMethod, readDeliveryMethod, readAllDeliveryMethodItems, updateDeliveryMethod, deleteDeliveryMethod }