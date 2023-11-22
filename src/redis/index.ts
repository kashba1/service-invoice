import { createClient } from "redis";
import config from "../config";

let redis_writer_client: any;
let redis_reader_client: any;

export const getRedisWriterClient = () => {
    if (!redis_writer_client) {
        redis_writer_client = createClient({
            socket: {
                host: config.REDIS.WRITER_HOST,
                port: config.REDIS.PORT,
                enable_offline_queue: false,
            } as any,
        });
        redis_writer_client.on('error', (err: any) => {
            console.log(`Redis error: ${err}`);
        });
        redis_writer_client.connect();
    }
    return redis_writer_client;
}

export const getRedisReaderClient = () => {
    if (!redis_reader_client) {
        redis_reader_client = createClient({
            socket: {
                host: config.REDIS.READER_HOST,
                port: config.REDIS.PORT,
                enable_offline_queue: false,
            } as any,
        });
        redis_reader_client.on('error', (err: any) => {
            console.log(`Redis error: ${err}`);
        });
        redis_reader_client.connect();
    }
    return redis_reader_client;
}

export const disConnectRedis = () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (redis_writer_client) {
                redis_writer_client.on("end", function (err: any) {
                    console.log("Redis disconnected");
                    resolve(true);
                });
                await redis_writer_client.quit();
            }
            if (redis_reader_client) {
                redis_reader_client.on("end", function (err: any) {
                    console.log("Redis disconnected");
                    resolve(true);
                });
                await redis_reader_client.quit();
            }
            resolve(true);
        } catch (error) {
            console.error('Unable to close connection to the database:', error);
            reject(false);
        }
    });
};