import ValueList from "../../models/ValueList.js";
import mongoose from "mongoose";
import log from "../../log/logger.js";

export default async function seedColors(): Promise<void> {
    try {
        await log("info", "Seeding colors");
        await ValueList.collection.drop();
        await ValueList.create({
            name: "Colors",
            values: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    value: "#000000" //black
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    value: "#f1c232" //gold
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    value: "#cc0000" //red
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    value: "#f3f6f4" //white
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    value: "#0b5394" //blue
                }
            ]
        });
    } catch (err) {
        log("error", err);
        throw err;
    }
}