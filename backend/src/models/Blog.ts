import mongoose, { Document, Schema } from "mongoose";

export interface IBlog {
    name: string,
    articles: [{
        name: string,
        img: string,
        text: string
    }]
}

export interface IBlogModel extends IBlog, Document {}

const BlogSchema: Schema = new Schema(
{
    name: { type: String, required: true },
    articles: [{
        name: { type: String, required: true },
        img: { type: String },
        text: { type: String }
    }],
}, 
{ 
    collection: "blogs", versionKey: false, timestamps: true 
});

export default mongoose.model<IBlogModel>('Blog', BlogSchema);