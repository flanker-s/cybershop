import Logging from "../../library/Logging.js";
import DeliveryMethod from "../../models/DeliveryMethod.js";

export default async function seedDeliveryMethods(methodNames : string[]) : Promise<void> {
    try {
        Logging.info("Seeding delivery methods");
        DeliveryMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await DeliveryMethod.create({
                name: methodNames[Math.floor(Math.random() * methodNames.length)]
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}