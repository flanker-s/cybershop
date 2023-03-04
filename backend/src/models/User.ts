import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    name: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
    avatar: string,
    roleId: Schema.Types.ObjectId,
    cart: {
        items: [{
            productId: Schema.Types.ObjectId,
            name: string,
            price: Schema.Types.Decimal128,
            count: number
        }]
    }
}

export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema(
{
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    avatar: { type: String },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            price: { type: Schema.Types.Decimal128, required: true },
            count: { type: Number, required: true }
        }]
    }
},
{
    collection: "users", versionKey: false, timestamps: true
});

export default mongoose.model<IUserModel>('User', UserSchema);