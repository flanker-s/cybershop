import express from 'express';
import controller from '../../controllers/Order/Order.js';
import orderProductRouts from './OrderProduct.js';

const router = express.Router();

router.use('/:orderId/products', orderProductRouts);

router.post('/create', controller.createOrder);
router.get('/get/:orderId', controller.readOrder);
router.get('/get', controller.readAllOrderItems);
router.patch('/update/:orderId', controller.updateOrder);
router.delete('/delete/:orderId', controller.deleteOrder);

export default router;