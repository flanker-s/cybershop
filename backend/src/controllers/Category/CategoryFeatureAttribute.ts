import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';

const createCategoryFeatureAttribute = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId } = req.params;
    const { name, type } = req.body;
    let attribute = { name, type, valueListId: null }

    if (type === "reference") {
        const { valueListId } = req.body;
        if (valueListId) {
            attribute.valueListId = valueListId;
        } else {
            return res.status(400).json({
                message: "The 'valueListId' field is required " +
                    "for attributes of type 'reference'. Please provide a valid valueListId."
            });
        }
    }
    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    const newAttribute = feature.attributes.create(attribute);
                    return res.status(201).json({ newAttribute });
                } else {
                    return res.status(404).json({ message: "Feature non found" });
                }
            } else {
                return res.status(404).json({ message: "Category no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readCategoryFeatureAttribute = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId, attributeId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    const attribute = feature.attributes.id(attributeId);
                    if (attribute) {
                        return res.status(200).json({ attribute });
                    } else {
                        res.status(404).json({ message: "Attribute ot found" });
                    }
                } else {
                    res.status(404).json({ message: "Feature not found" });
                }
                return res.status(200).json({ feature });
            } else {
                res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllCategoryFeatureAttributeItems = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    const attributeItems = feature.attributes;
                    return res.status(200).json({ attributeItems });
                } else {
                    res.status(404).json({ message: "Feature not found" });
                }
            } else {
                res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateCategoryFeatureAttribute = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId, attributeId } = req.params;

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    const attribute = feature.attributes.id(attributeId);
                    if (attribute) {
                        attribute.set(req.body);
                        return res.status(200).json({ attribute });
                    } else {
                        return res.status(404).json({ message: 'Attribute not found' });
                    }
                } else {
                    return res.status(404).json({ message: 'Feature not found' });
                }
            } else {
                return res.status(404).json({ message: 'Category not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteCategoryFeatureAttribute = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, featureId, attributeId } = req.params;

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const feature = category.features.id(featureId);
                if (feature) {
                    const initAttributeCount = feature.attributes.length;
                    const remainedItems = feature.attributes.remove(featureId);

                    if (remainedItems.length !== initAttributeCount) {
                        return res.status(204).json("deleted");
                    } else {
                        return res.status(404).json({ message: "Attribute not found" });
                    }
                } else {
                    return res.status(404).json({ message: "Feature not found" });
                }
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createCategoryFeatureAttribute,
    readCategoryFeatureAttribute,
    readAllCategoryFeatureAttributeItems,
    updateCategoryFeatureAttribute,
    deleteCategoryFeatureAttribute
}