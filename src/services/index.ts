import axios from "axios";
import config from "../config";
import { integer } from "@opensearch-project/opensearch/api/types";

export const authAPI = (access_token: string, wearable_type: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "access-token": access_token,
                    "wearable-type": wearable_type,
                },
            };
            const response = await axios.get(config.SERVICE.AUTH_V2_APP_URL + "/auth_v2/auth/user", options);
            const { data } = response.data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const authDetailAPI = (access_token: string, wearable_type: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "access-token": access_token,
                    "wearable-type": wearable_type,
                },
            };
            const response = await axios.get(config.SERVICE.AUTH_V2_APP_URL + "/auth_v2/auth/detail/user", options);
            const { data } = response.data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const deviceAuthAPI = (access_token: string, wearable_type: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "access-token": access_token,
                    "wearable-type": wearable_type,
                },
            };
            const response = await axios.get(config.SERVICE.AUTH_V2_APP_URL + "/auth_v2/auth/device", options);
            const { data } = response.data;
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

