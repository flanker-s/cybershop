import { Request, Response, NextFunction } from 'express';
import Chat from '../../models/Chat.js';

const createChat = (req: Request, res: Response, next: NextFunction) => {

    const { } = req.body;
    const chat = new Chat({});

    return chat.save()
        .then(chat => res.status(201).json({ chat }))
        .catch(err => res.status(500).json({ err }));
}

const readChat = (req: Request, res: Response, next: NextFunction) => {

    const chatId = req.params.chatId;

    return Chat.findById(chatId)
        .then(chat => chat ? res.status(200).json({ chat })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllChatItems = (req: Request, res: Response, next: NextFunction) => {
    return Chat.find()
        .then(chatItems => res.status(200).json({ chatItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateChat = (req: Request, res: Response, next: NextFunction) => {

    const chatId = req.params.chatId;

    return Chat.findById(chatId)
        .then((chat) => {
            if (chat) {
                chat.set(req.body);

                return chat.save()
                    .then(chat => res.status(200).json({ chat }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteChat = (req: Request, res: Response, next: NextFunction) => {

    const chatId = req.params.chatId;

    return Chat.findByIdAndDelete(chatId)
        .then(chat => chat ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createChat, readChat, readAllChatItems, updateChat, deleteChat }