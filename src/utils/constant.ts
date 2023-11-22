// import {
//     IDeepSleepMatrix, ILatencyMatrix, IRemSleepMatrix, IRestfulnessMatrix, ISleepEfficienyMatrix, ISleepScoreMatrix,
//     ITimingMatrix, ITotalSleepMatrix, TStatus, ILightSleepMatrix, IAwakeMatrix
// } from "./Interface";

import {
    IActivityBalanceMatrix,
    IActivityScoreMatrix,
    IDeepSleepMatrix,
    IHRBalanceMatrix,
    IHRReserveMatrix,
    IHRVBalanceMatrix,
    IReadinessScoreMatrix,
    ISleepBalanceMatrix,
    ITotalSleepMatrix,
    TStatus,
} from "./Interface";

export const DEFAULT_TIMEZONE = "Asia/Kolkata";
export const DEFAULT_OFFSET = 330;
export const DEFAULT_FORMAT = "YYYY-MM-DD";
export const GMT_TIME_ZONE = "UTC";
export const IST_DATE_FORMAT: string = "YYYY-MM-DD HH:mm:ss";
export const NATIVE_DATE_FORMAT: string = "YYYY-MM-DDTHH:mm:ssZ";

// export const ConsecutiveDays = 3;

// export const SleepScoreDeductionLatency = [1, 3, 5];

// export const SleepScoreDeductionMidTime = {
//     fail: 1,
//     pass: -2
// };

export const HistoryDayNum = 14;
export const OpenSearchExpiry = "30d";
export const HistoryExpiry = 29;
export const SleepBalancePastDays = 21;
export const ActivityBalancePastDays = 21;
export const HRVBalancePastDays = 37;
export const OpensarchLimit = 40;

export enum CODE_EXPIRY {
    DAY = 86400,
}

export const unwrapMatrix = ({ text, status }: { text: string; status: TStatus }): { text: string; status: TStatus } => ({ text, status });

export const ReadinessScoreMatrix: IReadinessScoreMatrix = {
    poor: {
        text: "Pay Attention",
        label: "<45",
        min: 0,
        max: 44,
        color: "#FF3358",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: ">=75",
        min: 75,
        max: 100,
        color: "#29CC74",
        status: "optimal",
    },
    good: {
        text: "Good",
        label: "74-45",
        min: 45,
        max: 74,
        color: "#29CC74",
        status: "good",
    },
};

export const ActivityScoreMatrix: IActivityScoreMatrix = {
    poor: {
        text: "Pay Attention",
        label: "<45",
        min: 0,
        max: 44,
        color: "#FF3358",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: ">=75",
        min: 75,
        max: 100,
        color: "#29CC74",
        status: "optimal",
    },
    good: {
        text: "Good",
        label: "74-45",
        min: 45,
        max: 74,
        color: "#29CC74",
        status: "good",
    },
};

export const TotalSleepMatrix: ITotalSleepMatrix = {
    poor: {
        text: "Pay Attention",
        label: "<7 hours or >9 hours",
        min: [0, 32401],
        max: [25199, 86400],
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "7-9 hours",
        min: [25200],
        max: [32400],
        color: "#BDA6FF",
        status: "good",
    },
};

export const SleepBalanceMatrix: ISleepBalanceMatrix = {
    poor: {
        text: "Pay Attention",
        label: "",
        min: [0, 32401],
        max: [25199, 86400],
        minDiff: 3601,
        maxDiff: 86400,
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "",
        min: [25200],
        max: [32400],
        minDiff: 0,
        maxDiff: 3600,
        color: "#BDA6FF",
        status: "good",
    },
};

export const ActivityBalanceMatrix: IActivityBalanceMatrix = {
    poor: {
        text: "Pay Attention",
        label: "",
        min: [0, 1.51],
        max: [0.79, 10.0],
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "",
        min: [0.8],
        max: [1.5],
        color: "#BDA6FF",
        status: "good",
    },
};

export const HRVBalanceMatrix: IHRVBalanceMatrix = {
    poor: {
        text: "Pay Attention",
        label: "",
        min: [0, 1.31],
        max: [0.69, 10.0],
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "",
        min: [0.7],
        max: [1.3],
        color: "#BDA6FF",
        status: "good",
    },
};

export const HRBalanceMatrix: IHRBalanceMatrix = {
    poor: {
        text: "Pay Attention",
        label: "",
        min: [0],
        max: [0.99],
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "",
        min: [1.0],
        max: [10.0],
        color: "#BDA6FF",
        status: "good",
    },
};

export const HRReserveMatrix: IHRReserveMatrix = {
    poor: {
        text: "Pay Attention",
        label: "",
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "",
        color: "#BDA6FF",
        status: "good",
    },
};

