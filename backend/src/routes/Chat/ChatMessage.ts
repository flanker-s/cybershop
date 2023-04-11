import express from 'express';
import controller from '../../controllers/Chat/ChatMessage.js';
import { body } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.post('/create',
    body('text').notEmpty(),
    controller.createChatMessage);
router.get('/get/:messageId', controller.readChatMessage);
router.get('/get', controller.readAllChatMessageItems);
router.patch('/update/:messageId',
    body('text'),
    controller.updateChatMessage);
router.delete('/delete/:messageId', controller.deleteChatMessage);

export default router;