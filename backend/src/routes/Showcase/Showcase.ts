import express from 'express';
import controller from '../../controllers/Showcase/Showcase.js';

const router = express.Router();

router.post('/create', controller.createShowcase);
router.get('/get/:showcaseId', controller.readShowcase);
router.get('/get', controller.readAllShowcaseItems);
router.patch('/update/:showcaseId', controller.updateShowcase);
router.delete('/delete/:showcaseId', controller.deleteShowcase);

export default router;