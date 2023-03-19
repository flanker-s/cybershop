import express from "express";
import controller from "../../controllers/Article/Article.js";

const router = express.Router();

router.post('/create', controller.createArticle);
router.get('/get/:articleId', controller.readArticle);
router.get('/get', controller.readAllArticleItems);
router.patch('/update/:articleId', controller.updateArticle);
router.delete('/delete/:articleId', controller.deleteArticle);

export default router;