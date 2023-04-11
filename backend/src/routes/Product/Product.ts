import express from 'express';
import controller from '../../controllers/Product/Product.js';
import productAttributeValueRoutes from './ProductAttributeValue.js';
import productCommentRoutes from './ProductComment.js';
import { body } from 'express-validator';

const router = express.Router();

router.use('/:productId/attribute-values', productAttributeValueRoutes);
router.use('/:productId/comments', productCommentRoutes);

router.post('/create',
    body('name').notEmpty(),
    body('preview').optional().isURL(),
    body('images').isArray(),
    body('price').isDecimal(),
    body('status').notEmpty(),
    body('description'),
    body('categoryId').notEmpty(),
    body('colorId'),
    body('review'),
    controller.createProduct);
router.get('/get/:productId', controller.readProduct);
router.get('/get', controller.readAllProductItems);
router.patch('/update/:productId',
    body('name'),
    body('preview').optional().isURL(),
    body('images').optional().isArray(),
    body('price').optional().isDecimal(),
    body('status'),
    body('description'),
    body('categoryId'),
    body('colorId'),
    body('review'),
    controller.updateProduct);
router.delete('/delete/:productId', controller.deleteProduct);

export default router;