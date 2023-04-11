import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";
import { validationResult } from 'express-validator';

const createCategoryBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId } = req.params;
        const { name, img, url } = req.body;
        const category = await Category.findById({ categoryId });
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryBanner = category.categoryBanners.push({
            name,
            img,
            url
        });
        await category.save();
        return res.status(201).json({ categoryBanner });

    } catch (err) {
        next(err);
    }
}

const readCategoryBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId, categoryBannerId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryBanner = category.categoryBanners.id(categoryBannerId);
        if (!categoryBanner) {
            throw ApiError.notFound('CategoryBanner', categoryBannerId);
        }
        return res.status(200).json({ categoryBanner });

    } catch (err) {
        next(err);
    }
}

const readAllCategoryBannerItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryBannerItems = category.categoryBanners;
        return res.status(200).json({ categoryBannerItems });

    } catch (err) {
        next(err);
    }
}

const updateCategoryBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId, categoryBannerId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryBanner = category.categoryBanners.id(categoryBannerId);
        if (!categoryBanner) {
            throw ApiError.notFound('CategoryBanner', categoryBannerId);
        }
        categoryBanner.set(req.body);
        await category.save();
        return res.status(200).json({ categoryBanner });

    } catch (err) {
        next(err);
    }
}

const deleteCategoryBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            return res.status(403).json(ApiError.forbidden());
        }
        const { categoryId, categoryBannerId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryBanner = category.categoryBanners.id(categoryBannerId);
        if (!categoryBanner) {
            throw ApiError.notFound('CategoryBanner', categoryBannerId);
        }
        category.categoryBanners.remove(categoryBannerId);
        await category.save();
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createCategoryBanner,
    readCategoryBanner,
    readAllCategoryBannerItems,
    updateCategoryBanner,
    deleteCategoryBanner
}