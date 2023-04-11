import express from 'express';
import controller from '../../controllers/DeliveryMethod/DeliveryMethod.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    controller.createDeliveryMethod);
router.get('/get/:deliveryMethodId', controller.readDeliveryMethod);
router.get('/get', controller.readAllDeliveryMethodItems);
router.patch('/update/:deliveryMethodId',
    body('name'),
    controller.updateDeliveryMethod);
router.delete('/delete/:deliveryMethodId', controller.deleteDeliveryMethod);

export default router;