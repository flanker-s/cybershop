import mongoose, { Document, Schema } from "mongoose";

export interface IPaymentMethod {
    name: string
}

export interface IPaymentMethodModel extends IPaymentMethod, Document {}

const PaymentMethodSchema: Schema = new Schema(
{
    name: { type: String, require: true }
}, 
{ 
    collection: "paymentMethods", versionKey: false, timestamps: true 
});

export default mongoose.model<IPaymentMethodModel>('PaymentMethod', PaymentMethodSchema);