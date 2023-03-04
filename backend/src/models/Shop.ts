import mongoose, { Document, Schema } from "mongoose";

export interface IShop {
    name: string,
    daysOfWork: [{
        name: string,
        hours: string
    }],
    holidays: string
}

export interface IShopModel extends IShop, Document {}

const ShopSchema: Schema = new Schema(
{
    name: { type: String, required: true },
    daysOfWork: [{
        name: { type: String, required: true },
        hours: { type: String },
    }],
    holidays: { type: String }
}, 
{ 
    collection: "shops", versionKey: false, timestamps: true 
});

export default mongoose.model<IShopModel>('Shop', ShopSchema);