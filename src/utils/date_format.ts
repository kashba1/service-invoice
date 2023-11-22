import moment from "moment-timezone";
import { API_RESPONSE_MESSAGE, DEFAULT_FORMAT, DEFAULT_TIMEZONE, GMT_TIME_ZONE, IST_DATE_FORMAT } from "./constant";
import { isEmpty } from "./general";
import Api400Error from "./errorBase/api400Error";

declare global {
    interface Date {
        isValid(): boolean;
    }
}

Date.prototype.isValid = function (): boolean {
    // If the date object is invalid it
    // will return 'NaN' on getTime()
    // and NaN is never equal to itself.
    return this.getTime() === this.getTime();
};

export const getEndOfTheDayTime = () => {
    const curr_date_end: number = new Date().setHours(23, 59, 59, 999);
    const curr_date: any = new Date();
    const remaining_time: number = curr_date_end - curr_date;
    const value: number = remaining_time / 1000;
    return parseInt(JSON.stringify(value));
};

export const getEndOfTheDayTimeIST = () => {
    const current_time = modifyDateFormat(new Date(), "YYYY-MM-DDTHH:mm:ssZ", DEFAULT_TIMEZONE);
    const eod_time = modifyDateFormat(moment(current_time.split("T")[0] + "T23:59:59+05:30"), "YYYY-MM-DDTHH:mm:ssZ", DEFAULT_TIMEZONE);
    return moment(eod_time).diff(moment(current_time), "seconds");
};

export const dateFormat = (value: string, format: string = "YYYY-MM-DD") => {
    if (!isEmpty(value)) {
        const date: Date = new Date(value);
        return moment(date).format(format);
    }
    return value;
};

export const addDays = (strDate: string, days: number, format: string = "YYYY-MM-DD", timezone: string = DEFAULT_TIMEZONE): any => {
    return modifyDateFormat(moment(strDate).add(days, "days"), format, timezone);
};

export const addSeconds = (strDate: string, seconds: number, format: string = "YYYY-MM-DD", timezone: string = DEFAULT_TIMEZONE): any => {
    return modifyDateFormat(moment(strDate).add(seconds, "seconds"), format, timezone);
};

export const subtractDays = (strDate: string, days: number, format: string = "YYYY-MM-DD", timezone: string = DEFAULT_TIMEZONE): any => {
    return modifyDateFormat(moment(strDate).subtract(days, "days"), format, timezone);
};

export const modifyDateFormat = (value: any, format: string = IST_DATE_FORMAT, timezone: string = GMT_TIME_ZONE): any => {
    if (!isEmpty(value)) {
        return moment.tz(value, format, timezone).format(format);
    }
    return value;
};

export const enumerateDaysBetweenDates = function (startDate: moment.MomentInput, endDate: moment.MomentInput) {
    let dates = [];
    let currDate = moment(startDate)
        .utcOffset("+05:30")
        .startOf("day");
    let lastDate = moment(endDate)
        .add(1, "days")
        .utcOffset("+05:30")
        .startOf("day");
    for (let m = moment(currDate); m.isBefore(lastDate); m.add(1, "days")) {
        dates.push(m.format("YYYY-MM-DD"));
    }
    return dates;
};

export const validateISTDate = (date: string, format: string = "YYYY-MM-DD") => {
    let currDate = moment();
    if (isEmpty(date)) {
        throw new Api400Error(API_RESPONSE_MESSAGE.INVALIDDATERANGE);
    }
    if (!new Date(date).isValid()) {
        throw new Api400Error(API_RESPONSE_MESSAGE.INVALIDDATERANGE);
    }
    date = date + "T00:00:00+05:30";
    if (moment(currDate).diff(moment(date), "days") < 0) {
        throw new Api400Error(API_RESPONSE_MESSAGE.INVALIDDATERANGE);
    }
    date = modifyDateFormat(moment(date), format, DEFAULT_TIMEZONE);
    return date;
};

export const changeReqDate = (date: string): string => {
    return date.replace(/(..).(..).(....)/, "$3-$1-$2");
};
