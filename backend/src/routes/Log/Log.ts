import express from 'express';
import controller from '../../controllers/Log/Log.js';

const router = express.Router();

router.get('/get/:logId', controller.readLog);
router.get('/get', controller.readAllLogItems);
router.delete('/delete', controller.deleteAllLogItems);

export default router;