import { Request, Response, NextFunction } from 'express';
import Product from '../../models/Product.js';

const createProduct = (req: Request, res: Response, next: NextFunction) => {

    const { name, preview, price, status } = req.body;
    const product = new Product({ name, preview, price, status });

    return product.save()
        .then(product => res.status(201).json({ product }))
        .catch(err => res.status(500).json({ err }));
}

const readProduct = (req: Request, res: Response, next: NextFunction) => {

    const productId = req.params.productId;

    return Product.findById(productId)
        .then(product => product ? res.status(200).json({ product })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllProductItems = (req: Request, res: Response, next: NextFunction) => {
    return Product.find()
        .then(productItems => res.status(200).json({ productItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateProduct = (req: Request, res: Response, next: NextFunction) => {

    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                product.set(req.body);

                return product.save()
                    .then(product => res.status(200).json({ product }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {

    const productId = req.params.productId;

    return Product.findByIdAndDelete(productId)
        .then(product => product ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createProduct, readProduct, readAllProductItems, updateProduct, deleteProduct }