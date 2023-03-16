import chalk from "chalk";
import Log from "../models/Log.js";

export default class Logging {
    public static async info(args: any) {
        console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
            args === typeof ('string') ? chalk.blueBright(args) : args);
        await this.saveLog("info", args);
    }

    public static async warning(args: any){
        console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `),
            args === typeof ('string') ? chalk.yellowBright(args) : args);
        await this.saveLog("warning", args);
    }

    public static async error(args: any) {
        console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `),
            args === typeof ('string') ? chalk.redBright(args) : args);
        await this.saveLog("error", args);
    }

    static async saveLog(level: string, args: any) {
        try {
            await Log.create({
                level: level,
                message: args ? args.toString() : "",
            });
        } catch (err) {
            console.error(err);
        }
    }
}