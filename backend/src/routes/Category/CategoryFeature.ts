import express from 'express';
import controller from '../../controllers/Category/CategoryFeature.js';
import categoryFeatureAttributeRoutes from './CategoryFeatureAttribute.js';

const router = express.Router({ mergeParams: true });

router.use('/:featureId/attributes', categoryFeatureAttributeRoutes);

router.post('/create', controller.createCategoryFeature);
router.get('/get/:featureId', controller.readCategoryFeature);
router.get('/get', controller.readAllCategoryFeatureItems);
router.patch('/update/:featureId', controller.updateCategoryFeature);
router.delete('/delete/:featureId', controller.deleteCategoryFeature);

export default router;