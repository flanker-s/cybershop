import { Request, Response, NextFunction } from 'express';
import Log from '../../models/Log.js';

const readLog = (req: Request, res: Response, next: NextFunction) => {

    const logId = req.params.logId;

    return Log.findById(logId)
        .then(log => log ? res.status(200).json({ log })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllLogItems = (req: Request, res: Response, next: NextFunction) => {
    return Log.find()
        .then(logItems => res.status(200).json({ logItems }))
        .catch(err => res.status(500).json({ err }));
}

const deleteAllLogItems = (req: Request, res: Response, next: NextFunction) => {
    return Log.deleteMany({})
        .then(() => res.status(204).json({ message: 'deleted' }))
        .catch(err => res.status(500).json({ err }));
}

export default { readLog, readAllLogItems, deleteAllLogItems }