import mongoose, { Document, Schema } from "mongoose";

export interface IOrder {
    customer: {
        userId: Schema.Types.ObjectId,
        name: string,
        phone: string,
        email: string,
        address: string
    },
    deliveryMethodId: Schema.Types.ObjectId,
    paymentMethodId: Schema.Types.ObjectId,
    status: string,
    items: [{
        productId: Schema.Types.ObjectId,
        price: number
    }],
}
export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema(
{
    customer: {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
    },
    deliveryMethodId: { type: Schema.Types.ObjectId, ref: "DeliveryMethod" },
    paymentMethodId: { type: Schema.Types.ObjectId, ref: "PaymentMethod" },
    status: { 
        type: String, 
        enum: ["pending", "processing", "shiped", "delivered", "canceled", "refunded"], 
        required: true 
    },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        price: { type: Schema.Types.Decimal128, required: true }
    }],
}, 
{ 
    collection: "orders", versionKey: false, timestamps: true 
});

export default mongoose.model<IOrderModel>('Order', OrderSchema);