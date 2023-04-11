import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import ValueList from '../../models/ValueList.js';
import { checkRoles } from '../../services/auth.js';
import { validationResult } from 'express-validator';

const createOption = async (req: Request, res: Response, next: NextFunction) => {
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
        const { value } = req.body;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        const option = valueList.options.push({
            value
        });
        await valueList.save();
        return res.status(201).json({ option });

    } catch (err) {
        next(err);
    }
}

const readOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { valueListId, optionId } = req.params;

        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        const option = valueList.options.id(optionId);
        if (!option) {
            throw ApiError.notFound('Option', optionId);
        }
        return res.status(200).json({ option });

    } catch (err) {
        next(err);
    }
}

const readAllOptionItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { valueListId } = req.params;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        const optionItems = valueList.options;
        return res.status(200).json({ optionItems });

    } catch (err) {
        next(err);
    }
}

const updateOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        }
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { valueListId, optionId } = req.params;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        const option = valueList.options.id(optionId);
        if (!option) {
            throw ApiError.notFound('Option', optionId);
        }
        option.set(req.body);
        await valueList.save();
        return res.status(200).json({ option });

    } catch (err) {
        next(err);
    }
}

const deleteOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { valueListId, optionId } = req.params;
        const valueList = await ValueList.findById(valueListId);
        if (!valueList) {
            throw ApiError.notFound('ValueList', valueListId);
        }
        const option = valueList.options.id(optionId);
        if (!option) {
            throw ApiError.notFound('Option', optionId);
        }
        valueList.options.remove(optionId);
        return res.status(204).json("deleted");

    } catch (err) {
        next(err);
    }
}

export default {
    createOption,
    readOption,
    readAllOptionItems,
    updateOption,
    deleteOption
}