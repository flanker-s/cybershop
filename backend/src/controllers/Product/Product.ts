import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Product from '../../models/Product.js';
import { checkRoles } from '../../services/auth.js';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name, preview, price, status } = req.body;
        const product = await Product.create({ name, preview, price, status });
        return res.status(201).json({ product });

    } catch (err) {
        next(err);
    }
}

const readProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId)
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        return res.status(200).json({ product });

    } catch (err) {
        next(err);
    }
}

const readAllProductItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productItems = await Product.find();
        return res.status(200).json({ productItems });

    } catch (err) {
        next(err);
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        const { productId } = req.params;
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        product.set(req.body);
        await product.save();
        return res.status(200).json({ product });

    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { productId } = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        return res.status(204).json({ message: 'deleted' });
    } catch (err) {
        next(err);
    }
}

export default { createProduct, readProduct, readAllProductItems, updateProduct, deleteProduct }