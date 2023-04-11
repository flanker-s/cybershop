import express from 'express';
import controller from '../../controllers/Product/ProductComment.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('rating').notEmpty(),
    body('text').notEmpty(),
    controller.createProductComment);
router.get('/get/:variablenameId', controller.readProductComment);
router.get('/get', controller.readAllProductCommentItems);
router.patch('/update/:variablenameId',
    body('rating'),
    body('text'),
    controller.updateProductComment);
router.delete('/delete/:variablenameId', controller.deleteProductComment);

export default router;