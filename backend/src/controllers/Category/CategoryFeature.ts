import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";
import { validationResult } from 'express-validator';

const createCategoryFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { categoryId } = req.params;
        const { name } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.create({ name });
        await category.save();
        return res.status(201).json(feature)

    } catch (err) {
        next(err);
    }
}

const readCategoryFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId, featureId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        return res.status(200).json({ feature });

    } catch (err) {
        next(err);
    }
}

const readAllCategoryFeatureItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const featureItems = category.features;
        return res.status(200).json({ featureItems });

    } catch (err) {
        next(err);
    }
}

const updateCategoryFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { categoryId, featureId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        feature.set(req.body);
        await category.save();
        return res.status(200).json({ feature });

    } catch (err) {
        next(err);
    }
}

const deleteCategoryFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId, featureId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        category.features.remove(featureId);
        await category.save();
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createCategoryFeature,
    readCategoryFeature,
    readAllCategoryFeatureItems,
    updateCategoryFeature,
    deleteCategoryFeature
}