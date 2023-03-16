import ValueList from "../../models/ValueList.js";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Logging from "../../library/Logging.js";

interface IValue {
    _id: mongoose.Types.ObjectId,
    value: string
}

export default async function seedValueLists(listCount: number, valueCount: number): Promise<void> {
    try {
        Logging.info("Seeding value lists");
        for (let i = 0; i < listCount; i++) {
            const values: IValue[] = [];
            for (let j = 0; j < valueCount; j++) {
                values[j] = {
                    _id: new mongoose.Types.ObjectId(),
                    value: faker.helpers.unique(faker.word.noun)
                }
            }
            await ValueList.create({
                name: faker.helpers.unique(faker.word.noun),
                values: values
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}