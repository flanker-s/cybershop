import express from 'express';
import controller from '../../controllers/Product/Product.js';
import productAttributeValueRoutes from './ProductAttributeValue.js';
import productCommentRoutes from './ProductComment.js';

const router = express.Router();

router.use('/:productId/attribute-values', productAttributeValueRoutes);
router.use('/:productId/comments', productCommentRoutes);

router.post('/create', controller.createProduct);
router.get('/get/:productId', controller.readProduct);
router.get('/get', controller.readAllProductItems);
router.patch('/update/:productId', controller.updateProduct);
router.delete('/delete/:productId', controller.deleteProduct);

export default router;