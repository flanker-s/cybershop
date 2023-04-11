import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";
import { validationResult } from 'express-validator';

const createCategoryFeatureAttribute = async (req: Request, res: Response, next: NextFunction) => {
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
        const { name, type, valueListId } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        const attributeData = { name, type, valueListId: type === "reference" ? valueListId : null };
        const attribute = feature.attributes.create(attributeData);
        if (type === "reference" && !valueListId) {
            throw ApiError.badRequest("The 'valueListId' field is required");
        }
        await category.save();
        return res.status(201).json({ attribute });

    } catch (err) {
        next(err);
    }
}

const readCategoryFeatureAttribute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId, featureId, attributeId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        const attribute = feature.attributes.id(attributeId);
        if (!attribute) {
            throw ApiError.notFound('Attribute', attributeId);
        }
        return res.status(200).json({ attribute });

    } catch (err) {
        next(err);
    }
}

const readAllCategoryFeatureAttributeItems = async (req: Request, res: Response, next: NextFunction) => {
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
        const attributeItems = feature.attributes;
        return res.status(200).json({ attributeItems });

    } catch (err) {
        next(err);
    }
}

const updateCategoryFeatureAttribute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { categoryId, featureId, attributeId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        const attribute = feature.attributes.id(attributeId);
        if (!attribute) {
            throw ApiError.notFound('Attribute', attributeId);
        }
        attribute.set(req.body);
        await category.save();
        return res.status(200).json({ attribute });

    } catch (err) {
        next(err);
    }
}

const deleteCategoryFeatureAttribute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { categoryId, featureId, attributeId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw ApiError.notFound('Category', categoryId);
        }
        const feature = category.features.id(featureId);
        if (!feature) {
            throw ApiError.notFound('Feature', featureId);
        }
        const attribute = feature.attributes.id(attributeId);
        if (!attribute) {
            throw ApiError.notFound('Attribute', attributeId);
        }
        feature.attributes.remove(featureId);
        await category.save();
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createCategoryFeatureAttribute,
    readCategoryFeatureAttribute,
    readAllCategoryFeatureAttributeItems,
    updateCategoryFeatureAttribute,
    deleteCategoryFeatureAttribute
}