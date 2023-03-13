import mongoose, { Document, Schema } from "mongoose";

export interface IDeliveryMethod {
    name: string
}

export interface IDeliveryMethodModel extends IDeliveryMethod, Document {}

const DeliveryMethodSchema: Schema = new Schema(
{
    name: { type: String, require: true, unique: true }
}, 
{ 
    collection: "deliveryMethods", versionKey: false, timestamps: true 
});

export default mongoose.model<IDeliveryMethodModel>('DeliveryMethod', DeliveryMethodSchema);