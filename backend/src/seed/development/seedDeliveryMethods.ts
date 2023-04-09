import Logging from "../../library/Logger.js";
import DeliveryMethod from "../../models/DeliveryMethod.js";

export default async function seedDeliveryMethods (methodNames: string[]): Promise<void> {
    try {
        Logging.info("Seeding delivery methods");
        DeliveryMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await DeliveryMethod.create({
                name: methodNames[i]
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}