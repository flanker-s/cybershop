import mongoose, { Document, Schema, Types } from "mongoose";


interface IDayOfWork extends Document {
    name: string,
    hours: string
}

export interface IShop {
    name: string,
    daysOfWork: Types.DocumentArray<IDayOfWork>,
    holidays: string
}

export interface IShopModel extends IShop, Document { }

const ShopSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
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