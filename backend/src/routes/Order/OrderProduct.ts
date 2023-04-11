import express from 'express';
import controller from '../../controllers/Order/OrderProduct.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('productId').notEmpty(),
    controller.createOrderProduct);
router.get('/get/:orderProductId', controller.readOrderProduct);
router.get('/get', controller.readAllOrderProductItems);
router.patch('/update/:orderProductId',
    body('productId'),
    controller.updateOrderProduct);
router.delete('/delete/:orderProductId', controller.deleteOrderProduct);

export default router;