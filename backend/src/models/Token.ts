import mongoose, { Document, Schema } from "mongoose";

export interface IToken {
    userId: Schema.Types.ObjectId,
    refreshToken: string
}

export interface ITokenModel extends IToken, Document {}

const TokenSchema: Schema = new Schema(
{
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, required: true },
}, 
{ 
    collection: "tokens", versionKey: false, timestamps: true 
});

export default mongoose.model<ITokenModel>('Token', TokenSchema);