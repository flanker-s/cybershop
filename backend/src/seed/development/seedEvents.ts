import Event from "../../models/Event.js"
import { faker } from "@faker-js/faker";
import log from "../../log/logger.js";

export default async function seedEvents(count: number) : Promise<void> {
    try {
        await log("info", "Seeding events");
        Event.collection.drop();
        for (let i = 0; i < count; i++) {
            await Event.create({
                name: faker.helpers.unique(faker.word.noun),
                img: faker.image.imageUrl(),
                text: faker.lorem.text()
            })
        }
    } catch (err) {
        await log("error", err);
        throw err;
    }
}