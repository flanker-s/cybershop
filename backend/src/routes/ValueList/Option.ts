import express from 'express';
import controller from '../../controllers/ValueList/Option.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createOption);
router.get('/get/:optionId', controller.readOption);
router.get('/get', controller.readAllOptionItems);
router.patch('/update/:optionId', controller.updateOption);
router.delete('/delete/:optionId', controller.deleteOption);

export default router;