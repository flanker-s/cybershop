import express from 'express';
import controller from '../../controllers/Category/Category.js';
import categoryBannerRoutes from "./CategoryBanner.js";
import categoryFeatureRoutes from "./CategoryFeature.js";

const router = express.Router();

router.use('/:categoryId/banners', categoryBannerRoutes);
router.use('/:categoryId/features', categoryFeatureRoutes);

router.post('/create', controller.createCategory);
router.get('/get/:categoryId', controller.readCategory);
router.get('/get', controller.readAllCategoryItems);
router.patch('/update/:categoryId', controller.updateCategory);
router.delete('/delete/:categoryId', controller.deleteCategory);

export default router;