import mongoose, { Document, Schema } from "mongoose";

export interface IArticle {
    name: string,
    img: string,
    text: string
}

export interface IArticleModel extends IArticle, Document { }

const ArticleSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        img: { type: String },
        text: { type: String }
    },
    {
        collection: "articles", versionKey: false, timestamps: true
    });

export default mongoose.model<IArticleModel>('Article', ArticleSchema);