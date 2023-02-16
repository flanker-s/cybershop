import mongoose, { Document, Schema } from "mongoose";

export interface IRole {
    name: string,
    priority: number
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
{
    name: { type: String, required: true, unique: true },
    priority: { type: Number, required: true, min: 1, max: 30 }
}, 
{ 
    versionKey: false, timestamps: true 
});

export default mongoose.model<IRoleModel>('Role', RoleSchema);