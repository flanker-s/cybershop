import { faker } from "@faker-js/faker";
import Logging from "../../library/Logger.js";
import Shop from "../../models/Shop.js";

export default async function seedShops (count: number): Promise<void> {
    try {
        Logging.info("Seeding shops");
        Shop.collection.drop();
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const hours = [
            "10:00am - 8:00pm",
            "10:00am - 6:00pm",
            "off"
        ];
        for (let i = 0; i < count; i++) {
            await Shop.create({
                name: faker.helpers.unique(faker.word.noun),
                daysOfWork: [{
                    name: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
                    hours: hours[Math.floor(Math.random() * hours.length)]
                }],
                holidays: faker.date.future(2088)
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}