require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.NODE_PORT || 5000

const app = express()

const start = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("db connection success")
        app.listen(PORT, ()=>{ console.log(`App is running on port: ${PORT}`)})
    } catch (e){
        console.log(e)
    }
}

start()