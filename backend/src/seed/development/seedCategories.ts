import Category from "../../models/Category.js";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import ValueList, { IValueListModel } from "../../models/ValueList.js";
import Logging from "../../library/Logger.js";

export default async function seedCategories (tree: { [key: string]: any }): Promise<void> {
    try {
        Logging.info("Seeding categories");
        Category.collection.drop();
        await createCategoriesRecursive(tree, null);
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}

async function createCategoriesRecursive (node: { [key: string]: any }, parentId: string | null): Promise<void> {
    for (const key in node) {
        try {
            if (!node.hasOwnProperty(key)) {
                return;
            }
            Logging.info(`Seeding categories... ${key}`);
            const valueLists: IValueListModel[] = await ValueList.find({});
            const valueList = valueLists[Math.floor(Math.random() * valueLists.length)];
            const category = await Category.create({
                name: key,
                parentId: parentId,
                categoryBanners: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        name: faker.word.noun(),
                        img: faker.image.imageUrl()
                    },
                    {
                        _id: new mongoose.Types.ObjectId(),
                        name: faker.word.noun(),
                        img: faker.image.imageUrl()
                    }
                ],
                features: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        name: faker.word.noun(),
                        attributes: [
                            {
                                _id: new mongoose.Types.ObjectId(),
                                name: faker.word.noun(),
                                type: "reference",
                                valueListId: valueList._id
                            },
                            {
                                _id: new mongoose.Types.ObjectId(),
                                name: faker.word.noun(),
                                type: "string"
                            }
                        ]
                    }
                ]
            });
            await createCategoriesRecursive(node[key], category._id);
        } catch (err) {
            Logging.error(err);
            throw err;
        }
    }
}