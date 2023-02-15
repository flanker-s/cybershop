import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()
const PORT = process.env.NODE_PORT || 3000
const DB_URL = process.env.MONGODB_URL || ""

console.log(DB_URL)
const app = express()
app.listen(PORT, ()=>{ console.log(`App is running on port: ${PORT}`)})
const start = () => {
    try{
        app.get('/', (req, res) => {
            res.send("GET Request Called")
          })
        mongoose.connect(DB_URL)
        console.log("db connection success")
    } catch (e){
        console.log(e)
    }
}
start()