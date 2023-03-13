import { faker } from "@faker-js/faker";
import log from "../../log/logger.js";
import Log from "../../models/Log.js";

export default async function seedLogs(count: number) : Promise<void> {
    try {
        await log("info", "Seeding logs");
        Log.collection.drop();
        const levels = ["error", "info"];
        for (let i = 0; i < count; i++) {
            await Log.create({
                level: levels[Math.floor(Math.random() * levels.length)],
                message: faker.lorem.sentence(),
            })
        }
    } catch (err) {
        await log("error", err);
        throw err;
    }
}