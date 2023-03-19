import express from 'express';
import controller from '../../controllers/Role/Role.js';

const router = express.Router();

router.get('/get/:roleId', controller.readRole);
router.get('/get', controller.readAllRoleItems);

export default router;