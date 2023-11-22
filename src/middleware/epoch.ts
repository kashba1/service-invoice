import { NextFunction, Response } from "express";
import { API_RESPONSE_MESSAGE, DEFAULT_OFFSET, DEFAULT_TIMEZONE } from "../utils/constant";
import Api406Error from "../utils/errorBase/api406Error";

const epochCheck = async (req: any, res: Response, next: NextFunction) => {
    try {
        const epoch_time = req.header("epoch-time") || "";
        if (epoch_time != "") {
            let currentEpoch = new Date().getTime();
            if (Math.abs(currentEpoch - epoch_time) > 60000) {
                throw new Api406Error(API_RESPONSE_MESSAGE.WRONG_TIME);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

const timeZoneCheck = async (req: any, res: Response, next: NextFunction) => {
    try {
        const timezone = req.header("timezone") || DEFAULT_TIMEZONE;
        const offset = req.header("offset") || DEFAULT_OFFSET;
        req.userZone = {
            timezone,
            offset,
        };
        next();
    } catch (error) {
        next(error);
    }
};

export default { epochCheck, timeZoneCheck };
