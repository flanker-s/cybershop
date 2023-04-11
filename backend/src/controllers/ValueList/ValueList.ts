import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import ValueList from '../../models/ValueList.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createValueList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name } = req.body;
        const valueList = await ValueList.create({ name });
        return res.status(201).json({ valueList });

    } catch (err) {
        next(err);
    }
}

const readValueList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { valueListId } = req.params;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        return res.status(200).json({ valueList });

    } catch (err) {
        next(err);
    }
}

const readAllValueListItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const valueListItems = await ValueList.find();
        return res.status(200).json({ valueListItems });

    } catch (err) {
        next(err);
    }
}

const updateValueList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { valueListId } = req.params;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        valueList.set(req.body);
        await valueList.save();
        return res.status(200).json({ valueList });

    } catch (err) {
        next(err);
    }
}

const deleteValueList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { valueListId } = req.params;
        const valueList = await ValueList.findByIdAndDelete(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        return res.status(204).json({ message: 'deleted' });

    } catch (err) {
        next(err);
    }
}

export default { createValueList, readValueList, readAllValueListItems, updateValueList, deleteValueList }