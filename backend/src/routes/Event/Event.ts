import express from 'express';
import controller from '../../controllers/Event/Event.js';

const router = express.Router();

router.post('/create', controller.createEvent);
router.get('/get/:eventId', controller.readEvent);
router.get('/get', controller.readAllEventItems);
router.patch('/update/:eventId', controller.updateEvent);
router.delete('/delete/:eventId', controller.deleteEvent);

export default router;