import Log from "../models/Log.js";

export default async function log(level: string, message: string | any | unknown) {
    try{
        switch(level) {
            case "info": console.log(message); break;
            case "error": console.error(message); break;
        }
        Log.create({
            level: level,
            message: message ? message.toString() : "",
        });   
    } catch (err) {
        console.error(err);
    }
}