import express from 'express';
import controller from '../../controllers/ValueList/ValueList.js';
import optionRoutes from './Option.js';
import { body } from 'express-validator';

const router = express.Router();

router.use('/:valueListId/options', optionRoutes);

router.post('/create',
    body('name').notEmpty(),
    controller.createValueList);
router.get('/get/:valueListId', controller.readValueList);
router.get('/get', controller.readAllValueListItems);
router.patch('/update/:valueListId',
    body('name'),
    controller.updateValueList);
router.delete('/delete/:valueListId', controller.deleteValueList);

export default router;