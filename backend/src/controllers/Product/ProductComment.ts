import { Request, Response, NextFunction } from 'express';
import Product from '../../models/Product.js';

const createProductComment = (req: Request, res: Response, next: NextFunction) => {

    const { productId } = req.params;
    const { userId, rating, text } = req.body;
    const productComment = {
        userId,
        rating,
        text
    }

    return Product.findOneAndUpdate({ _id: productId })
        .then((product) => {
            if (product) {
                const newProductComment = product.productComments.create(productComment);
                return res.status(201).json(newProductComment);
            } else {
                return res.status(404).json({ message: "Product no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readProductComment = (req: Request, res: Response, next: NextFunction) => {

    const { productId, productCommentId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const productComment = product.productComments.id(productCommentId);
                if (productComment) {
                    return res.status(200).json(productComment);
                } else {
                    return res.status(404).json({ message: "Product comment not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllProductCommentItems = (req: Request, res: Response, next: NextFunction) => {

    const { productId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const productCommentItems = product.productComments;
                return res.status(200).json({ productCommentItems });
            } else { //TODO: add id to all not found response productComments
                return res.status(404).json({ message: `Product with an id:${productId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateProductComment = (req: Request, res: Response, next: NextFunction) => {

    const { productId, productCommentId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const productComment = product.productComments.id(productCommentId);
                if (productComment) {
                    productComment.set(req.body);
                    return product.save()
                        .then(() => res.status(200).json(productComment))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Product comment not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteProductComment = (req: Request, res: Response, next: NextFunction) => {

    const { productId, productCommentId } = req.params;

    return Product.findOneAndUpdate({ _id: productId })
        .then((product) => {
            if (product) {
                const initProductCommentCount = product.productComments.length;
                const remainedItems = product.productComments.remove(productCommentId);

                if (remainedItems.length !== initProductCommentCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Product comment not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createProductComment,
    readProductComment,
    readAllProductCommentItems,
    updateProductComment,
    deleteProductComment
}