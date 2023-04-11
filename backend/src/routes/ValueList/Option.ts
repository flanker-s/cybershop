import express from 'express';
import controller from '../../controllers/ValueList/Option.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('value').notEmpty(),
    controller.createOption);
router.get('/get/:optionId', controller.readOption);
router.get('/get', controller.readAllOptionItems);
router.patch('/update/:optionId',
    body('value'),
    controller.updateOption);
router.delete('/delete/:optionId', controller.deleteOption);

export default router;