import Logging from "../../library/Logging.js";
import PaymentMethod from "../../models/DeliveryMethod.js";

export default async function seedPaymentMethods(methodNames : string[]) : Promise<void> {
    try {
        Logging.info("Seeding payments methods");
        PaymentMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await PaymentMethod.create({
                name: methodNames[Math.floor(Math.random() * methodNames.length)]
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}