import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000;
const DB_URL = process.env.MONGODB_URL || "";

export const config = {
    mongo: {
        url: DB_URL,
    },
    server: {
        port: PORT
    }
}