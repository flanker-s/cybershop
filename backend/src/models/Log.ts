import mongoose, { Document, Schema } from "mongoose";

export interface ILog {
    level: string,
    message: string,
    metadata: Object
}
export interface ILogModel extends ILog, Document {}

const LogSchema: Schema = new Schema(
{
    level: { type: String, required: true, enum: ["info", "warning", "error"] },
    message: { type: String, required: true },
    metadata: { type: Object }
}, 
{ 
    collection: "logs", versionKey: false, timestamps: true 
});

export default mongoose.model<ILogModel>('Log', LogSchema);