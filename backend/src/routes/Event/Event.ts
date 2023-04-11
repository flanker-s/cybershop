import express from 'express';
import controller from '../../controllers/Event/Event.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    body('img').optional().isURL(),
    body('url').optional().isURL(),
    body('text').notEmpty(),
    controller.createEvent);
router.get('/get/:eventId', controller.readEvent);
router.get('/get', controller.readAllEventItems);
router.patch('/update/:eventId',
    body('name'),
    body('img').optional().isURL(),
    body('url').optional().isURL(),
    body('text'),
    controller.updateEvent);
router.delete('/delete/:eventId', controller.deleteEvent);

export default router;