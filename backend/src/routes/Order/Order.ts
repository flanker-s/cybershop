import express from 'express';
import controller from '../../controllers/Order/Order.js';
import orderProductRouts from './OrderProduct.js';
import { body } from 'express-validator';

const router = express.Router();

router.use('/:orderId/products', orderProductRouts);

router.post('/create',
    body('phone').isMobilePhone('en-US'),
    body('deliveryMethodId').notEmpty(),
    body('paymentMethodId').notEmpty(),
    controller.createOrder);
router.get('/get/:orderId', controller.readOrder);
router.get('/get', controller.readAllOrderItems);
router.patch('/update/:orderId',
    body('phone'),
    body('deliveryMethodId'),
    body('paymentMethodId'),
    body('status'),
    controller.updateOrder);
router.delete('/delete/:orderId', controller.deleteOrder);

export default router;