import express from 'express';
import controller from '../../controllers/Banner/Banner.js';
import { body } from "express-validator";

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    body('img').isURL(),
    body('url').optional().isURL(),
    body('template').optional().isURL(),
    controller.createBanner);
router.get('/get/:bannerId', controller.readBanner);
router.get('/get', controller.readAllBannerItems);
router.patch('/update/:bannerId',
    body('name'),
    body('img').optional().isURL(),
    body('url').optional().isURL(),
    body('template').optional().isURL(),
    controller.updateBanner);
router.delete('/delete/:bannerId', controller.deleteBanner);

export default router;