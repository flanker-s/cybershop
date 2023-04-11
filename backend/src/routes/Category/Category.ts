import express from 'express';
import controller from '../../controllers/Category/Category.js';
import categoryBannerRoutes from "./CategoryBanner.js";
import categoryFeatureRoutes from "./CategoryFeature.js";
import { body } from 'express-validator';

const router = express.Router();

router.use('/:categoryId/banners', categoryBannerRoutes);
router.use('/:categoryId/features', categoryFeatureRoutes);

router.post('/create',
    body('name').notEmpty(),
    body('parentId'),
    body('icon').optional().isURL(),
    controller.createCategory);
router.get('/get/:categoryId', controller.readCategory);
router.get('/get', controller.readAllCategoryItems);
router.patch('/update/:categoryId',
    body('name'),
    body('parentId'),
    body('icon').optional().isURL(),
    controller.updateCategory);
router.delete('/delete/:categoryId', controller.deleteCategory);

export default router;