import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";
import Product from "../../models/Product.js";
import Showcase from "../../models/Showcase.js";

export default async function seedShowcase(count: number) : Promise<void> {
    try {
        Logging.info("Seeding showcases");
        Showcase.collection.drop();
        const productIds = (await Product.find({}).select('_id')).map(product => product._id);
        if(productIds.length === 0) {
            throw new Error('It seems there is no products yet. Seed some products before seeding showcases');
        }
        for (let i = 0; i < count; i++) {
            await Showcase.create({
                name: faker.helpers.unique(faker.word.noun),
                template: "",
                productIds: [
                    productIds[Math.floor(Math.random() * productIds.length)]
                ],
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}