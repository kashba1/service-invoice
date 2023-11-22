import { ACTIVITY_CUSTOM_TYPE, HEART_RATE_CUSTOM_TYPE, HRV_CUSTOM_TYPE, OXYGEN_CUSTOM_TYPE, RESPIRATION_CUSTOM_TYPE, SLEEP_CUSTOM_TYPE, TEMPERATURE_CUSTOM_TYPE } from "./custom";

export const SYNC_CONFIG = [
    {
        key: "sleeps",
        required: false,
        type: "array",
        where: "body",
        of: SLEEP_CUSTOM_TYPE,
    },
    {
        key: "activities",
        required: false,
        type: "array",
        where: "body",
        of: ACTIVITY_CUSTOM_TYPE,
    },
    {
        key: "heart_rate",
        required: false,
        type: "array",
        where: "body",
        of: HEART_RATE_CUSTOM_TYPE,
    },
    {
        key: "hrv",
        required: false,
        type: "array",
        where: "body",
        of: HRV_CUSTOM_TYPE,
    },
    {
        key: "temperature",
        required: false,
        type: "array",
        where: "body",
        of: TEMPERATURE_CUSTOM_TYPE,
    },
    {
        key: "oxygen",
        required: false,
        type: "array",
        where: "body",
        of: OXYGEN_CUSTOM_TYPE,
    },
    {
        key: "respiration",
        required: false,
        type: "array",
        where: "body",
        of: RESPIRATION_CUSTOM_TYPE,
    },
];

export const READINESS_GET_CONFIG = [
    {
        key: "date",
        required: true,
        type: "string",
        where: "query",
        regex: "date",
    },
];
