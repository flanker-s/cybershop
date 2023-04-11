import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Shop from '../../models/Shop.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createShop = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw ApiError.badRequest('Validation error', errors.array());
    }
    const roles = ['admin'];
    if (!await checkRoles(req, roles)) {
        throw ApiError.forbidden();
    }
    try {
        const { name } = req.body;
        const shop = await Shop.create({ name });
        return res.status(201).json({ shop });

    } catch (err) {
        next(err);
    }
}

const readShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        return res.status(200).json({ shop });

    } catch (err) {
        next(err);
    }
}

const readAllShopItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shopItems = await Shop.find();
        return res.status(200).json({ shopItems });

    } catch (err) {
        next(err);
    }
}

const updateShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { shopId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        shop.set(req.body);
        await shop.save();
        return res.status(200).json({ shop });

    } catch (err) {
        next(err);
    }
}

const deleteShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { shopId } = req.params;
        const shop = await Shop.findByIdAndDelete(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createShop, readShop, readAllShopItems, updateShop, deleteShop }