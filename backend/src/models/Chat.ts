import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
    userId: Types.ObjectId,
    text: string
}

export interface IChat {
    messages: Types.DocumentArray<IMessage>,
}

export interface IChatModel extends IChat, Document { }

const ChatSchema: Schema = new Schema(
    {
        messages: [{
            _id: { type: Schema.Types.ObjectId, required: true },
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            text: { type: String, required: true }
        }]
    },
    {
        collection: "chats", versionKey: false, timestamps: true
    });

export default mongoose.model<IChatModel>('Chat', ChatSchema);