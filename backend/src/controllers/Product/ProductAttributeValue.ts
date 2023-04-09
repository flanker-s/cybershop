import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Product from '../../models/Product.js';
import { checkRoles } from '../../services/auth.js';

const createProductAttributeValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { productId } = req.params;
        const { attributeId, value } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const attributeValue = await product.attributeValues.create({
            attributeId,
            value
        });
        await product.save();
        return res.status(201).json(attributeValue);

    } catch (err) {
        next(err);
    }
}

const readProductAttributeValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, attributeValueId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const attributeValue = product.attributeValues.id(attributeValueId);
        if (!attributeValue) {
            throw ApiError.notFound('AttributeValue', attributeValueId);
        }
        return res.status(200).json(attributeValue);

    } catch (err) {
        next(err);
    }
}

const readAllProductAttributeValueItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const attributeValueItems = product.attributeValues;
        return res.status(200).json({ attributeValueItems });

    } catch (err) {
        next(err);
    }
}

const updateProductAttributeValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { productId, attributeValueId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const attributeValue = product.attributeValues.id(attributeValueId);
        if (!attributeValue) {
            throw ApiError.notFound('AttributeValue', attributeValueId);
        }
        attributeValue.set(req.body);
        await product.save();
        return res.status(200).json(attributeValue);

    } catch (err) {
        next(err);
    }
}

const deleteProductAttributeValue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { productId, attributeValueId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const attributeValue = product.attributeValues.id(attributeValueId);
        if (!attributeValue) {
            throw ApiError.notFound('AttributeValue', attributeValueId);
        }
        product.attributeValues.remove(attributeValueId);
        await product.save();
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createProductAttributeValue,
    readProductAttributeValue,
    readAllProductAttributeValueItems,
    updateProductAttributeValue,
    deleteProductAttributeValue
}