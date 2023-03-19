import { Request, Response, NextFunction } from 'express';
import Banner from '../../models/Banner.js';

const createBanner = (req: Request, res: Response, next: NextFunction) => {

    const { name, img, url, template } = req.body;
    const banner = new Banner({ name, img, url, template });

    return banner.save()
        .then(banner => res.status(201).json({ banner }))
        .catch(err => res.status(500).json({ err }));
}

const readBanner = (req: Request, res: Response, next: NextFunction) => {

    const bannerId = req.params.bannerId;

    return Banner.findById(bannerId)
        .then(banner => banner ? res.status(200).json({ banner })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllBannerItems = (req: Request, res: Response, next: NextFunction) => {
    return Banner.find()
        .then(bannerItems => res.status(200).json({ bannerItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateBanner = (req: Request, res: Response, next: NextFunction) => {

    const bannerId = req.params.bannerId;

    return Banner.findById(bannerId)
        .then((banner) => {
            if (banner) {
                banner.set(req.body);

                return banner.save()
                    .then(banner => res.status(200).json({ banner }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteBanner = (req: Request, res: Response, next: NextFunction) => {

    const bannerId = req.params.bannerId;

    return Banner.findByIdAndDelete(bannerId)
        .then(banner => banner ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createBanner, readBanner, readAllBannerItems, updateBanner, deleteBanner }