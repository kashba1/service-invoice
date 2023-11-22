export interface IHttpStatusCode {
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    MOVE_PERMANENT: number;
    FOUND: number;
    SEE_OTHER: number;
    NOT_MODIFIED: number;
    TEMP_REDIRECT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    METHOD_NOT_ALLOW: number;
    NOT_ACCEPTABLE: number;
    PRECONDITION_FAIL: number;
    UNSUPPORT_MEDIA_TYPE: number;
    UNPROCESSABLE_ENTITY: number;
    INTERNAL_SERVER: number;
    NOT_IMPLEMENT: number;
}

export type TStatus = "warning" | "good" | "optimal";

export interface IReadinessScoreMatrixKey {
    text: string;
    label: string;
    min: number;
    max: number;
    color: string;
    status: TStatus;
}

export interface IReadinessScoreMatrix {
    [key: string]: IReadinessScoreMatrixKey;
}

export interface IActivityScoreMatrixKey {
    text: string;
    label: string;
    min: number;
    max: number;
    color: string;
    status: TStatus;
}

export interface IActivityScoreMatrix {
    [key: string]: IActivityScoreMatrixKey;
}

export interface ITotalSleepMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    color: string;
    status: TStatus;
}

export interface ITotalSleepMatrix {
    [key: string]: ITotalSleepMatrixKey;
}

export interface ISleepBalanceMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    minDiff: number;
    maxDiff: number;
    color: string;
    status: TStatus;
}

export interface ISleepBalanceMatrix {
    [key: string]: ISleepBalanceMatrixKey;
}

export interface IActivityBalanceMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    color: string;
    status: TStatus;
}

export interface IActivityBalanceMatrix {
    [key: string]: IActivityBalanceMatrixKey;
}

export interface IHRVBalanceMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    color: string;
    status: TStatus;
}

export interface IHRVBalanceMatrix {
    [key: string]: IHRVBalanceMatrixKey;
}

export interface IHRBalanceMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    color: string;
    status: TStatus;
}

export interface IHRBalanceMatrix {
    [key: string]: IHRBalanceMatrixKey;
}

export interface IDeepSleepMatrixKey {
    text: string;
    label: string;
    min: number[];
    max: number[];
    color: string;
    status: TStatus;
}

export interface IDeepSleepMatrix {
    [key: string]: IDeepSleepMatrixKey;
}

export interface IHRReserveMatrixKey {
    text: string;
    label: string;
    color: string;
    status: TStatus;
}

export interface IHRReserveMatrix {
    [key: string]: IHRReserveMatrixKey;
}

// export interface IRestfulnessMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
// };

// export interface IRestfulnessMatrix {
//     [key: string]: IRestfulnessMatrixKey;
// };

// export interface ISleepEfficienyMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
//     color: string;
//     status: TStatus;
// };

// export interface ISleepEfficienyMatrix {
//     [key: string]: ISleepEfficienyMatrixKey;
// };

// export interface IRemSleepMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
//     color: string;
//     status: TStatus;
// };

// export interface IRemSleepMatrix {
//     [key: string]: IRemSleepMatrixKey;
// };

// export interface IDeepSleepMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
//     color: string;
//     status: TStatus;
// };

// export interface IDeepSleepMatrix {
//     [key: string]: IDeepSleepMatrixKey;
// };

// export interface ILightSleepMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
//     color: string;
//     status: TStatus;
// };

// export interface ILightSleepMatrix {
//     [key: string]: ILightSleepMatrixKey;
// };

// export interface IAwakeMatrixKey {
//     text: string;
//     label: string;
//     min: number;
//     max: number;
//     color: string;
//     status: TStatus;
// };

// export interface IAwakeMatrix {
//     [key: string]: IAwakeMatrixKey;
// };

// export interface ILatencyMatrixkey {
//     text: string;
//     label: string;
//     min: number[];
//     max: number[];
//     color: string;
//     status: TStatus;
// };

// export interface ILatencyMatrix {
//     [key: string]: ILatencyMatrixkey;
// };

// export interface ITimingMatrixKey {
//     text: string;
//     label: string;
//     min: string[];
//     max: string[];
//     minSeconds: number[],
//     maxSeconds: number[],
//     color: string;
//     status: TStatus;
// };

// export interface ITimingMatrix {
//     [key: string]: ITimingMatrixKey;
// };
