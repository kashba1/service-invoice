import { isEmptyTime } from "../utils/general";
import { getEndOfTheDayTimeIST } from "../utils/date_format";
import { getRedisWriterClient, getRedisReaderClient } from "../redis";
// import { IRedisCacheReturnType } from "./Interface";

export const setCache: (k: string, v: any, ex?: number) => Promise<any> = (key: string, value: any, expiresAt: number = 0): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isEmptyTime(expiresAt)) {
                expiresAt = getEndOfTheDayTimeIST(); // DESCRIPTION: WILL EXPIRE AT THE END OF THE DAY
            }
            await getRedisWriterClient().setEx(key, expiresAt, JSON.stringify(value));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getCache: (k: string) => Promise<any> = (key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().get(key);
            const result = response != null ? JSON.parse(response) : null;
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

export const getTTL: (k: string) => Promise<any> = (key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().TTL(key);
            const result = response <= 0 ? 0 : response;
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteRedisKey: (k: any) => Promise<any> = (key: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().del(key);
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
};

export const deleteRedisKeysPattern: (p: string) => Promise<any> = (pattern: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await getRedisWriterClient().keys(pattern + "*");
            for (let i = 0; i < result.length; i++) {
                await getRedisWriterClient().del(result[i]);
            }
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
};

export const LPushCache: (k: string, e: any) => Promise<any> = (key: string, element: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().LPUSH(key, element);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const setListInCache: (k: string, e: any) => Promise<any> = (key: string, element: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().RPUSH(key, JSON.stringify(element));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getListFromCache: (k: string) => Promise<any> = (key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await getRedisReaderClient().LRANGE(key, 0, -1);
            const parsedList: any[] = [];
            for (let i = 0; i < result.length; i++) {
                !parsedList.includes(result[i]) && parsedList.push(parseInt(result[i]));
            }
            resolve(parsedList);
        } catch (error) {
            reject(error);
        }
    });
};

export const removeElementFromList: (k: string, e: any) => Promise<any> = (key: string, element: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().LREM(key, 0, JSON.stringify(element));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const setZAddCache: (k: string, s: any, v: any) => Promise<any> = (key: string, score: number, value: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().zAdd(key, { score, value: JSON.stringify(value) });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const zAddInc = (key: string, score: number, member: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().zIncrBy(key, score, member);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const removeFromZAddCache: (key: string, ui: number) => Promise<any> = (key: string, value: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().zRem(key, JSON.stringify(value));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getValueFromZAdd: (k: string, v: any) => Promise<any> = (key: string, value: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const points: any = await getRedisReaderClient().zScore(key, JSON.stringify(value));
            resolve(Number(points));
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllValueFromZAdd = (key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await getRedisReaderClient().zRangeWithScores(key, 0, -1);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

export const setHash = (key: string, f: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const args: any = [];
            for (const [field, value] of Object.entries(f)) {
                args.push(field, value);
            }
            await getRedisWriterClient().hSet(key, [...args]);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllHash = (key: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().hGetAll(key);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const getHash = (key: string, field: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().hGet(key, field);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const getHashByPage = (key: string, limit: number, cursor: 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().hScan(key, cursor, { COUNT: limit });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const getHashLength = (key: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().hLen(key);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteHash = (key: string, field: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisReaderClient().hDel(key, field.toString());
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const setHashByIncr = (key: string, f: any, value: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().hIncrBy(key, f, value);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const setHashWithExpiry = (key: string, f: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const args: any = [];
            for (const [field, value] of Object.entries(f)) {
                args.push(field, value);
            }
            await getRedisWriterClient().hSet(key, [...args]);
            let expireAt = getEndOfTheDayTimeIST();
            await getRedisWriterClient().expire(key, expireAt);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const keyExits = (key: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().exists(key);
            const result = response === 1 ? true : false;
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

export const hashKeyExists = (key: string, field: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().hExists(key, field);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const setJSONCache: (k: string, p: string, v: any, ex?: number) => Promise<any> = (key: string, path: string, value: any, expiresAt: number = 0): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await getRedisWriterClient().json.set(key, path, value);
            if (isEmptyTime(expiresAt)) {
                expiresAt = getEndOfTheDayTimeIST(); // DESCRIPTION: WILL EXPIRE AT THE END OF THE DAY
            }
            await getRedisWriterClient().expire(key, expiresAt);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const setJSONCacheCarryExp: (k: string, p: string, v: any) => Promise<any> = (key: string, path: string, value: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let expiresAt = await getTTL(key);
            await getRedisWriterClient().json.set(key, path, value);
            await getRedisWriterClient().expire(key, expiresAt);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

export const getJSONCache: (k: string, p: string[]) => Promise<any> = (key: string, path: string[]): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisReaderClient().json.get(key, { path: path });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const delJSONCache: (k: string, p: string) => Promise<any> = (key: string, path: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getRedisWriterClient().json.del(key, path);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
