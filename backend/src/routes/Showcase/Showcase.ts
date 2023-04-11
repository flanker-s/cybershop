import express from 'express';
import controller from '../../controllers/Showcase/Showcase.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    body('template').isURL(),
    body('productIds').isArray(),
    controller.createShowcase);
router.get('/get/:showcaseId', controller.readShowcase);
router.get('/get', controller.readAllShowcaseItems);
router.patch('/update/:showcaseId',
    body('name'),
    body('template'),
    body('productIds'),
    controller.updateShowcase);
router.delete('/delete/:showcaseId', controller.deleteShowcase);

export default router;