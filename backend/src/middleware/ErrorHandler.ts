import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import Logging from '../library/Logger.js';

const handleError = () => {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {

        if (err instanceof ApiError) {
            return res.status(err.status).json({
                message: err.message,
                errors: err.errors
            });
        } else {
            Logging.error(err.message);
            return res.status(500).json({
                messages: 'Internal server error'
            });
        }
    }
}
export default handleError;