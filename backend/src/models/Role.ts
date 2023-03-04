import mongoose, { Document, Schema } from "mongoose";

export interface IRole {
    name: string, 
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
{
    name: { type: String, required: true },
}, 
{ 
    collection: "roles", versionKey: false, timestamps: true 
});

export default mongoose.model<IRoleModel>('Role', RoleSchema);