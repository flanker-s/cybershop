import mongoose, { Document, Schema, Types } from "mongoose";

interface IOption extends Document {
    value: string
}

export interface IValueList {
    name: string,
    options: Types.DocumentArray<IOption>
}

export interface IValueListModel extends IValueList, Document { }

const ValueListSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        options: [{
            _id: { type: Schema.Types.ObjectId, required: true },
            value: { type: String, required: true, unique: true }
        }]
    },
    {
        collection: "valueLists", versionKey: false, timestamps: true
    });

export default mongoose.model<IValueListModel>('ValueList', ValueListSchema);