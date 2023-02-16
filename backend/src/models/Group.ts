import mongoose, { Document, Schema } from "mongoose";

export interface IGroup {
    name: string,
    priority: number
}

export interface IGroupModel extends IGroup, Document {}

const GroupSchema: Schema = new Schema(
{
    name: { type: String, required: true, unique: true },
    priority: { type: Number, required: true, min: 1, max: 30 }
}, 
{ 
    versionKey: false, timestamps: true 
});

export default mongoose.model<IGroupModel>('Group', GroupSchema);