import { Request, Response, NextFunction } from "express";
import Article from "../../models/Article.js";
import ApiError from "../../exceptions/ApiError.js";
import { checkRoles } from "../../services/auth.js";

const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { name, img, text } = req.body;
        const article = await Article.create({ name, img, text });
        return res.status(201).json({ article });

    } catch (err) {
        next(err);
    }
}

const readArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);
        if (!article) {
            throw ApiError.notFound('Article', articleId);
        }
        return res.status(200).json({ article });

    } catch (err) {
        next(err);
    }
}

const readAllArticleItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articleItems = await Article.find();
        return res.status(200).json({ articleItems });
    } catch (err) {
        next(err);
    }
}

const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const { articleId } = req.params;
        const article = await Article.findById(articleId)
        if (!article) {
            throw ApiError.notFound('Article', articleId);
        }
        article.set(req.body);
        await article.save();
        return res.status(200).json({ article });

    } catch (err) {
        next(err);
    }
}

const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = ['admin', 'contentManager'];
        if (!await checkRoles(req, roles)) {
            throw ApiError.forbidden();
        }
        const articleId = req.params.articleId;
        const article = await Article.findByIdAndDelete(articleId);
        if (!article) {
            throw ApiError.notFound('Article', articleId);
        }
        return res.status(204).json({ message: "deleted" });

    } catch (err) {
        next(err);
    }
}

export default {
    createArticle,
    readArticle,
    readAllArticleItems,
    updateArticle,
    deleteArticle
}