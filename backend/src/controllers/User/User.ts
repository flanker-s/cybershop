import { Request, Response, NextFunction } from 'express';
import User from '../../models/User.js';

const createUser = (req: Request, res: Response, next: NextFunction) => {

    const { name, password, phone, email, address, roleId } = req.body;
    const user = new User({ name, password, email, phone, address, roleId, isActivated: false });

    return user.save()
        .then(user => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ err }));
}

const readUser = (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    return User.findById(userId)
        .then(user => user ? res.status(200).json({ user })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllUserItems = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then(userItems => res.status(200).json({ userItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user.save()
                    .then(user => res.status(200).json({ user }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then(user => user ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createUser, readUser, readAllUserItems, updateUser, deleteUser }