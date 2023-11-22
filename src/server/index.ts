"use strict";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { returnError, notFound } from "../utils/errorBase/errorHandler";
import { config } from "../config/config";
import api_v1 from "../api/v1";

import { getAPMInstance } from "../logger/apm";
import chalk from "chalk";
import moment from "moment";

const start = (options: any) => {
    return new Promise(async (resolve, reject) => {
        if (!options.port) {
            reject(new Error("The server must be started with an available port"));
        }

        const app = express();
        // app.use((req: Request, res: Response, next: NextFunction) => {
        //     const transaction = getAPMInstance().startTransaction(`${req.method} ${req.path}`, "request");
        //     if (transaction) {
        //         const originalEnd = res.end.bind(res);
        //         res.end = function (chunk: any, encoding?: BufferEncoding | string | Function, callback?: () => void) {
        //             // if (res.statusCode >= 400) {
        //             transaction.end();
        //             // }
        //             res.end = originalEnd;
        //             return res.end(chunk, encoding as BufferEncoding, callback);
        //         };
        //     }
        //     next();
        // });

        // app.use(morgan(":date[iso] :method :url :status - :response-time[digits] ms"));
        app.use(
            morgan((tokens, req, res) => {
                return (
                    chalk.yellow(moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")) +
                    " " +
                    chalk.cyanBright(tokens.method(req, res)) +
                    " " +
                    chalk.magentaBright(tokens.url(req, res)) +
                    " " +
                    chalk.green(tokens.status(req, res)) +
                    " " +
                    chalk.white(tokens["response-time"](req, res)) +
                    " ms"
                );
            })
        );
        app.use(helmet());
        app.use(cors());
        app.use((err: any, req: any, res: any, next: any) => {
            reject(new Error("Something went wrong! Error:" + err));
            return res.status(500).send("Something went wrong!");
        });

        app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
        app.use(bodyParser.json({ limit: "50mb" }));

        app.get("/", (req, res, next) => {
            return res.status(200).json("ok");
        });

        api_v1(app, options);

        app.use(returnError);
        app.use(notFound);

        app.listen(options.port, config.NODE_HOST, () => {
            const message: string = `|| 🔉 server started succesfully. Running on port: ${options.port} & host: ${config.NODE_HOST} ||`;
            const len: number = message.length;
            console.log("~".repeat(len));
            console.log(message);
            console.log("~".repeat(len));
        });
        resolve(app);
    });
};

process.on("uncaughtException", (err) => {
    console.error("Unhandled Exception", err);
    getAPMInstance().captureError(err);
    getAPMInstance().endTransaction();
    getAPMInstance().flush(function () {
        // process.exit(1);
    });
    // throw err;
});

process.on("uncaughtRejection", (error, promise) => {
    console.error("Unhandled Rejection", error);
    throw error;
});

export default { start };