export const DeepSleepMatrix: IDeepSleepMatrix = {
    poor: {
        text: "Pay Attention",
        label: "<1 hour or >2 hours%",
        min: [0, 7201],
        max: [3599, 86400],
        color: "#FF5C7A",
        status: "warning",
    },
    optimal: {
        text: "Optimal",
        label: "1 hour to 2 hour",
        min: [3600],
        max: [7200],
        color: "#BDA6FF",
        status: "good",
    },
};

// export const Nudges = {
//     totalSleep: [
//         "It seems that you haven’t rested properly last night. Sleeping for a minimum of 7 hours helps to repair body tissues, replenishes energy stores, and releases growth hormones.",
//         "Your total sleep time exceeds more than 9 hours last night. Sleeping excessively can lead to excessive daytime sleepiness, fatigue, and decreased alertness.",
//         "It seems that you haven’t rested properly for quite a few days.Sleep plays a crucial role in cognitive functions such as memory consolidation, attention, concentration, and problem-solving.",
//         "It seems that your sleep time exceeds more than 9 hours for quite a few days. It may interfere with your ability to concentrate, negatively impact cognitive performance, and affect productivity."
//     ]
// }

// export const TotalSleepMatrix: ITotalSleepMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<7 hours or >9 hours",
//         min: [0, 32401],
//         max: [25199, 86400],
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: "7-9 hours",
//         min: [25200],
//         max: [32400],
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const RestfulnessMatrix: IRestfulnessMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: ">0 movement",
//         min: 1,
//         max: 1000,
//     },
//     optimal: {
//         text: "Optimal",
//         label: "0 movement",
//         min: 0,
//         max: 0,
//     },
// };

// export const SleepEfficienyMatrix: ISleepEfficienyMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<84%",
//         min: 0,
//         max: 83,
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: ">=84%",
//         min: 84,
//         max: 100,
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const RemSleepMatrix: IRemSleepMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: ">40%",
//         min: 41,
//         max: 100,
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: "<=40%",
//         min: 0,
//         max: 40,
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const DeepSleepMatrix: IDeepSleepMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<5%",
//         min: 0,
//         max: 4,
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: ">=5%",
//         min: 6,
//         max: 100,
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const LightSleepMatrix: ILightSleepMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<5%",
//         min: 0,
//         max: 4,
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: ">=5%",
//         min: 6,
//         max: 100,
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const AwakeMatrix: IAwakeMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<5%",
//         min: 0,
//         max: 4,
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: ">=5%",
//         min: 6,
//         max: 100,
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const LatencyMatrix: ILatencyMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<5 mins or >45 mins",
//         min: [0, 2701],
//         max: [299, 86400],
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: "5-45 mins",
//         min: [300],
//         max: [2700],
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

// export const TimingMatrix: ITimingMatrix = {
//     poor: {
//         text: "Pay Attention",
//         label: "<12 AM or >3 AM",
//         min: ["T03:00:01+05:30", "T03:00:01+05:30"],
//         max: ["T23:59:59+05:30", "T23:59:59+05:30"],
//         minSeconds: [10801, 10801],
//         maxSeconds: [86399, 86399],
//         color: "#FF5C7A",
//         status: "warning",
//     },
//     optimal: {
//         text: "Optimal",
//         label: "12 AM - 3 AM",
//         min: ["T00:00:00+05:30"],
//         max: ["T03:00:00+05:30"],
//         minSeconds: [86400],
//         maxSeconds: [10800],
//         color: "#BDA6FF",
//         status: "good",
//     },
// };

export enum ERROR_MESSAGE {
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Session expired, please login again",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not found",
    METHOD_NOT_ALLOW = "Method not allowed",
    NOT_ACCEPTABLE = "Not acceptable",
    PRECONDITION_FAIL = "Precondition failed",
    UNSUPPORT_MEDIA_TYPE = "Unsupported media type",
    UNPROCESSABLE_ENTITY = "Unprocessable entity",
    INTERNAL_SERVER = "Interal Server",
    NOT_IMPLEMENT = "Not implemented",
}

export enum API_RESPONSE_MESSAGE {
    UNEXPECTED = "Unexcepted error",
    RECORD_ALREADY_EXISTS = "Record already exists",
    SOMETHING = "Something went wrong",
    INVALID = "Invalid/Incomplete payload",
    SUCCESS = "Successfully Executed",
    NOT_FOUND = "Not Found",
    UNAUTHORIZED = "Unauthorized request",
    TOKEN_EXPIRED = "Expired Token, Unauthorized request",
    SIZE_EXCEEDED = "File size exceeded",
    INVALIDDATERANGE = "Date Range provided is Invalid",
    INVALIDDATE = "Invalid Date",
    ACTIVITY_DETAIL_DATA = "Activities Data Detail",
    WRONG_TIME = "Wrong Time of client",
}
