import express from 'express';
import controller from '../../controllers/Shop/DayOfWork.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createDayOfWork);
router.get('/get/:dayOfWorkId', controller.readDayOfWork);
router.get('/get', controller.readAllDayOfWorkItems);
router.patch('/update/:dayOfWorkId', controller.updateDayOfWork);
router.delete('/delete/:dayOfWorkId', controller.deleteDayOfWork);

export default router;