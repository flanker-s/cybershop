import express from 'express';
import controller from '../../controllers/DeliveryMethod/DeliveryMethod.js';

const router = express.Router();

router.post('/create', controller.createDeliveryMethod);
router.get('/get/:deliveryMethodId', controller.readDeliveryMethod);
router.get('/get', controller.readAllDeliveryMethodItems);
router.patch('/update/:deliveryMethodId', controller.updateDeliveryMethod);
router.delete('/delete/:deliveryMethodId', controller.deleteDeliveryMethod);

export default router;