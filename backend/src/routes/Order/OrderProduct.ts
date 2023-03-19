import express from 'express';
import controller from '../../controllers/Order/OrderProduct.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createOrderProduct);
router.get('/get/:orderProductId', controller.readOrderProduct);
router.get('/get', controller.readAllOrderProductItems);
router.patch('/update/:orderProductId', controller.updateOrderProduct);
router.delete('/delete/:orderProductId', controller.deleteOrderProduct);

export default router;