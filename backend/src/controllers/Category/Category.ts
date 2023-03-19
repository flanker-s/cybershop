import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category.js';

const createCategory = (req: Request, res: Response, next: NextFunction) => {

    const { name, icon } = req.body;
    const category = new Category({ name, icon });

    return category.save()
        .then(category => res.status(201).json({ category }))
        .catch(err => res.status(500).json({ err }));
}

const readCategory = (req: Request, res: Response, next: NextFunction) => {

    const categoryId = req.params.categoryId;

    return Category.findById(categoryId)
        .then(category => category ? res.status(200).json({ category })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllCategoryItems = (req: Request, res: Response, next: NextFunction) => {
    return Category.find()
        .then(categoryItems => res.status(200).json({ categoryItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateCategory = (req: Request, res: Response, next: NextFunction) => {

    const categoryId = req.params.categoryId;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                category.set(req.body);

                return category.save()
                    .then(category => res.status(201).json({ category }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {

    const categoryId = req.params.categoryId;

    return Category.findByIdAndDelete(categoryId)
        .then(category => category ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createCategory, readCategory, readAllCategoryItems, updateCategory, deleteCategory }