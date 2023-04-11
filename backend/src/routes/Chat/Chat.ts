import express from 'express';
import controller from '../../controllers/Chat/Chat.js';
import chatMessageRouts from './ChatMessage.js';
import { body } from 'express-validator';

const router = express.Router();

router.use('/:chatId/messages', chatMessageRouts)

router.post('/create', controller.createChat);
router.get('/get/:chatId', controller.readChat);
router.get('/get', controller.readAllChatItems);
router.delete('/delete/:chatId', controller.deleteChat);

export default router;