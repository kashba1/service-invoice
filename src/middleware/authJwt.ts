import { NextFunction, Response } from "express";
import config from "../config";
import Api401Error from "../utils/errorBase/api401Error";
import { API_RESPONSE_MESSAGE } from "../utils/constant";
import { authAPI, authDetailAPI, deviceAuthAPI } from "../services";

const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const user = await authAPI(access_token, wearable_type);
            req.user = user;
            return next();
        }
        throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    } catch (error) {
        next(error);
    }
};

const auth_detail = async (req: any, res: Response, next: NextFunction) => {
    try {
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const user = await authDetailAPI(access_token, wearable_type);
            req.user = user;
            return next();
        }
        throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    } catch (error) {
        next(error);
    }
};

const deviceAuth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const response = await deviceAuthAPI(access_token, wearable_type);
            req.user = response.user;
            req.userDevice = response.userDevice;
            return next();
        }
        throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
    } catch (error) {
        next(error);
    }
};

const verifyKey = async (req: any, res: Response, next: NextFunction) => {
    try {
        const api_key = req.header("x-api-key") || req.header("api-key") || req.header("api_key");
        if (!api_key || config.apikey.internal !== api_key) {
            throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default { auth, auth_detail, deviceAuth, verifyKey };
