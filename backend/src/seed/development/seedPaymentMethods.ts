import log from "../../log/logger.js";
import PaymentMethod from "../../models/DeliveryMethod.js";

export default async function seedPaymentMethods(methodNames : string[]) : Promise<void> {
    try {
        await log("info", "Seeding payments methods");
        PaymentMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await PaymentMethod.create({
                name: methodNames[Math.floor(Math.random() * methodNames.length)]
            })
        }
    } catch (err) {
        await log("error", err);
        throw err;
    }
}