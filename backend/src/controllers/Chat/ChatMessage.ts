import { Request, Response, NextFunction } from 'express';
import Chat from '../../models/Chat.js';

const createChatMessage = (req: Request, res: Response, next: NextFunction) => {

    const { chatId } = req.params;
    const { userId, text } = req.body;
    const message = {
        userId, //TODO: replace this with currently aunthificated user id
        text
    }

    return Chat.findOneAndUpdate({ _id: chatId })
        .then((chat) => {
            if (chat) {
                const newMessage = chat.messages.create(message);
                return res.status(201).json(newMessage);
            } else {
                return res.status(404).json({ message: "Chat no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readChatMessage = (req: Request, res: Response, next: NextFunction) => {

    const { chatId, messageId } = req.params;

    return Chat.findById(chatId)
        .then((chat) => {
            if (chat) {
                const message = chat.messages.id(messageId);
                if (message) {
                    return res.status(200).json(message);
                } else {
                    return res.status(404).json({ message: "Chat message not found" });
                }
            } else {
                return res.status(404).json({ message: "Chat not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllChatMessageItems = (req: Request, res: Response, next: NextFunction) => {

    const { chatId } = req.params;

    return Chat.findById(chatId)
        .then((chat) => {
            if (chat) {
                const messageItems = chat.messages;
                return res.status(200).json({ messageItems });
            } else { //TODO: add id to all not found response messages
                return res.status(404).json({ message: `Chat with an id:${chatId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateChatMessage = (req: Request, res: Response, next: NextFunction) => {

    const { chatId, messageId } = req.params;

    return Chat.findById(chatId)
        .then((chat) => {
            if (chat) {
                const message = chat.messages.id(messageId);
                if (message) {
                    message.set(req.body);
                    return chat.save()
                        .then(() => res.status(200).json(message))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Chat message not found" });
                }
            } else {
                return res.status(404).json({ message: "Chat not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteChatMessage = (req: Request, res: Response, next: NextFunction) => {

    const { chatId, messageId } = req.params;

    return Chat.findOneAndUpdate({ _id: chatId })
        .then((chat) => {
            if (chat) {
                const initMessageCount = chat.messages.length;
                const remainedItems = chat.messages.remove(messageId);

                if (remainedItems.length !== initMessageCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Chat message not found" });
                }
            } else {
                return res.status(404).json({ message: "Chat not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createChatMessage,
    readChatMessage,
    readAllChatMessageItems,
    updateChatMessage,
    deleteChatMessage
}