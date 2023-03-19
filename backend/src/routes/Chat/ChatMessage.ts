import express from 'express';
import controller from '../../controllers/Chat/ChatMessage.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createChatMessage);
router.get('/get/:messageId', controller.readChatMessage);
router.get('/get', controller.readAllChatMessageItems);
router.patch('/update/:messageId', controller.updateChatMessage);
router.delete('/delete/:messageId', controller.deleteChatMessage);

export default router;