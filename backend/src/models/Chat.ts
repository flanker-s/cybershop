import mongoose, { Document, Schema } from "mongoose";

export interface IChat {
    messages: [{
        userId: Schema.Types.ObjectId,
        text: string
    }],
}

export interface IChatModel extends IChat, Document {}

const ChatSchema: Schema = new Schema(
{
    massages: [{
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, require: true }
    }]
}, 
{ 
    collection: "chats", versionKey: false, timestamps: true 
});

export default mongoose.model<IChatModel>('Chat', ChatSchema);