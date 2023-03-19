import Logging from "../../library/Logging.js";
import PaymentMethod from "../../models/PaymentMethod.js";

export default async function seedPaymentMethods(methodNames : string[]) : Promise<void> {
    try {
        Logging.info("Seeding payments methods");
        PaymentMethod.collection.drop();
        for (let i = 0; i < methodNames.length; i++) {
            await PaymentMethod.create({
                name: methodNames[i]
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}