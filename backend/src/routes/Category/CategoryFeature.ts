import express from 'express';
import controller from '../../controllers/Category/CategoryFeature.js';
import categoryFeatureAttributeRoutes from './CategoryFeatureAttribute.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.use('/:featureId/attributes', categoryFeatureAttributeRoutes);

router.post('/create',
    body('name').notEmpty(),
    controller.createCategoryFeature);
router.get('/get/:featureId', controller.readCategoryFeature);
router.get('/get', controller.readAllCategoryFeatureItems);
router.patch('/update/:featureId',
    body('name'),
    controller.updateCategoryFeature);
router.delete('/delete/:featureId', controller.deleteCategoryFeature);

export default router;