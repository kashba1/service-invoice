import { createLogger, transports, format, Logger } from "winston";
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { LogstashTransport } from "winston-logstash-ts-fix";
import { format as logformFormat } from 'logform';
// import TransportStream from 'winston-transport';
import DailyRotateFile from "winston-daily-rotate-file";
import moment from "moment-timezone";
import config from "../config";
import { modifyDateFormat } from "../utils/date_format";
import { DEFAULT_FORMAT, IST_DATE_FORMAT } from "../utils/constant";
import { DEFAULT_TIMEZONE } from "../utils/constant";
// import { getAPMInstance } from './apm';

let logger: Logger;

let loggerPrint = (info: any) => {
    // let output = `================================${info.level}================================` + `\n`;
    // output += `[${modifyDateFormat(moment(info.timestamp), IST_DATE_FORMAT, DEFAULT_TIMEZONE)}] : ${info.message}` + `\n`;
    // output += JSON.stringify(info[Symbol.for('splat')]) + `\n`;
    // output += `=====================================================================`;
    return JSON.stringify(info);
};

let loggerFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
    format.label({
        label: `Label🏷️`
    }),
    format.colorize({ all: true }),
    format.align(),
    format.printf(loggerPrint),
    // format.prettyPrint({ colorize: true }),
);

const transportError: DailyRotateFile = new DailyRotateFile({
    filename: `error`,
    extension: ".log",
    datePattern: "",
    dirname: "logs",
    maxSize: "10m",
    zippedArchive: true,
    maxFiles: "10d",
    level: "error",
});

const transportInfo: DailyRotateFile = new DailyRotateFile({
    filename: `combined`,
    extension: ".log",
    datePattern: "",
    dirname: "logs",
    maxSize: "10m",
    zippedArchive: true,
    maxFiles: "10d",
    level: "info",
});

// const esTransport = new ElasticsearchTransport({
//     index: 'service-anil',
//     indexPrefix: 'anil', // set index prefix for Elasticsearch
//     // apm: getAPMInstance(),
//     clientOpts: {
//         node: 'http://172.10.4.61:9200',
//         auth: {
//             username: 'elastic',
//             password: 'elastic@123',
//         },
//     } // set Elasticsearch client options
// });
// esTransport.on('error', (error) => {
//     console.error('Error in logger caught', error);
// });

// const lsTransport = new LogstashTransport({
//     host: "http://172.10.4.61",
//     port: 5400,
//     protocol: "udp", //default is udp, support tcp connection as alternative
//     // format: logformFormat.combine(
//     //     logformFormat.timestamp(),
//     //     logformFormat.logstash(),
//     // ),
// });

// const apmTransport = new ElasticsearchTransport({
//     index: 'service-anil',
//     indexPrefix: 'anil', // set index prefix for Elasticsearch
//     apm: getAPMInstance(),
// });
// apmTransport.on('error', (error) => {
//     console.error('Error in logger caught', error);
// });

export default function getLogger() {
    if (!logger) {
        logger = createLogger({
            level: 'info',
            // format: format.json(),
            format: loggerFormat,
            handleExceptions: true,
            defaultMeta: { service: config.SERVICE_NAME },
            transports: [
                transportError,
                // transportInfo,
                // esTransport,
                // lsTransport,
                // apmTransport
            ],
        });
        // if (process.env.NODE_ENV !== 'prod') {
        //     logger.add(new transports.Console());
        // }
        logger.on('error', (error) => {
            console.error('Error in logger caught', error);
        });
    }
    return logger;
};