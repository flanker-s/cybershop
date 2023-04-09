import mongoose, { Document, Types, Schema } from "mongoose";
import IHasOwner from "./interfaces/IHasOwner.js";

export interface IToken extends IHasOwner {
    refreshToken: string
}

export interface ITokenModel extends IToken, Document { }

const TokenSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        refreshToken: { type: String, required: true, unique: true },
    },
    {
        collection: "tokens", versionKey: false, timestamps: true
    });

export default mongoose.model<ITokenModel>('Token', TokenSchema);