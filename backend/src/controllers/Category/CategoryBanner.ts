import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';
import { Types } from 'mongoose';

const createCategoryBanner = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId } = req.params;
    const { name, img, url } = req.body;
    const categoryBanner = {
        _id: new Types.ObjectId(), //TODO: remove all document explicite id definitions
        name,
        img,
        url
    }

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const newBanner = category.categoryBanners.create(categoryBanner);
                return res.status(201).json(newBanner);
            } else {
                return res.status(404).json({ message: "Category no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readCategoryBanner = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, categoryBannerId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const categoryBanner = category.categoryBanners.id(categoryBannerId);
                if (categoryBanner) {
                    return res.status(200).json(categoryBanner);
                } else {
                    return res.status(404).json({ message: "Category banner not found" });
                }
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllCategoryBannerItems = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const categoryBannerItems = category.categoryBanners;
                return res.status(200).json({ categoryBannerItems });
            } else {
                return res.status(404).json({ message: `Category with an id:${categoryId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateCategoryBanner = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, categoryBannerId } = req.params;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                const categoryBanner = category.categoryBanners.id(categoryBannerId);
                if (categoryBanner) {
                    categoryBanner.set(req.body);
                    return category.save()
                        .then(() => res.status(200).json(categoryBanner))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Category banner not found" });
                }
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteCategoryBanner = (req: Request, res: Response, next: NextFunction) => {

    const { categoryId, categoryBannerId } = req.params;

    return Category.findOneAndUpdate({ _id: categoryId })
        .then((category) => {
            if (category) {
                const initBannerCount = category.categoryBanners.length;
                const remainedItems = category.categoryBanners.remove(categoryBannerId);

                if (remainedItems.length !== initBannerCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Category banner not found" });
                }
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createCategoryBanner,
    readCategoryBanner,
    readAllCategoryBannerItems,
    updateCategoryBanner,
    deleteCategoryBanner
}