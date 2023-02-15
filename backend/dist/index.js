import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.NODE_PORT || 5000;
const DB = process.env.MONGODB_URL || "";
const app = express();
const start = () => {
    try {
        mongoose.connect(DB);
        console.log("db connection success");
        app.listen(PORT, () => { console.log(`App is running on port: ${PORT}`); });
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=index.js.map