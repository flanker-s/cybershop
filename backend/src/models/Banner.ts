import mongoose, { Document, Schema } from "mongoose";

export interface IBanner {
    name: string,
    img: string,
    url: string,
    template: string,
}

export interface IBannerModel extends IBanner, Document {}

const BannerSchema: Schema = new Schema(
{
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    url: { type: String },
    template: { type: String },
}, 
{ 
    collection: "banners", versionKey: false, timestamps: true 
});

export default mongoose.model<IBannerModel>('Banner', BannerSchema);