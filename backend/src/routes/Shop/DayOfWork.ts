import express from 'express';
import controller from '../../controllers/Shop/DayOfWork.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('name').notEmpty(),
    body('hours').notEmpty(),
    controller.createDayOfWork);
router.get('/get/:dayOfWorkId', controller.readDayOfWork);
router.get('/get', controller.readAllDayOfWorkItems);
router.patch('/update/:dayOfWorkId',
    body('name'),
    body('hours'),
    controller.updateDayOfWork);
router.delete('/delete/:dayOfWorkId', controller.deleteDayOfWork);

export default router;