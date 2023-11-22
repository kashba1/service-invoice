import { DEFAULT_TIMEZONE } from "../utils/constant";
import { modifyDateFormat } from "../utils/date_format";

const validationHandler = (config: any) => (req: any, res: any, next: any) => {
    try {
        const request = ["params", "body", "query"];
        const incomingKeys = [];
        for (const element of request) {
            Object.keys(req[element]).length !== 0 && incomingKeys.push(...Object.keys(req[element]));
        }
        // TODO: ADD DATE TYPE
        // DATA TYPE CHECK
        const invalid_keys: string[] = [];
        const missing_keys: string[] = [];
        let required_keys = config.map((item: any) => item.key);
        for (let key of incomingKeys) {
            const curr_config = config.find((item: any) => item.key === key);
            if (curr_config) {
                datatypeHandler(key, curr_config, req[curr_config.where][key], invalid_keys, missing_keys, req.userZone);
            } else {
                invalid_keys.push(key);
            }
        }
        const excessive_keys = excessiveKeyHandler(incomingKeys, required_keys);
        // if (excessive_keys.length) {
        //     next({ message: { message: "Unexpected parameters", keys: excessive_keys } });
        // }
        if (missing_keys.length) {
            next({ message: { message: "missing keys", keys: missing_keys } });
        }
        if (invalid_keys.length) {
            next({ message: { message: "Invalid data type", keys: invalid_keys } });
        }
        next();
    } catch (error) {
        next(error);
    }
};

const datatypeHandler = (key: string, config: any, value: any, invalid_keys: string[], missing_keys: string[], userZone: any): string[] => {
    if (!config) {
        invalid_keys.push(key);
        return invalid_keys;
    }
    if (config.type === "array") {
        if (config.length) {
            if (config.length != value.length) {
                invalid_keys.push(key);
            }
        }
        arrayTypeHandler(key, value, config.of, invalid_keys, missing_keys, userZone);
    }
    if (config.type === "custom") {
        customTypeHandler(key, value, config.custom, invalid_keys, missing_keys, userZone);
    }
    if (config.type === "string" || config.type === "number") {
        if (config.type === "string" && config.regex === "date") {
            let isValid = isValidDateFormat(value); // check date format and id date is greater than today's date throw error
            if (!isValid) {
                invalid_keys.push(key);
            }
            let curr_date = modifyDateFormat(new Date(), "YYYY-MM-DD", userZone.timezone);
            if (value > curr_date) {
                invalid_keys.push(key);
            }
        }
        typeHandler(key, value, config.type, invalid_keys);
    }
    if (config.type === "enum") {
        enumTypeHandler(key, value, config.enums, invalid_keys);
    }
    return invalid_keys;
};

const enumTypeHandler = (key: string, value: string, enums: string[], invalid_keys: string[]): boolean => {
    if (enums.includes(value)) {
        return true;
    }
    invalid_keys.push(key);
    return false;
};

const typeHandler = (key: string, value: string, type: string, invalid_keys: string[]): boolean => {
    if (typeof value === type) {
        return true;
    }
    invalid_keys.push(key);
    return false;
};

const customTypeHandler = (parent_key: string, value: any, config: any, invalid_keys: string[], missing_keys: string[], userZone: any): boolean => {
    if (!(Object.prototype.toString.call(value) === "[object Object]")) {
        invalid_keys.push(parent_key);
        return false;
    }
    const incomingKeys = Object.keys(value);
    const required_keys = config.map((item: any) => item.key);
    for (let i = 0; i < required_keys.length; i++) {
        if (!incomingKeys.includes(required_keys[i])) {
            missing_keys.push(required_keys[i]);
            return false;
        }
    }
    for (let i = 0; i < incomingKeys.length; i++) {
        const key = incomingKeys[i];
        const curr_config = config.find((item: any) => item.key === key);
        if (!curr_config) {
            invalid_keys.push(key);
            return false;
        }
        datatypeHandler(`${parent_key}.${key}`, curr_config, value[key], invalid_keys, missing_keys, userZone);
    }
    return true;
};

const arrayTypeHandler = (key: string, arr: any, of: any, invalid_keys: string[], missing_keys: string[], userZone: any): boolean => {
    if (!Array.isArray(arr)) {
        invalid_keys.push(key);
        return false;
    }
    if (of === "string" || of === "number") {
        for (let value of arr) {
            typeHandler(key, value, of, invalid_keys);
        }
        return true;
    }
    for (let value of arr) {
        customTypeHandler(key, value, of, invalid_keys, missing_keys, userZone);
    }
    return true;
};

const excessiveKeyHandler = (incomingKeys: any, acceptedKeys: any) => {
    let excessiveKey = [];
    if (incomingKeys.length > acceptedKeys.length) {
        excessiveKey = incomingKeys.filter((item: any) => !acceptedKeys.includes(item));
    }
    return excessiveKey;
};

function isValidDateFormat(dateStr: string) {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(dateStr);
}

// const missingKeysHandler = ( key:any,config:any,value:any,missing_keys: string[]): string[] => {
// 	let required_keys:any=[];
// 	if (config.type === "array") {
// 		if (config.of === "string" || config.of === "number") {
// 			required_keys=config.map((item:any)=>item.key);
// 		}else{
// 			const incomingKeys = Object.keys(value);
// 		}
// 	}
// 	// if (config.type === "custom") {
// 	// 	required_keys=
// 	// }
// 	// for (let i = 0; i < incomingKeys.length; i++) {
// 	// 	if (!required_keys.includes(incomingKeys[i])) {
// 	// 		missing_keys.push(incomingKeys[i])
// 	// 	}
// 	// }
// 	return missing_keys;
// };

export default { validationHandler };
