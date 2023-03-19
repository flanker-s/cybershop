import express from 'express';
import controller from '../../controllers/Product/ProductAttributeValue.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createProductAttributeValue);
router.get('/get/:attributeValueId', controller.readProductAttributeValue);
router.get('/get', controller.readAllProductAttributeValueItems);
router.patch('/update/:attributeValueId', controller.updateProductAttributeValue);
router.delete('/delete/:attributeValueId', controller.deleteProductAttributeValue);

export default router;