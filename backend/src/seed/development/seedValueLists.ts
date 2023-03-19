import ValueList from "../../models/ValueList.js";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";

interface IValue {
    _id: mongoose.Types.ObjectId,
    value: string
}

export default async function seedValueLists (listCount: number, optionCount: number): Promise<void> {
    try {
        Logging.info("Seeding value lists");
        for (let i = 0; i < listCount; i++) {
            const options: IValue[] = [];
            for (let j = 0; j < optionCount; j++) {
                options[j] = {
                    _id: new mongoose.Types.ObjectId(),
                    value: faker.helpers.unique(faker.word.noun)
                }
            }
            await ValueList.create({
                name: faker.helpers.unique(faker.word.noun),
                options: options
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}