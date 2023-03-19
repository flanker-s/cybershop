import { Request, Response, NextFunction } from 'express';
import Role from '../../models/Role.js';

const readRole = (req: Request, res: Response, next: NextFunction) => {

    const roleId = req.params.roleId;

    return Role.findById(roleId)
        .then(role => role ? res.status(200).json({ role })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllRoleItems = (req: Request, res: Response, next: NextFunction) => {
    return Role.find()
        .then(roleItems => res.status(200).json({ roleItems }))
        .catch(err => res.status(500).json({ err }));
}

export default { readRole, readAllRoleItems }