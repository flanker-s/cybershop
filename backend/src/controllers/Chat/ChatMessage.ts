import { Request, Response, NextFunction } from 'express';
import Chat from '../../models/Chat.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkOwner, checkRoles, getCurrentUser } from "../../services/auth.js";
import IHasOwner from '../../models/interfaces/IHasOwner.js';

const createChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { chatId } = req.params;
        const { text } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        const message = chat.messages.create({
            userId: getCurrentUser(req).id,
            text
        });
        if (await checkRoles(req, roles) || await checkOwner(req, message as IHasOwner)) {
            await chat.save();
            return res.status(201).json(message);
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { chatId, messageId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        const message = chat.messages.id(messageId);
        if (!message) {
            throw ApiError.notFound('Message', messageId);
        }
        if (await checkRoles(req, roles) || await checkOwner(req, message as IHasOwner)) {
            return res.status(200).json(message);
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readAllChatMessageItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        if (await checkRoles(req, roles) || await checkOwner(req, chat as IHasOwner)) {
            const messageItems = chat.messages;
            return res.status(200).json({ messageItems });
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const updateChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        const { chatId, messageId } = req.params;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        const message = chat.messages.id(messageId);
        if (!message) {
            throw ApiError.notFound('Message', messageId);
        }
        if (await checkRoles(req, roles) || await checkOwner(req, message as IHasOwner)) {
            message.set(req.body);
            await chat.save();
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const deleteChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        const { chatId, messageId } = req.params;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        const message = chat.messages.id(messageId);
        if (!message) {
            throw ApiError.notFound('Message', messageId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, message as IHasOwner)) {
            chat.messages.remove(messageId);
            return res.status(204).json("deleted");
        }

    } catch (err) {
        next(err);
    }
}

export default {
    createChatMessage,
    readChatMessage,
    readAllChatMessageItems,
    updateChatMessage,
    deleteChatMessage
}