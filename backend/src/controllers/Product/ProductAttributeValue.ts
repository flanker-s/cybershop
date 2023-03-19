import { Request, Response, NextFunction } from 'express';
import Product from '../../models/Product.js';

const createProductAttributeValue = (req: Request, res: Response, next: NextFunction) => {

    const { productId } = req.params;
    const { attributeId, value } = req.body;
    const attributeValue = {
        attributeId,
        value
    }

    return Product.findOneAndUpdate({ _id: productId })
        .then((product) => {
            if (product) {
                const newAttributeValue = product.attributeValues.create(attributeValue);
                return res.status(201).json(newAttributeValue);
            } else {
                return res.status(404).json({ message: "Product no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readProductAttributeValue = (req: Request, res: Response, next: NextFunction) => {

    const { productId, attributeValueId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const attributeValue = product.attributeValues.id(attributeValueId);
                if (attributeValue) {
                    return res.status(200).json(attributeValue);
                } else {
                    return res.status(404).json({ message: "Product attributeValue not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllProductAttributeValueItems = (req: Request, res: Response, next: NextFunction) => {

    const { productId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const attributeValueItems = product.attributeValues;
                return res.status(200).json({ attributeValueItems });
            } else { //TODO: add id to all not found response attributeValues
                return res.status(404).json({ message: `Product with an id:${productId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateProductAttributeValue = (req: Request, res: Response, next: NextFunction) => {

    const { productId, attributeValueId } = req.params;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                const attributeValue = product.attributeValues.id(attributeValueId);
                if (attributeValue) {
                    attributeValue.set(req.body);
                    return product.save()
                        .then(() => res.status(200).json(attributeValue))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Product attributeValue not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteProductAttributeValue = (req: Request, res: Response, next: NextFunction) => {

    const { productId, attributeValueId } = req.params;

    return Product.findOneAndUpdate({ _id: productId })
        .then((product) => {
            if (product) {
                const initAttributeValueCount = product.attributeValues.length;
                const remainedItems = product.attributeValues.remove(attributeValueId);

                if (remainedItems.length !== initAttributeValueCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Product attributeValue not found" });
                }
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createProductAttributeValue,
    readProductAttributeValue,
    readAllProductAttributeValueItems,
    updateProductAttributeValue,
    deleteProductAttributeValue
}