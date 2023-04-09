import mongoose, { Document, Schema, Types } from "mongoose";
import IHasOwner from "./interfaces/IHasOwner.js";

export interface IMessage extends IHasOwner, Document {
    text: string
}

export interface IChat extends IHasOwner {
    messages: Types.DocumentArray<IMessage>
}

export interface IChatModel extends IChat, Document { }

const ChatSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        messages: [{
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            text: { type: String, required: true }
        }]
    },
    {
        collection: "chats", versionKey: false, timestamps: true
    });

export default mongoose.model<IChatModel>('Chat', ChatSchema);