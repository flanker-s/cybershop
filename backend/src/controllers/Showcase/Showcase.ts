import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Showcase from '../../models/Showcase.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createShowcase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name } = req.body;
        const showcase = await Showcase.create({ name });
        return res.status(201).json({ showcase });
    } catch (err) {
        next(err);
    }
}

const readShowcase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { showcaseId } = req.params;
        const showcase = await Showcase.findById(showcaseId);
        if (!showcase) {
            throw ApiError.notFound('Showcase', showcaseId);
        }
        return res.status(200).json({ showcase });

    } catch (err) {
        next(err);
    }
}

const readAllShowcaseItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const showcaseItems = await Showcase.find();
        return res.status(200).json({ showcaseItems });

    } catch (err) {
        next(err);
    }
}

const updateShowcase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { showcaseId } = req.params;
        const showcase = await Showcase.findById(showcaseId);
        if (!showcase) {
            throw ApiError.notFound('Showcase', showcaseId);
        }
        showcase.set(req.body);
        await showcase.save();
        return res.status(200).json({ showcase });

    } catch (err) {
        next(err);
    }
}

const deleteShowcase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { showcaseId } = req.params;
        const showcase = await Showcase.findByIdAndDelete(showcaseId);
        if (!showcase) {
            throw ApiError.notFound('Showcase', showcaseId);
        }
        return res.status(201).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createShowcase, readShowcase, readAllShowcaseItems, updateShowcase, deleteShowcase }