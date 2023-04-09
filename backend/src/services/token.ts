import { config } from "../config/config.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface ITokenSet {
    refreshToken: string,
    accessToken: string
}

export interface IUserPayload {
    id: string;
    roleId: string;
    email: string;
    isActivated: boolean;
}

const generateTokens = (user: IUserPayload): ITokenSet => {
    const jwtRefreshSecret = config.jwt.refreshSecret;
    const jwtAccessSecret = config.jwt.accessSecret;

    if (!jwtRefreshSecret || !jwtAccessSecret) {
        throw new Error('It seems that some of secret strings for JWT is not set. '
            + 'Create evironment variables for JWT that are mentioned in the example.env file');
    }

    const refreshToken = jwt.sign({ ...user }, jwtRefreshSecret, { expiresIn: '30d' });
    const accessToken = jwt.sign({ ...user }, jwtAccessSecret, { expiresIn: '30m' });

    return {
        accessToken,
        refreshToken
    }
}

const verifyToken = (refreshToken: string): IUserPayload => {
    try {
        const userData = jwt.verify(refreshToken, config.jwt.refreshSecret) as JwtPayload;
        const { id, roleId, email, isActivated } = userData;
        return { id, roleId, email, isActivated };

    } catch (err) {
        throw err;
    }
}

export default {
    generateTokens,
    verifyToken
}