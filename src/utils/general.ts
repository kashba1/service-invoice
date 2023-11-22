import moment from "moment-timezone";
import redisUtils from "./redisKeys";
import { getCache, setCache } from "../repository/redis.repository";

declare global {
    interface String {
        getBytes(): number[];
    }
}

String.prototype.getBytes = function (): number[] {
    var bytes: number[] = [];
    for (var i: number = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes;
};

export const isEmpty = (value: string | number | Date | null): boolean => {
    return (typeof value == "string" && !value.trim()) || typeof value == "undefined" || value === null;
};

export const isEmptyTime = (value: any): boolean => {
    return typeof value == "undefined" || value === null || value == 0;
};

export const upperCaseString = (str: string) => {
    let arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(" ");
};

export const randomString = (length: number = 4, isAlphaNumeric: boolean = false, isSpecialChar: boolean = false) => {
    let characters = "0123456789";
    if (isAlphaNumeric) {
        characters += "abcdefghijklmnopqrstuvwxyz";
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (isSpecialChar) {
        characters += "~`!@#$%^&*()-_+={[}]|:;\"'/<,>.?\\ ";
    }
    let randomString = "";
    for (let i = 0; i < length; i++) {
        randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomString;
};

export const replaceString = (val: string, replace: any[]) => {
    for (const element of replace) {
        val = val.replaceAll(element.key, element.val);
    }
    return val;
};

function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
}

export const toHMS = (totalSeconds: number): any => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return {
        hr: padTo2Digits(hours),
        min: padTo2Digits(minutes),
        sec: padTo2Digits(seconds),
    };
};

export const getRegsiterDay = (date: string, timezone: string) => {
    //change to ist
    const currDate = moment().tz(timezone).format("YYYY-MM-DD");
    let diff = 0;
    if (date) {
        const regDate = moment(date).format("YYYY-MM-DD");
        const temp_currDate = moment(currDate);
        const temp_regDate = moment(regDate);
        diff = temp_currDate.diff(temp_regDate, "days");
    }
    return diff;
};

