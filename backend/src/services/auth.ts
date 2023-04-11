import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import { IUserPayload } from "../services/token.js";
import IHasOwner from "../models/interfaces/IHasOwner.js";
import { Request } from "express";

const checkRoles = async (req: Request, roles: string[]): Promise<boolean> => {

    const { accessToken } = req.cookies;
    if (accessToken) {
        const userData = getCurrentUser(req);
        const role = await Role.findById({ _id: userData.roleId });
        if (role && roles.includes(role.name)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
const checkOwner = (req: Request, document: IHasOwner): boolean => {

    const { accessToken } = req.cookies;
    if (accessToken) {
        const userData = getCurrentUser(accessToken);
        if (userData.id === document.userId.toString()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
const checkUser = (req: Request, userId: string): boolean => {
    return userId === getCurrentUser(req).id;
}
const getCurrentUser = (req: Request): IUserPayload => {
    const { accessToken } = req.cookies;
    if (accessToken) {
        return jwt.verify(accessToken, config.jwt.accessSecret) as IUserPayload;
    } else {
        throw new Error('Invalid access token');
    }
}

export {
    checkRoles,
    checkOwner,
    checkUser,
    getCurrentUser
}