import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import IHasOwner from '../../models/interfaces/IHasOwner.js';
import Product from '../../models/Product.js';
import { checkOwner, checkRoles, getCurrentUser } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createProductComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { productId } = req.params;
        const { rating, text } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const productComment = product.productComments.create({
            userId: getCurrentUser(req).id,
            rating,
            text
        });
        await product.save();
        return res.status(201).json(productComment);

    } catch (err) {
        next(err);
    }
}

const readProductComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, productCommentId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const productComment = product.productComments.id(productCommentId);
        if (!productComment) {
            throw ApiError.notFound('ProductComment', productCommentId);
        }
        return res.status(200).json(productComment);

    } catch (err) {
        next(err);
    }
}

const readAllProductCommentItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const productCommentItems = product.productComments;
        return res.status(200).json({ productCommentItems });

    } catch (err) {
        next(err);
    }
}

const updateProductComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { productId, productCommentId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const productComment = product.productComments.id(productCommentId);
        if (!productComment) {
            throw ApiError.notFound('ProductComment', productCommentId);
        }
        if (await checkRoles(req, roles) || await checkOwner(req, productComment as IHasOwner)) {
            productComment.set(req.body);
            await product.save();
            return res.status(200).json(productComment);
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const deleteProductComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        const { productId, productCommentId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            throw ApiError.notFound('Product', productId);
        }
        const productComment = product.productComments.id(productCommentId);
        if (!productComment) {
            throw ApiError.notFound('ProductComment', productCommentId);
        }
        if (await checkRoles(req, roles) || await checkOwner(req, productComment as IHasOwner)) {
            product.productComments.remove(productCommentId);
            await product.save();
            return res.status(204).json("deleted");
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

export default {
    createProductComment,
    readProductComment,
    readAllProductCommentItems,
    updateProductComment,
    deleteProductComment
}