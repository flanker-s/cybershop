import dotenv from "dotenv";

dotenv.config();

export const config = {
    mongo: {
        url: process.env.MONGODB_URL || '',
    },
    server: {
        port: Number(process.env.NODE_PORT) || 3000,
        domain: process.env.NODE_DOMAIN || 'localhost',
        protocol: process.env.NODE_PROTOCOL || 'http'
    },
    smtp: {
        gmail: {
            host: process.env.SMTP_HOST || '',
            port: Number(process.env.SMTP_PORT) || '',
            user: process.env.SMTP_USER || '',
            userId: process.env.SMTP_USER_ID || '',
            secret: process.env.SMTP_USER_SECRET || '',
            refreshToken: process.env.SMTP_USER_REFRESH_TOKEN || '',
        }
    },
    jwt: {
        refreshSecret: process.env.JWT_REFRESH_SECRET || '',
        accessSecret: process.env.JWT_ACCESS_SECRET || ''
    }
}