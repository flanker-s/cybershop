import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Event from '../../models/Event.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { name, img, url, text } = req.body;

        const event = await Event.create({ name, img, url, text });
        return res.status(201).json({ event });

    } catch (err) {
        next(err);
    }
}

const readEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            throw ApiError.notFound('Event', eventId);
        }
        return res.status(200).json({ event });
    } catch (err) {
        next(err);
    }
}

const readAllEventItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventItems = await Event.find();
        return res.status(200).json({ eventItems });

    } catch (err) {
        next(err);
    }
}

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            throw ApiError.notFound('Event', eventId);
        }
        event.set(req.body);
        await event.save();
        return res.status(200).json({ event });

    } catch (err) {
        next(err);
    }
}

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            throw ApiError.notFound('Event', eventId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createEvent, readEvent, readAllEventItems, updateEvent, deleteEvent }