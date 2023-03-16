import Banner from "../../models/Banner.js";
import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";

export default async function seedBanners(count: number): Promise<void> {
    try {
        Logging.info("Seeding banners");
        Banner.collection.drop();
        for (let i = 0; i < count; i++) {
            await Banner.create({
                name: faker.helpers.unique(faker.word.noun),
                img: faker.image.imageUrl(),
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}