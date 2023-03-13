import Banner from "../../models/Banner.js";
import { faker } from "@faker-js/faker";
import log from "../../log/logger.js";

export default async function seedBanners(count: number): Promise<void> {
    try {
        await log("info", "Seeding banners");
        Banner.collection.drop();
        for (let i = 0; i < count; i++) {
            await Banner.create({
                name: faker.helpers.unique(faker.word.noun),
                img: faker.image.imageUrl(),
            });
        }
    } catch (err) {
        await log("error", err);
        throw err;
    }
}