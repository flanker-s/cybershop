import express from 'express';
import controller from '../../controllers/Category/CategoryBanner.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createCategoryBanner);
router.get('/get/:categoryBannerId', controller.readCategoryBanner);
router.get('/get', controller.readAllCategoryBannerItems);
router.patch('/update/:categoryBannerId', controller.updateCategoryBanner);
router.delete('/delete/:categoryBannerId', controller.deleteCategoryBanner);

export default router;