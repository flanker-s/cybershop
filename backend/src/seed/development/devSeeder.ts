import seedUsers from "./seedUsers.js";
import seedArticles from "./seedArticles.js";
import seedBanners from "./seedBanners.js";
import seedValueLists from "./seedValueLists.js";
import seedCategories from "./seedCategories.js";
import seedChats from "./seedChats.js";
import seedDeliveryMethods from "./seedDeliveryMethods.js";
import seedEvents from "./seedEvents.js";
import seedLogs from "./seedLogs.js";
import seedProducts from "./seedProducts.js";
import seedPaymentMethods from "./seedPaymentMethods.js";
import seedOrders from "./seedOrders.js";
import seedShops from "./seedShops.js";
import seedShowcases from "./seedShowcases.js";
import Logging from "../../library/Logger.js";

export default async function seedDev () {
    await seedUsers(10);
    await seedArticles(20);
    await seedBanners(5);
    await seedValueLists(10, 20);
    await seedCategories({
        Unhandled: {},
        All: {
            Cars: {
                Business: {},
                Sport: {}
            },
            Clothes: {},
            Electronics: {
                PCs: {
                    Monitors: {}
                }
            }
        }
    });
    await seedChats(10, 12);
    await seedDeliveryMethods(["Self-delivery", "To an address"]);
    await seedPaymentMethods(["Payment on delivery", "Credit card"]);
    await seedEvents(10);
    //await seedLogs(1000);
    await seedProducts(100);
    await seedOrders(20);
    await seedShops(10);
    await seedShowcases(5);

    Logging.info("DB has been seeded for development");
}