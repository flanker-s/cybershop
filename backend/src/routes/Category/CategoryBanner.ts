import express from 'express';
import controller from '../../controllers/Category/CategoryBanner.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('name').notEmpty(),
    body('img').isURL(),
    body('url').optional().isURL(),
    controller.createCategoryBanner);
router.get('/get/:categoryBannerId', controller.readCategoryBanner);
router.get('/get', controller.readAllCategoryBannerItems);
router.patch('/update/:categoryBannerId',
    body('name'),
    body('img').optional().isURL(),
    body('url').optional().isURL(),
    controller.updateCategoryBanner);
router.delete('/delete/:categoryBannerId', controller.deleteCategoryBanner);

export default router;