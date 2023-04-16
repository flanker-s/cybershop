import { Request } from "express";
import { config } from "../config/config.js";

/**
 * 
 * @param req that contains url
 * @param parameter wich to replace with
 * @returns string that contains full requested url with the new parameter
 */
const replaceUrlParameter = (req: Request, parameter: string): string => {
    const protocol = config.server.protocol + '://';
    const host = config.server.domain;
    const port = config.server.port;
    const current = req.originalUrl.split('/').slice(0, -1).join('/');
    const pureUrl = protocol + host + ':' + port + current;
    return pureUrl + '/' + parameter;
}

export {
    replaceUrlParameter
}