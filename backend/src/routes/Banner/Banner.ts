import express from 'express';
import controller from '../../controllers/Banner/Banner.js';

const router = express.Router();

router.post('/create', controller.createBanner);
router.get('/get/:bannerId', controller.readBanner);
router.get('/get', controller.readAllBannerItems);
router.patch('/update/:bannerId', controller.updateBanner);
router.delete('/delete/:bannerId', controller.deleteBanner);

export default router;