import mongoose, { Schema, Document } from "mongoose";

export interface IProduct {
    name: string,
    preview: string,
    images:string[],
    price: number,
    status: string,
    description: string,
    categoryId: Schema.Types.ObjectId,
    color: string,
    values:[{
        attributeId: Schema.Types.ObjectId,
        value: string | Schema.Types.ObjectId,
    }],
    review: string,
    comments: [{
        userId: Schema.Types.ObjectId,
        rating: number,
        text: string
    }]
}

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema(
{
    name: { type: String, required: true },
    preview: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Schema.Types.Decimal128, required: true },
    status: { type: String, required: true, enum: ["In stock", "On order", "Out of stock"] },
    description: { type: String, required: true },
    colorId: { type: Schema.Types.ObjectId, ref: "ValueType.values" },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category"},
    values:[{
        attributeId: { type: Schema.Types.ObjectId, ref: "Category.features.attributes._id" },
        value: { type: Schema.Types.Mixed }
    }],
    review: { type: String },
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        text: { type: String, required: true }
    }]
},
{
    collection: "products", versionKey: false, timestamps: true
});

export default mongoose.model<IProductModel>('Product', ProductSchema);