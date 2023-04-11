import { Request, Response, NextFunction } from 'express';
import Chat from '../../models/Chat.js';
import ApiError from "../../exceptions/ApiError.js";
import { checkOwner, checkRoles, getCurrentUser } from "../../services/auth.js";
import IHasOwner from '../../models/interfaces/IHasOwner.js';

const createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = getCurrentUser(req);
        const chat = await Chat.create({ userId: currentUser.id });
        return res.status(201).json({ chat });

    } catch (err) {
        next(err);
    }
}

const readChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        if (await checkRoles(req, roles) || checkOwner(req, chat as IHasOwner)) {
            return res.status(200).json({ chat });
        } else {
            throw ApiError.forbidden();
        }

    } catch (err) {
        next(err);
    }
}

const readAllChatItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'shipper', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const chatItems = await Chat.find();
        return res.status(200).json({ chatItems });

    } catch (err) {
        next(err);
    }
}

const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const chatId = req.params.chatId;
        const chat = await Chat.findByIdAndDelete(chatId);
        if (!chat) {
            throw ApiError.notFound('Chat', chatId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createChat, readChat, readAllChatItems, deleteChat }