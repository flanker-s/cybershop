import express from 'express';
import controller from '../../controllers/PaymentMethod/PaymentMethod.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    controller.createPaymentMethod);
router.get('/get/:paymentMethodId', controller.readPaymentMethod);
router.get('/get', controller.readAllPaymentMethodItems);
router.patch('/update/:paymentMethodId',
    body('name'),
    controller.updatePaymentMethod);
router.delete('/delete/:paymentMethodId', controller.deletePaymentMethod);

export default router;