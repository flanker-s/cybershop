import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logger.js";

const requestLogger = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        /** Log the request */
        Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req
            .socket.remoteAddress}]`);
        /** Log the response */
        res.on('finish', async () => {
            await Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req
                .socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    }
}

export default requestLogger;