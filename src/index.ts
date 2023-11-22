import config from "./config";
import ssl from "./config/ssl";
import server from "./server";
import { disConnect } from "./database";
import { disConnectRedis } from "./redis";

server
    .start({
        port: config.APP_PORT,
        ssl: ssl,
    })
    .then((app: any) => {
        // console.log(`Server started succesfully. running on port: ${config.APP_PORT}.`);
        app.on("close", () => {
            console.log(" + Shutting down..");
        });
        let pm2Deploy = process.env.PM2_DEPLOY || false;
        if (pm2Deploy) {
            (<any>process).send("ready");
            process.on("SIGINT", async function(msg) {
                console.log("Process reload ongoing message: " + msg);
                await disConnect();
                await disConnectRedis();
                process.exit(0);
            });
            process.on("message", msg => {
                if (msg == "shutdown") {
                    console.log("Closing all connections...");
                    setTimeout(() => {
                        console.log("Finished closing connections");
                        process.exit(0);
                    }, 1500);
                }
            });
            let instanceSeq = process.env.INSTANCE_ID || "0";
            if (instanceSeq == "0") {
                console.log("Master Instance");
            } else {
                console.log("Slave Instance");
            }
        }
    })
    .catch(error => console.log("Error while connecting Server", error));
