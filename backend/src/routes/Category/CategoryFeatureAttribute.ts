import express from 'express';
import controller from '../../controllers/Category/CategoryFeatureAttribute.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createCategoryFeatureAttribute);
router.get('/get/:attributeId', controller.readCategoryFeatureAttribute);
router.get('/get', controller.readAllCategoryFeatureAttributeItems);
router.patch('/update/:attributeId', controller.updateCategoryFeatureAttribute);
router.delete('/delete/:attributeId', controller.deleteCategoryFeatureAttribute);

export default router;