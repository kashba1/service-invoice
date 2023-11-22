const DAILY_CUSTOM_TYPE = [
    {
        key: "total_deep",
        required: true,
        type: "number",
    },
    {
        key: "total_light",
        required: true,
        type: "number",
    },
    {
        key: "total_duration",
        required: true,
        type: "number",
    },
    {
        key: "time_in_bed",
        required: true,
        type: "number",
    },
    {
        key: "total_rem",
        required: true,
        type: "number",
    },
    {
        key: "start_time",
        required: true,
        type: "string",
    },
    {
        key: "end_time",
        required: true,
        type: "string",
    },
    {
        key: "total_awake",
        required: true,
        type: "number",
    },
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "sleep_score",
        required: true,
        type: "number",
    },
    {
        key: "readiness_score",
        required: true,
        type: "number",
    },
    {
        key: "sleep_efficiency",
        required: true,
        type: "number",
    },
    {
        key: "resting_hr",
        required: true,
        type: "number",
    },
    {
        key: "avg_hrv",
        required: true,
        type: "number",
    },
    {
        key: "max_temp",
        required: true,
        type: "number",
    },
    {
        key: "avg_resp",
        required: true,
        type: "number",
    },
    {
        key: "sleep_latency",
        required: true,
        type: "number",
    },
    {
        key: "hr_breakup",
        required: true,
        type: "array",
        of: "number",
    },
    {
        key: "hrv_breakup",
        required: true,
        type: "array",
        of: "number",
    },
    {
        key: "temp_breakup",
        required: true,
        type: "array",
        of: "number",
    },
    {
        key: "resp_breakup",
        required: true,
        type: "array",
        of: "number",
    },
];

const NIGHT_CUSTOM_TYPE = [
    {
        key: "movement_type",
        required: true,
        type: "enum",
        enums: ["low", "medium", "intense", "no_movement", "LOW", "MEDIUM", "INTENSE", "NO_MOVEMENT"],
    },
    {
        key: "start_time",
        required: true,
        type: "string",
    },
    {
        key: "duration",
        required: true,
        type: "number",
    },
    {
        key: "end_time",
        required: true,
        type: "string",
    },
];

const HOURLY_CUSTOM_TYPE = [
    {
        key: "sleep_type",
        required: true,
        type: "enum",
        enums: ["light", "rem", "awake", "deep"],
    },
    {
        key: "start_time",
        required: true,
        type: "string",
    },
    {
        key: "duration",
        required: true,
        type: "number",
    },
    {
        key: "end_time",
        required: true,
        type: "string",
    },
];

export const SLEEP_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: DAILY_CUSTOM_TYPE,
    },
    {
        key: "night_time_movement",
        required: true,
        type: "array",
        of: NIGHT_CUSTOM_TYPE,
    },
    {
        key: "hourly_breakup",
        required: true,
        type: "array",
        of: HOURLY_CUSTOM_TYPE,
    },
];

const CUSTOM_DAY_BREAK_UP = [
    {
        key: "active_calories",
        required: true,
        type: "number",
    },
    {
        key: "total_calories",
        required: true,
        type: "number",
    },
    {
        key: "total_distance",
        required: true,
        type: "number",
    },
    {
        key: "total_steps",
        required: true,
        type: "number",
    },
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
];

const CUSTOM_HOURLY_BREAKUP = [
    {
        key: "steps",
        required: true,
        type: "number",
    },
    {
        key: "active_calories",
        required: true,
        type: "number",
    },
    {
        key: "calories",
        required: true,
        type: "number",
    },
    {
        key: "distance",
        required: true,
        type: "number",
    },
    {
        key: "hour_of_the_day",
        required: true,
        type: "number",
    },
];

const CUSTOM_HEART_RATE_DAY_BREAK_UP = [
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "frequency",
        required: true,
        type: "number",
    },
    {
        key: "break_up",
        required: true,
        type: "array",
        of: "number",
        length: 288,
    },
];

const CUSTOM_HRV_DAY_BREAK_UP = [
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "frequency",
        required: true,
        type: "number",
    },
    {
        key: "break_up",
        required: true,
        type: "array",
        of: "number",
        length: 288,
    },
];

const CUSTOM_TEMPERATURE_DAY_BREAK_UP = [
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "frequency",
        required: true,
        type: "number",
    },
    {
        key: "break_up",
        required: true,
        type: "array",
        of: "number",
        length: 288,
    },
];

const CUSTOM_OXYGEN_DAY_BREAK_UP = [
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "frequency",
        required: true,
        type: "number",
    },
    {
        key: "break_up",
        required: true,
        type: "array",
        of: "number",
    },
];

const CUSTOM_RESPIRATION_DAY_BREAK_UP = [
    {
        key: "date",
        required: true,
        type: "string",
        regex: "date",
    },
    {
        key: "frequency",
        required: true,
        type: "number",
    },
    {
        key: "break_up",
        required: true,
        type: "array",
        of: "number",
        length: 288,
    },
];

export const ACTIVITY_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_DAY_BREAK_UP,
    },
    {
        key: "hourly_breakup",
        required: true,
        type: "array",
        of: CUSTOM_HOURLY_BREAKUP,
    },
    {
        key: "daytime_movement",
        required: true,
        type: "array",
        of: "number",
        length: 288,
    },
];

export const HEART_RATE_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_HEART_RATE_DAY_BREAK_UP,
    },
];

export const HRV_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_HRV_DAY_BREAK_UP,
    },
];
export const TEMPERATURE_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_TEMPERATURE_DAY_BREAK_UP,
    },
];
export const OXYGEN_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_OXYGEN_DAY_BREAK_UP,
    },
];
export const RESPIRATION_CUSTOM_TYPE = [
    {
        key: "day_break_up",
        required: true,
        type: "custom",
        custom: CUSTOM_RESPIRATION_DAY_BREAK_UP,
    },
];
