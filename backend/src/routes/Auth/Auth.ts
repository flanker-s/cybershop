import express from "express";
import controller from "../../controllers/Auth/Auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post('/register',
    body('name').notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').notEmpty().isLength({ min: 6, max: 16 }),
    body('phone').notEmpty().isMobilePhone("en-US"),
    controller.register);
router.post('/login',
    body('email').isEmail().notEmpty(),
    body('password').notEmpty(),
    controller.login);
router.post('/logout', controller.logout);
router.get('/refresh', controller.refresh);
router.get('/activate/:link', controller.activate);

export default router;