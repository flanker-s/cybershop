import express from 'express';
import controller from '../../controllers/User/User.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    body('password').isLength({ min: 5, max: 18 }),
    body('email').notEmpty(),
    body('phone').isMobilePhone('en-US'),
    body('isActivated'),
    body('avatar'),
    body('roleId').notEmpty(),
    controller.createUser);
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAllUserItems);
router.patch('/update/:userId',
    body('name'),
    body('password').optional().isLength({ min: 5, max: 18 }),
    body('email'),
    body('phone').optional().isMobilePhone('en-US'),
    body('isActivated'),
    body('avatar'),
    body('roleId'),
    controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export default router;