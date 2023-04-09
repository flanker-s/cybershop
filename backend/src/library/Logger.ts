import winston from 'winston';
import { MongoDB } from 'winston-mongodb';
import { config } from '../config/config.js';

const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new MongoDB({
            level: 'info',
            db: config.mongo.url,
            collection: 'logs',
            options: { useNewUrlParser: true },
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
});

export default logger;