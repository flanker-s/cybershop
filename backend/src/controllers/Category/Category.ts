import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";
import { validationResult } from 'express-validator';
import { replaceUrlParameter } from '../../helpers/request.js';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name, icon, parentId } = req.body;
        const category = await Category.create({ name, icon, parentId });
        return res.status(201).json({ category });

    } catch (err) {
        next(err);
    }
}

const readCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const categoryIds = category.path.split('.');
        const parentIds = categoryIds.filter(id => id !== categoryId);
        const parents = await Category.find({ _id: { $in: parentIds } })
            .select(['name', 'features']);
        const inheritedFeatures = parents
            .flatMap((parent) => [...parent.features]);
        const breadCrumbs = [
            ...parents.map((parent) => {
                return {
                    name: parent.name,
                    url: replaceUrlParameter(req, parent._id)
                }
            }),
            {
                name: category.name,
                url: replaceUrlParameter(req, category._id)
            }
        ];
        return res.status(200).json({
            breadCrumbs,
            category,
            inheritedFeatures
        });

    } catch (err) {
        next(err);
    }
}

const readAllCategoryItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryItems = await Category.find();
        return res.status(200).json({ categoryItems });

    } catch (err) {
        next(err);
    }
}

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        category.set(req.body);
        await category.save();
        return res.status(200).json({ category });

    } catch (err) {
        next(err);
    }
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId } = req.params;
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default {
    createCategory,
    readCategory,
    readAllCategoryItems,
    updateCategory,
    deleteCategory
}