import Event from "../../models/Event.js"
import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";

export default async function seedEvents(count: number) : Promise<void> {
    try {
        Logging.info("Seeding events");
        Event.collection.drop();
        for (let i = 0; i < count; i++) {
            await Event.create({
                name: faker.helpers.unique(faker.word.noun),
                img: faker.image.imageUrl(),
                text: faker.lorem.text()
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}