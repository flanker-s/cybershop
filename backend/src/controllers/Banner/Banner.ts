import { Request, Response, NextFunction } from 'express';
import Banner from '../../models/Banner.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";
import { validationResult } from 'express-validator';

const createBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { name, img, url, template } = req.body;
        const banner = await Banner.create({ name, img, url, template });
        return res.status(201).json({ banner });

    } catch (err) {
        next(err);
    }
}

const readBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bannerId } = req.params;
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            throw ApiError.notFound('Banner', bannerId);
        }
        return res.status(200).json({ banner });

    } catch (err) {
        next(err);
    }
}

const readAllBannerItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bannerItems = await Banner.find();
        return res.status(200).json({ bannerItems });

    } catch (err) {
        next(err);
    }
}

const updateBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        };
        const { bannerId } = req.params;
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            throw ApiError.notFound('Banner', bannerId);
        }
        banner.set(req.body);
        await banner.save();
        return res.status(200).json({ banner });

    } catch (err) {
        next(err);
    }
}

const deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { bannerId } = req.params;
        const banner = await Banner.findByIdAndDelete(bannerId);
        if (!banner) {
            throw ApiError.notFound('Banner', bannerId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createBanner, readBanner, readAllBannerItems, updateBanner, deleteBanner }