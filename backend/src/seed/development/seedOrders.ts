import Logging from "../../library/Logging.js";
import DeliveryMethod from "../../models/DeliveryMethod.js";
import Order from "../../models/Order.js";
import PaymentMethod from "../../models/PaymentMethod.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";

export default async function seedOrders(count: number) : Promise<void> {
    try {
        Logging.info("Seeding orders");
        Order.collection.drop();
        const users =await User.find({});
        if (users.length === 0) {
            throw new Error('It seems no user have been created.' 
            + 'You need to create some users before seeding orders');
        }
        const deliveryMethodIds = (await DeliveryMethod.find({}).select('_id')).map(method => method._id);
        if (deliveryMethodIds.length === 0) {
            throw new Error('It seems no delivery methods have been created.' 
            + 'You need to create some delivery methods before seeding orders');
        }
        const paymentMethodIds = (await PaymentMethod.find({}).select('_id')).map(method => method._id);
        if (deliveryMethodIds.length === 0) {
            throw new Error('It seems no payment methods have been created.' 
            + 'You need to create some payment methods before seeding orders');
        }
        const statuses = ["pending", "processing", "shiped", "delivered", "canceled", "refunded"];
        const products = await Product.find({});
        if (products.length === 0) {
            throw new Error('It seems no products have been created.' 
            + 'You need to create some products before seeding orders');
        }
        for (let i = 0; i < count; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const product = products[Math.floor(Math.random() * products.length)];
            Order.create({
                customer: {
                    userId: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    address: user.address
                },
                deliveryMethodId: deliveryMethodIds[Math.floor(Math.random() * deliveryMethodIds.length)],
                paymentMethodId: paymentMethodIds[Math.floor(Math.random() * paymentMethodIds.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                items: [{
                    productId: product._id,
                    price: product.price
                }],
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}