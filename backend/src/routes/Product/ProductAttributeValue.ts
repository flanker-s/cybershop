import express from 'express';
import controller from '../../controllers/Product/ProductAttributeValue.js';
import { body } from "express-validator";

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('attributeId').notEmpty(),
    body('attributeValue').notEmpty(),
    controller.createProductAttributeValue);
router.get('/get/:attributeValueId', controller.readProductAttributeValue);
router.get('/get', controller.readAllProductAttributeValueItems);
router.patch('/update/:attributeValueId',
    body('attributeValue').notEmpty(),
    controller.updateProductAttributeValue);
router.delete('/delete/:attributeValueId', controller.deleteProductAttributeValue);

export default router;