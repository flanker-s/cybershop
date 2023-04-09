import { Request, Response, NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';
import Role from '../../models/Role.js';
import { checkRoles } from '../../services/auth.js';

const readRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { roleId } = req.params;

        const role = await Role.findById(roleId);
        if (!role) {
            throw ApiError.notFound('Role', roleId);
        }
        return res.status(200).json({ role });

    } catch (err) {
        next(err);
    }
}

const readAllRoleItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'support'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const roleItems = await Role.find();
        return res.status(200).json({ roleItems });

    } catch (err) {
        next(err);
    }
}

export default { readRole, readAllRoleItems }