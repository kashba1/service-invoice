import { config } from "../config/config";

export const consoleLog = (...args: any[]) => {
    if (config.RUN_ENV !== "prod") {
        args.forEach(element => {
            console.log(element);
        });
    }
    return true;
};

export const consoleError = (...args: any[]) => {
    if (config.RUN_ENV !== "prod") {
        args.forEach(element => {
            console.error(element);
        });
    }
    return true;
};
