import mongoose, { Document, Schema } from "mongoose";

export interface IShowcase {
    name: string,
    template: string,
    productIds: Schema.Types.ObjectId[],
}

export interface IShowcaseModel extends IShowcase, Document {}

const ShowcaseSchema: Schema = new Schema(
{
    name: { type: String, required: true },
    template: { type: String, required: true },
    productIds: [
        { type: Schema.Types.ObjectId, ref: "Product" }
    ],
}, 
{ 
    collection: "showcases", versionKey: false, timestamps: true 
});

export default mongoose.model<IShowcaseModel>('Showcase', ShowcaseSchema);