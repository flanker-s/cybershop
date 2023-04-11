import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import User from '../../models/User.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name, password, phone, email, address, roleId } = req.body;
        const user = await User.create({
            name,
            password,
            email,
            phone,
            address,
            roleId,
            isActivated: false
        });

        return res.status(201).json({ user });

    } catch (err) {
        next(err);
    }
}

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.notFound('User', userId);
        }
        return res.status(200).json({ user });

    } catch (err) {
        next(err);
    }
}

const readAllUserItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const userItems = await User.find();
        return res.status(200).json({ userItems });

    } catch (err) {
        next(err);
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.notFound('User', userId);
        }
        user.set(req.body);
        await user.save();
        return res.status(200).json({ user });

    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw ApiError.notFound('User', userId);
        }
        return res.status(204).json({ message: 'deleted' })

    } catch (err) {
        next(err);
    }
}

export default { createUser, readUser, readAllUserItems, updateUser, deleteUser }