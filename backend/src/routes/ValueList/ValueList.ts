import express from 'express';
import controller from '../../controllers/ValueList/ValueList.js';
import optionRoutes from './Option.js';

const router = express.Router();

router.use('/:valueListId/options', optionRoutes);

router.post('/create', controller.createValueList);
router.get('/get/:valueListId', controller.readValueList);
router.get('/get', controller.readAllValueListItems);
router.patch('/update/:valueListId', controller.updateValueList);
router.delete('/delete/:valueListId', controller.deleteValueList);

export default router;