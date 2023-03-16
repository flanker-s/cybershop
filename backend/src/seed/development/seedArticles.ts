import Article from "../../models/Article.js";
import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";

export default async function seedArticles(count: number): Promise<void> {
    try {
        Logging.info("Seeding articles");
        Article.collection.drop();
        for (let i = 0; i < count; i++) {
            await Article.create({
                name: faker.lorem.sentence(),
                img: faker.image.imageUrl(),
                text: faker.lorem.text(),
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}