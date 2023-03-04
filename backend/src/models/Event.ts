import mongoose, { Document, Schema } from "mongoose";

export interface IEvent {
    name: string,
    img: string,
    url: string,
    text: string,
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema(
{
    name: { type: String, required: true, unique: true },
    img: { type: String },
    url: { type: String },
    text: { type: String, required: true }
},
{ 
    collection: "events", versionKey: false, timestamps: true 
});

export default mongoose.model<IEventModel>('Event', EventSchema);