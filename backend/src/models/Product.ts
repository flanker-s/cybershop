import mongoose, { Schema, Types, Document, isValidObjectId } from "mongoose";
import IHasOwner from "./interfaces/IHasOwner.js";

interface IAttributeValue extends Document {
    attributeId: Types.ObjectId,
    attributeValue: Types.ObjectId | string,
}

interface IProductComment extends IHasOwner, Document {
    rating: number,
    text: string
}

export interface IProduct {
    name: string,
    preview: string,
    images: string[],
    price: number,
    status: string,
    description: string,
    categoryId: Types.ObjectId,
    colorId: Types.ObjectId,
    attributeValues: Types.DocumentArray<IAttributeValue>,
    review: string,
    productComments: Types.DocumentArray<IProductComment>
}

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        preview: { type: String, required: true },
        images: [{ type: String }],
        price: { type: Schema.Types.Decimal128, required: true },
        status: { type: String, required: true, enum: ["In stock", "On order", "Out of stock"] },
        description: { type: String },
        colorId: { type: Schema.Types.ObjectId, ref: "ValueType.attributeValues" },
        categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
        attributeValues: [{
            attributeId: { type: Schema.Types.ObjectId, ref: "Category.features.attributes._id" },
            attributeValue: { type: Schema.Types.Mixed }
        }],
        review: { type: String },
        productComments: [{
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number },
            text: { type: String, required: true }
        }]
    },
    {
        collection: "products", versionKey: false, timestamps: true
    });

export default mongoose.model<IProductModel>('Product', ProductSchema);