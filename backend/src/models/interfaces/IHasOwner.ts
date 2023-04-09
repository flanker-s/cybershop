import { Types } from "mongoose";

export default interface IHasOwner {
    userId: Types.ObjectId;
}