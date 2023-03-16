import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import Logging from "../../library/Logging.js";
import Category, { ICategoryModel } from "../../models/Category.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";
import ValueList from "../../models/ValueList.js";

interface IProductValue {
    attributeId: Schema.Types.ObjectId,
    value: Schema.Types.ObjectId | string | null
}

export default async function seedProducts(count: number): Promise<void> {
    try {
        Logging.info("Seeding products");
        Product.collection.drop();
        for (let i = 0; i < count; i++) {
            const statuses = ["In stock", "On order", "Out of stock"];
            const colorList = await ValueList.findOne({ name: "Colors" });
            const colorIds = colorList?.values?.map(value => value._id);

            const category = await getRandomCategory();
            const userIds = await getUserIds();

            await Product.create({
                name: faker.word.noun(),
                preview: faker.image.imageUrl(200, 200),
                images: [faker.image.imageUrl(640, 800)],
                price: faker.commerce.price(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                description: faker.lorem.paragraph(),
                colorId: colorIds ? colorIds[Math.floor(Math.random() * colorIds.length)] : null,
                categoryId: category._id,
                values: await createProductValues(category),
                review: faker.lorem.text(),
                comments: [{
                    userId: userIds[Math.floor(Math.random() * userIds.length)],
                    rating: faker.datatype.number({ min: 1, max: 5 }),
                    text: faker.lorem.text()
                }]
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}

async function getUserIds(): Promise<Schema.Types.ObjectId[]> {
    const users = await User.find({}).select('_id');
    const userIds = users.map(user => user._id);
    if (userIds.length === 0) {
        throw new Error('It seems there is no users yet. Create some to seed products');
    }
    return userIds;
}

async function getRandomCategory(): Promise<ICategoryModel> {
    const categories: ICategoryModel[] = await Category.aggregate([{
        $sample: { size: 1 }
    }]);
    if (categories.length === 0) {
        throw new Error("It seems there is no categories yet. Create some to use product seeding");
    }
    return categories[0];
}

async function createProductValues(category: ICategoryModel): Promise<IProductValue[]> {
    const ancestorIds = category.path.split(".");
    const ancestors = await Category.find({
        _id: { $in: ancestorIds },
    }).select('features.attributes');

    const attributes = ancestors.map((ancestor) => {
        return ancestor.features.map((feature) => {
            return feature.attributes.map((attribute) => {
                return {
                    _id: attribute._id,
                    name: attribute.name,
                    type: attribute.type,
                    valueListId: attribute.valueListId
                };
            });
        }).reduce((acc, cur) => acc.concat(cur), []);
    }).reduce((acc, cur) => acc.concat(cur), []);

    return await Promise.all(attributes.map(async (attribute) => {
        let value: string | Schema.Types.ObjectId = "";
        switch (attribute.type) {
            case "string": {
                value = faker.word.noun();
                break;
            }
            case "reference": {
                const valueList = await ValueList.findOne({ _id: attribute.valueListId });
                const valueIds = valueList?.values?.map(value => value._id);
                value = valueIds ? valueIds[Math.floor(Math.random() * valueIds.length)] : "";
                break;
            }
        }
        return {
            attributeId: attribute._id,
            value: value
        }
    }));
}