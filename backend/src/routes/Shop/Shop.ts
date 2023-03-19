import express from 'express';
import controller from '../../controllers/Shop/Shop.js';
import dayOfWorkRoutes from './DayOfWork.js';

const router = express.Router();

router.use('/:shopId/days-of-work', dayOfWorkRoutes);

router.post('/create', controller.createShop);
router.get('/get/:shopId', controller.readShop);
router.get('/get', controller.readAllShopItems);
router.patch('/update/:shopId', controller.updateShop);
router.delete('/delete/:shopId', controller.deleteShop);

export default router;