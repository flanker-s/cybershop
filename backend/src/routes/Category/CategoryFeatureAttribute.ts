import express from 'express';
import controller from '../../controllers/Category/CategoryFeatureAttribute.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('name').notEmpty(),
    body('type').notEmpty(),
    body('valueListId'),
    controller.createCategoryFeatureAttribute);
router.get('/get/:attributeId', controller.readCategoryFeatureAttribute);
router.get('/get', controller.readAllCategoryFeatureAttributeItems);
router.patch('/update/:attributeId',
    body('name'),
    body('type'),
    body('valueListId'),
    controller.updateCategoryFeatureAttribute);
router.delete('/delete/:attributeId', controller.deleteCategoryFeatureAttribute);

export default router;