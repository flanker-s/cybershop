import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Log from '../../models/Log.js';

const readLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { logId } = req.params;

        const log = await Log.findById(logId);
        if (!log) {
            throw ApiError.notFound('Log', logId);
        }
        return res.status(200).json({ log });

    } catch (err) {
        next(err);
    }
}

const readAllLogItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logItems = await Log.find();
        return res.status(200).json({ logItems })

    } catch (err) {
        next(err);
    }
}

const deleteAllLogItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Log.deleteMany({});
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { readLog, readAllLogItems, deleteAllLogItems }