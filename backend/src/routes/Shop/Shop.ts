import express from 'express';
import controller from '../../controllers/Shop/Shop.js';
import dayOfWorkRoutes from './DayOfWork.js';
import { body } from 'express-validator';

const router = express.Router();

router.use('/:shopId/days-of-work', dayOfWorkRoutes);

router.post('/create',
    body('name').notEmpty(),
    body('holidays'),
    controller.createShop);
router.get('/get/:shopId', controller.readShop);
router.get('/get', controller.readAllShopItems);
router.patch('/update/:shopId',
    body('name'),
    body('holidays'),
    controller.updateShop);
router.delete('/delete/:shopId', controller.deleteShop);

export default router;