
import express from "express";
import http from "http";
import mongoose from "mongoose";
import {config} from "./config/config.js"
import Logging from "./library/Logging.js";

const router = express();

mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.url, {w: "majority", retryWrites: true})
.then(()=>{
    Logging.info("mongo connection success");
    StartServer(); 
})
.catch((error)=>Logging.error(error));

/** Only start server if Mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the request */
        Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req
            .socket.remoteAddress}]`);
        /** Log the response */
        res.on('finish', ()=>{
            Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req
                .socket.remoteAddress}] - Status: [${res.statusCode}]`)
        });
        next();
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json());

    /** Api rulles */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization');

         if(req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
            return res.status(200).json({});
         }
        next();
    });

    /** Routes */

    /** Healthcheck */
    router.get('/ping', (req, res, next) => {
        return res.status(200).json({message: "pong"});
    })

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({message: error.message});
    })

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port: [${config.server.port}]`);
    });
}