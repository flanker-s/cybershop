import mongoose, { Document, Schema } from "mongoose";

export interface IValueList {
    name: string,
    values: [{
        _id: Schema.Types.ObjectId
    }]
}

export interface IValueListModel extends IValueList, Document {}

const ValueListSchema: Schema = new Schema(
{
    name: { type: String, required: true },
    values: [{
        _id: { type: Schema.Types.ObjectId, required: true },
        value: { type: String, required: true }
    }]
}, 
{ 
    collection: "valueLists", versionKey: false, timestamps: true 
});

export default mongoose.model<IValueListModel>('ValueList', ValueListSchema);