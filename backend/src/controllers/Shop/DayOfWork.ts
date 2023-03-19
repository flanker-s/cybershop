import { Request, Response, NextFunction } from 'express';
import Shop from '../../models/Shop.js';
import { Types } from 'mongoose';

const createDayOfWork = (req: Request, res: Response, next: NextFunction) => {

    const { shopId } = req.params;
    const { name, hours } = req.body;
    const dayOfWork = {
        name,
        hours
    }

    return Shop.findOneAndUpdate({ _id: shopId })
        .then((shop) => {
            if (shop) {
                const newBanner = shop.daysOfWork.create(dayOfWork);
                return res.status(201).json(newBanner);
            } else {
                return res.status(404).json({ message: "Shop no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readDayOfWork = (req: Request, res: Response, next: NextFunction) => {

    const { shopId, dayOfWorkId } = req.params;

    return Shop.findById(shopId)
        .then((shop) => {
            if (shop) {
                const dayOfWork = shop.daysOfWork.id(dayOfWorkId);
                if (dayOfWork) {
                    return res.status(200).json(dayOfWork);
                } else {
                    return res.status(404).json({ message: "Shop day of work not found" });
                }
            } else {
                return res.status(404).json({ message: "Shop not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllDayOfWorkItems = (req: Request, res: Response, next: NextFunction) => {

    const { shopId } = req.params;

    return Shop.findById(shopId)
        .then((shop) => {
            if (shop) {
                const dayOfWorkItems = shop.daysOfWork;
                return res.status(200).json({ dayOfWorkItems });
            } else {
                return res.status(404).json({ message: `Shop with an id:${shopId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateDayOfWork = (req: Request, res: Response, next: NextFunction) => {

    const { shopId, dayOfWorkId } = req.params;

    return Shop.findById(shopId)
        .then((shop) => {
            if (shop) {
                const dayOfWork = shop.daysOfWork.id(dayOfWorkId);
                if (dayOfWork) {
                    dayOfWork.set(req.body);
                    return shop.save()
                        .then(() => res.status(200).json(dayOfWork))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "Shop day of work not found" });
                }
            } else {
                return res.status(404).json({ message: "Shop not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteDayOfWork = (req: Request, res: Response, next: NextFunction) => {

    const { shopId, dayOfWorkId } = req.params;

    return Shop.findOneAndUpdate({ _id: shopId })
        .then((shop) => {
            if (shop) {
                const initBannerCount = shop.daysOfWork.length;
                const remainedItems = shop.daysOfWork.remove(dayOfWorkId);

                if (remainedItems.length !== initBannerCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "Shop day of work not found" });
                }
            } else {
                return res.status(404).json({ message: "Shop not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createDayOfWork,
    readDayOfWork,
    readAllDayOfWorkItems,
    updateDayOfWork,
    deleteDayOfWork
}