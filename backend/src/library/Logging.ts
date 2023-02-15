import chalk from "chalk";

export default class Logging {
    public static log = (args: any) => this.info(args)

    public static info = (args: any) => {
        console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
            args === typeof('string') ? chalk.blueBright(args) : args);
    }

    public static warn = (args: any) => {
        console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `),
            args === typeof('string') ? chalk.yellowBright(args) : args);
    }
    
    public static error = (args: any) => {
        console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `),
            args === typeof('string') ? chalk.redBright(args) : args);
    }
}