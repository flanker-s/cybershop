import { IUserModel } from "../models/User.js";

export default class UserDto {
    id: string;
    email: string;
    isActivated: boolean;

    constructor(model: IUserModel) {
        this.id = model._id.toString();
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}