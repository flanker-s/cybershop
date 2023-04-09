import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    name: string,
    password: string,
    email: string,
    phone: string,
    address: string,
    isActivated: boolean,
    activationLink: string,
    avatar: string,
    roleId: Schema.Types.ObjectId,
    cart: {
        items: [{
            productId: Schema.Types.ObjectId,
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
        email: { type: String, unique: true, required: true },
        phone: { type: String, unique: true, sparse: true },
        address: { type: String },
        isActivated: { type: Boolean, default: false },
        activationLink: { type: String },
        avatar: { type: String },
        roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
        cart: {
            items: [{
                productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                price: { type: Schema.Types.Decimal128, required: true },
                count: { type: Number, required: true }
            }]
        }
    },
    {
        collection: "users", versionKey: false, timestamps: true
    });

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

export default mongoose.model<IUserModel>('User', UserSchema);