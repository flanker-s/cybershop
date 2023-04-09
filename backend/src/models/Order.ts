import mongoose, { Document, Schema, Types } from "mongoose";
import IHasOwner from "./interfaces/IHasOwner.js";

interface IOrderProduct extends Document {
    productId: Types.ObjectId,
    price: number
}

export interface IOrder extends IHasOwner {
    phone: string,
    deliveryMethodId: Schema.Types.ObjectId,
    paymentMethodId: Schema.Types.ObjectId,
    status: string,
    orderProducts: Types.DocumentArray<IOrderProduct>,
}
export interface IOrderModel extends IOrder, Document { }

const OrderSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        phone: { type: String, required: true },
        deliveryMethodId: { type: Schema.Types.ObjectId, ref: "DeliveryMethod", required: true },
        paymentMethodId: { type: Schema.Types.ObjectId, ref: "PaymentMethod", required: true },
        status: {
            type: String,
            enum: ["pending", "processing", "shiped", "delivered", "canceled", "refunded"],
            required: true
        },
        orderProducts: [{
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            price: { type: Schema.Types.Decimal128, required: true }
        }],
    },
    {
        collection: "orders", versionKey: false, timestamps: true
    });

export default mongoose.model<IOrderModel>('Order', OrderSchema);