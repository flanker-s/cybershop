import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Shop from '../../models/Shop.js';
import { checkRoles } from '../../services/auth.js';

const createDayOfWork = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { shopId } = req.params;
        const { name, hours } = req.body;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        const dayOfWork = shop.daysOfWork.create({
            name,
            hours
        });
        await shop.save();
        return res.status(201).json({ dayOfWork });

    } catch (err) {
        next(err);
    }
}

const readDayOfWork = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopId, dayOfWorkId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        const dayOfWork = shop.daysOfWork.id(dayOfWorkId);
        if (!dayOfWork) {
            throw ApiError.notFound('DayOfWork', dayOfWorkId);
        }
        return res.status(200).json(dayOfWork);

    } catch (err) {
        next(err);
    }
}

const readAllDayOfWorkItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        const dayOfWorkItems = shop.daysOfWork;
        return res.status(200).json({ dayOfWorkItems });

    } catch (err) {
        next(err);
    }
}

const updateDayOfWork = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { shopId, dayOfWorkId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        const dayOfWork = shop.daysOfWork.id(dayOfWorkId);
        if (!dayOfWork) {
            throw ApiError.notFound('DayOfWork', dayOfWorkId);
        }
        dayOfWork.set(req.body);
        await shop.save();
        return res.status(200).json(dayOfWork);

    } catch (err) {
        next(err);
    }
}

const deleteDayOfWork = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { shopId, dayOfWorkId } = req.params;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw ApiError.notFound('Shop', shopId);
        }
        const dayOfWork = shop.daysOfWork.id(dayOfWorkId);
        if (!dayOfWork) {
            throw ApiError.notFound('DayOfWork', dayOfWorkId);
        }
        shop.daysOfWork.remove(dayOfWorkId);
        await shop.save();
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createDayOfWork,
    readDayOfWork,
    readAllDayOfWorkItems,
    updateDayOfWork,
    deleteDayOfWork
}