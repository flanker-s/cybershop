import express from "express";
import controller from "../../controllers/Auth/Auth.js"

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/refresh', controller.refresh);
router.get('/activate/:link', controller.activate);

export default router;