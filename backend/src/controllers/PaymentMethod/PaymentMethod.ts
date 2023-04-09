import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import PaymentMethod from '../../models/PaymentMethod.js';
import { checkRoles } from '../../services/auth.js';

const createPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name } = req.body;
        const paymentMethod = await PaymentMethod.create({ name });
        return res.status(201).json({ paymentMethod });

    } catch (err) {
        next(err);
    }
}

const readPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paymentMethodId } = req.params;
        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        if (!paymentMethod) {
            throw ApiError.notFound('PaymentMethod', paymentMethodId);
        }
        return res.status(200).json({ paymentMethod });

    } catch (err) {
        next(err);
    }
}

const readAllPaymentMethodItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentMethodItems = await PaymentMethod.find();
        return res.status(200).json({ paymentMethodItems });

    } catch (err) {
        next(err);
    }
}

const updatePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { paymentMethodId } = req.params;
        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        if (!paymentMethod) {
            throw ApiError.notFound('PaymentMethod', paymentMethodId);
        }
        paymentMethod.set(req.body);
        await paymentMethod.save();
        return res.status(200).json({ paymentMethod });

    } catch (err) {
        next(err);
    }
}

const deletePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { paymentMethodId } = req.params;
        const paymentMethod = await PaymentMethod.findByIdAndDelete(paymentMethodId);
        if (!paymentMethod) {
            throw ApiError.notFound('PaymentMethod', paymentMethodId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createPaymentMethod, readPaymentMethod, readAllPaymentMethodItems, updatePaymentMethod, deletePaymentMethod }