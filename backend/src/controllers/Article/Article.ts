import { Request, Response, NextFunction } from "express";
import Article from "../../models/Article.js";

const createArticle = (req: Request, res: Response, next: NextFunction) => {

    const { name, img, text } = req.body;
    const article = new Article({ name, img, text });

    article.save()
        .then(article => res.status(201).json({ article }))
        .catch(err => res.status(500).json({ err }));
}

const readArticle = (req: Request, res: Response, next: NextFunction) => {

    const articleId = req.params.articleId;

    return Article.findById(articleId)
        .then(article => article ? res.status(200).json({ article })
            : res.status(404).json({ message: "Not found" }))
        .catch(err => res.status(500).json({ err }));
}

const readAllArticleItems = (req: Request, res: Response, next: NextFunction) => {
    return Article.find()
        .then(articleItems => res.status(200).json({ articleItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateArticle = (req: Request, res: Response, next: NextFunction) => {

    const articleId = req.params.articleId;

    return Article.findById(articleId)
        .then((article) => {
            if (article) {
                article.set(req.body);

                return article.save()
                    .then(article => res.status(200).json({ article }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;
    return Article.findByIdAndDelete(articleId)
        .then(article => article ? res.status(204).json({ message: "deleted" })
            : res.status(404).json({ message: "Not found" }))
        .catch(err => res.status(500).json({ err }));
}

export default { createArticle, readArticle, readAllArticleItems, updateArticle, deleteArticle }