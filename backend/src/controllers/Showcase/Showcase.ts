import { Request, Response, NextFunction } from 'express';
import Showcase from '../../models/Showcase.js';

const createShowcase = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body;
    const showcase = new Showcase({ name });

    return showcase.save()
        .then(showcase => res.status(201).json({ showcase }))
        .catch(err => res.status(500).json({ err }));
}

const readShowcase = (req: Request, res: Response, next: NextFunction) => {

    const showcaseId = req.params.showcaseId;

    return Showcase.findById(showcaseId)
        .then(showcase => showcase ? res.status(200).json({ showcase })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllShowcaseItems = (req: Request, res: Response, next: NextFunction) => {
    return Showcase.find()
        .then(showcaseItems => res.status(200).json({ showcaseItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateShowcase = (req: Request, res: Response, next: NextFunction) => {

    const showcaseId = req.params.showcaseId;

    return Showcase.findById(showcaseId)
        .then((showcase) => {
            if (showcase) {
                showcase.set(req.body);

                return showcase.save()
                    .then(showcase => res.status(200).json({ showcase }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteShowcase = (req: Request, res: Response, next: NextFunction) => {

    const showcaseId = req.params.showcaseId;

    return Showcase.findByIdAndDelete(showcaseId)
        .then(showcase => showcase ? res.status(201).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createShowcase, readShowcase, readAllShowcaseItems, updateShowcase, deleteShowcase }