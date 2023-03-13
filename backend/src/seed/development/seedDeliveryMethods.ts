import log from "../../log/logger.js";
import DeliveryMethod from "../../models/DeliveryMethod.js";

export default async function seedDeliveryMethods(methodNames : string[]) : Promise<void> {
    try {
        await log("info", "Seeding delivery methods");
        DeliveryMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await DeliveryMethod.create({
                name: methodNames[Math.floor(Math.random() * methodNames.length)]
            })
        }
    } catch (err) {
        await log("error", err);
        throw err;
    }
}