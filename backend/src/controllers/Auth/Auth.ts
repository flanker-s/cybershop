import { Request, Response, NextFunction } from 'express';
import Role from '../../models/Role.js';
import User, { IUserModel } from '../../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../../services/mail.js';
import tokenService, { ITokenSet } from '../../services/token.js';
import UserDto from '../../dtos/User.js';
import { config } from '../../config/config.js';
import bcrypt from "bcrypt";
import Token from '../../models/Token.js';
import ApiError from '../../exceptions/ApiError.js';
import { validationResult } from 'express-validator';

//TODO: review this controller
const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw ApiError.badRequest('Validation error', errors.array());
    };
    const { name, email, password, phone } = req.body;
    try {
        const role = await Role.findOne({ name: 'customer' });
        if (!role) {
            throw new Error('Role not found');
        }
        const user = await User.findOne({ name: name });
        if (user) {
            throw ApiError.exists('User', user._id);
        }
        const newUser = await User.create({
            name,
            email,
            password,
            phone,
            roleId: role._id,
            activationLink: uuidv4()
        });
        const siteUrl = config.server.protocol + '://' + config.server.domain;
        const link = `${siteUrl}:${config.server.port}/auth/activate/${newUser.activationLink}`;
        await mailService.sendActivationLink(email, link);

        const tokenSet = createTokenSet(newUser);
        await saveToken(newUser._id.toString(), tokenSet.refreshToken);
        setTokenCookies(res, tokenSet);

        const userDto = new UserDto(newUser);
        return res.status(201).json({ tokens: { ...tokenSet }, user: userDto });

    } catch (err) {
        next(err);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.badRequest('Validation error', errors.array());
        };
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.notFound('User', email);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw ApiError.unauthorized();
        }
        const tokenSet = createTokenSet(user);
        await saveToken(user._id.toString(), tokenSet.refreshToken);
        setTokenCookies(res, tokenSet);

        const userDto = new UserDto(user);
        return res.status(201).json({ tokens: { ...tokenSet }, user: userDto });

    } catch (err) {
        next(err);
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { refreshToken } = req.cookies;

        clearTokenCookies(res);

        const token = await Token.deleteOne({ refreshToken });
        if (!token) {
            throw new Error('Token not found');
        }
        return res.status(204).json({ message: "Logged out" });

    } catch (err) {
        next(err);
    }
}

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;

        const token = await Token.findOne({ refreshToken });
        if (!token) {
            throw ApiError.unauthorized();
        }
        const userData = tokenService.verifyToken(refreshToken);
        const user = await User.findById(userData.id);

        if (!user) {
            throw ApiError.unauthorized();
        }
        const tokenSet = tokenService.generateTokens(userData);

        token.refreshToken = tokenSet.refreshToken;
        await token.save();
        setTokenCookies(res, tokenSet);

        const userDto = new UserDto(user);
        return res.status(201).json({ tokens: { ...tokenSet }, user: userDto });
    } catch (err) {
        next(err);
    }
}

const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activationLink = req.params.link;

        const user = await User.findOne({ activationLink });
        if (!user) {
            throw new Error('User not found');
        }
        user.isActivated = true;
        await user.save();
        const userDto = new UserDto(user);
        return res.status(200).json(userDto);

    } catch (err) {
        next(err);
    }
}

const createTokenSet = (user: IUserModel) => {
    return tokenService.generateTokens({
        id: user._id.toString(),
        roleId: user.roleId.toString(),
        email: user.email,
        isActivated: user.isActivated
    });
}

const saveToken = (userId: string, refreshToken: string) => {
    return Token.create({
        userId,
        refreshToken
    });
}

const setTokenCookies = (res: Response, tokenSet: ITokenSet) => {
    const refreshTokenAge = 30 * 24 * 60 * 60 * 1000;
    const accessTokenAge = 30 * 60 * 1000;
    res.cookie('refreshToken', tokenSet.refreshToken, { maxAge: refreshTokenAge, httpOnly: true });
    res.cookie('accessToken', tokenSet.accessToken, { maxAge: accessTokenAge, httpOnly: true });
}

const clearTokenCookies = (res: Response) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
}

export default {
    register,
    login,
    logout,
    refresh,
    activate
}
