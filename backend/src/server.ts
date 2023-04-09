import express, { response } from "express";
import http from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/ErrorHandler.js";
import requestLogger from "./middleware/RequestLogger.js";
import ApiError from "./exceptions/ApiError.js";
import { config } from "./config/config.js";
import Logging from "./library/Logger.js";
import seedDB from "./seed/mainSeeder.js";
/**Import routes */
import authRoutes from "./routes/Auth/Auth.js";
import articleRoutes from "./routes/Article/Article.js";
import bannerRoutes from "./routes/Banner/Banner.js";
import categoryRoutes from "./routes/Category/Category.js";
import chatRoutes from "./routes/Chat/Chat.js";
import deliveryMethodRoutes from "./routes/DeliveryMethod/DeliveryMethod.js";
import eventRoutes from "./routes/Event/Event.js";
import logRoutes from "./routes/Log/Log.js";
import orderRoutes from "./routes/Order/Order.js";
import paymentMethodRoutes from "./routes/PaymentMethod/PaymentMethod.js";
import productRoutes from './routes/Product/Product.js';
import roleRoutes from './routes/Role/Role.js';
import shopRoutes from './routes/Shop/Shop.js';
import showcaseRoutes from './routes/Showcase/Showcase.js';
import userRoutes from './routes/User/User.js';
import valueListRoutes from './routes/ValueList/ValueList.js';

const router = express();

mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.url, { w: "majority", retryWrites: true })
    .then(() => {
        Logging.info("mongo connection success");
        seedDB(process.env.NODE_ENV || "production");
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only start server if Mongo connects */
const StartServer = () => {

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cookieParser());
    router.use(requestLogger());

    /** Api rulles */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
            return res.status(200).json({});
        }
        next();
    });

    /** Routes */
    router.use('/auth', authRoutes);
    router.use('/articles', articleRoutes);
    router.use('/banners', bannerRoutes);
    router.use('/categories', categoryRoutes);
    router.use('/chats', chatRoutes);
    router.use('/delivery-methods', deliveryMethodRoutes);
    router.use('/events', eventRoutes);
    router.use('/logs', logRoutes);
    router.use('/orders', orderRoutes);
    router.use('/payment-methods', paymentMethodRoutes);
    router.use('/products', productRoutes);
    router.use('/roles', roleRoutes);
    router.use('/shops', shopRoutes);
    router.use('/showcase', showcaseRoutes);
    router.use('/users', userRoutes);
    router.use('/value-lists', valueListRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => {
        return res.status(200).json({ message: "pong" });
    })

    /** Error handling */
    router.use((req, res, next) => {
        const err = new Error('404. Not found');
        Logging.error(err.message);
        return res.status(404).json({ message: err.message });
    })
    router.use(errorHandler());

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port: [${config.server.port}]`);
    });
}