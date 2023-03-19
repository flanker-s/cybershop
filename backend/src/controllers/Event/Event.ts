import { Request, Response, NextFunction } from 'express';
import Event from '../../models/Event.js';

const createEvent = (req: Request, res: Response, next: NextFunction) => {

    const { name, img, url, text } = req.body;
    const event = new Event({ name, img, url, text });

    return event.save()
        .then(event => res.status(201).json({ event }))
        .catch(err => res.status(500).json({ err }));
}

const readEvent = (req: Request, res: Response, next: NextFunction) => {

    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then(event => event ? res.status(200).json({ event })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllEventItems = (req: Request, res: Response, next: NextFunction) => {
    return Event.find()
        .then(eventItems => res.status(200).json({ eventItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateEvent = (req: Request, res: Response, next: NextFunction) => {

    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => {
            if (event) {
                event.set(req.body);

                return event.save()
                    .then(event => res.status(200).json({ event }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteEvent = (req: Request, res: Response, next: NextFunction) => {

    const eventId = req.params.eventId;

    return Event.findByIdAndDelete(eventId)
        .then(event => event ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createEvent, readEvent, readAllEventItems, updateEvent, deleteEvent }