import express from 'express';
import controller from '../../controllers/PaymentMethod/PaymentMethod.js';

const router = express.Router();

router.post('/create', controller.createPaymentMethod);
router.get('/get/:paymentMethodId', controller.readPaymentMethod);
router.get('/get', controller.readAllPaymentMethodItems);
router.patch('/update/:paymentMethodId', controller.updatePaymentMethod);
router.delete('/delete/:paymentMethodId', controller.deletePaymentMethod);

export default router;