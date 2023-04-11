import express from "express";
import controller from "../../controllers/Article/Article.js";
import { body } from "express-validator";

const router = express.Router();

router.post('/create',
    body('name').notEmpty(),
    body('img').optional().isURL(),
    body('text'),
    controller.createArticle);
router.get('/get/:articleId', controller.readArticle);
router.get('/get', controller.readAllArticleItems);
router.patch('/update/:articleId',
    body('name'),
    body('img').optional().isURL(),
    body('text'),
    controller.updateArticle);
router.delete('/delete/:articleId', controller.deleteArticle);

export default router;