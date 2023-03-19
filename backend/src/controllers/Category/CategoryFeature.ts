import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Category from '../../models/Category.js';

const createCategoryFeature = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId } = req.params;
    const { name } = req.body;

    const feature = {
        _id: new Types.ObjectId(),
        name
    }

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const newFeature = category.features.create(feature);
                return res.status(201).json(newFeature)
            } else {
                return res.status(404).json({ message: "Category no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readCategoryFeature = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                return res.status(200).json({ feature });
            } else {
                res.status(404).json({ message: "Not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllCategoryFeatureItems = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const featureItems = category.features;
                return res.status(200).json({ featureItems });
            } else {
                res.status(404).json({ message: "Not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateCategoryFeature = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId } = req.params;

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    feature.set(req.body);
                    return res.status(200).json({ feature });
                } else {
                    return res.status(404).json({ message: 'Not found' });
                }
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteCategoryFeature = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId } = req.params;

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const initFeatureCount = category.features.length;
                const remainedItems = category.features.remove(featureId);

                if (remainedItems.length !== initFeatureCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Not found" });
                }
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createCategoryFeature,
    readCategoryFeature,
    readAllCategoryFeatureItems,
    updateCategoryFeature,
    deleteCategoryFeature
}