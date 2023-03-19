import { Request, Response, NextFunction } from 'express';
import Shop from '../../models/Shop.js';

const createShop = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body;
    const shop = new Shop({ name });

    return shop.save()
        .then(shop => res.status(201).json({ shop }))
        .catch(err => res.status(500).json({ err }));
}

const readShop = (req: Request, res: Response, next: NextFunction) => {

    const shopId = req.params.shopId;

    return Shop.findById(shopId)
        .then(shop => shop ? res.status(200).json({ shop })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllShopItems = (req: Request, res: Response, next: NextFunction) => {
    return Shop.find()
        .then(shopItems => res.status(200).json({ shopItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateShop = (req: Request, res: Response, next: NextFunction) => {

    const shopId = req.params.shopId;

    return Shop.findById(shopId)
        .then((shop) => {
            if (shop) {
                shop.set(req.body);

                return shop.save()
                    .then(shop => res.status(200).json({ shop }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteShop = (req: Request, res: Response, next: NextFunction) => {

    const shopId = req.params.shopId;

    return Shop.findByIdAndDelete(shopId)
        .then(shop => shop ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createShop, readShop, readAllShopItems, updateShop, deleteShop }