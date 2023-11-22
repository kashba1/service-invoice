import dotenv from "dotenv";

const env = process.env.NODE_ENV ?? "dev";
dotenv.config({ path: "envs/.env." + env });

export const config = {
    RUN_ENV: env,
    NODE_HOST: process.env.NODE_HOST || "127.0.0.1",
    APP_PORT: process.env.APP_PORT,
    SERVICE_NAME: "service-invoices",
    SERVICE: {
        AUTH_V2_APP_URL: process.env.AUTH_V2_APP_URL,
        SERVICE_invoiceS_URL: process.env.SERVICE_INVOICES_URL,
        SERVICE_MASTER_URL: process.env.SERVICE_MASTER_URL,
        SERVICE_SLEEP_URL: process.env.SERVICE_SLEEP_URL,
        SERVICE_ACTIVITY_URL: process.env.SERVICE_ACTIVITY_URL,
        SERVICE_HEART_RATE_URL: process.env.SERVICE_HEART_RATE_URL,
        SERVICE_OXYGEN_URL: process.env.SERVICE_OXYGEN_URL,
        SERVICE_TEMPERATURE_URL: process.env.SERVICE_TEMPERATURE_URL,
        SERVICE_RESPIRATORY_URL: process.env.SERVICE_RESPIRATORY_URL,
        SERVICE_INVOICE_DETAILS_URL: process.env.SERVICE_INVOICE_DETAILS_URL,
        SERVICE_VENDORS_URL: process.env.SERVICE_VENDORS_URL,
    },
    mysql: {
        DB: process.env.DB_NAME,
        port: process.env.DB_PORT,
        master_host: process.env.MASTER_HOST,
        master_user: process.env.MASTER_USER,
        master_password: process.env.MASTER_PASSWORD,
        slave_host: process.env.SLAVE_HOST,
        slave_user: process.env.SLAVE_USER,
        slave_password: process.env.SLAVE_PASSWORD,
        dialect: process.env.DIALECT,
    },
    apikey: {
        internal: process.env.API_KEY_INTERNAL,
    },
    aws: {
        endpoint: process.env.AWS_ENDPOINT || "",
        region: process.env.REGION,
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        s3: {
            baseUrl: "",
            bucket: "",
        },
        sqs: {
            queue_url: process.env.QUEUE_URL,
        },
        open_search: {
            search_url: process.env.SEARCH_URL,
            username: process.env.SEARCH_USERNAME,
            password: process.env.SEARCH_PASSWORD,
        },
    },
    opensearch_index: {
        sleep_index: process.env.INDEX_SLEEP,
        activity_index: process.env.INDEX_ACTIVITY,
        workout_index: process.env.INDEX_WORKOUT,
        heart_rate_index: process.env.INDEX_HEART,
        hrv_index: process.env.INDEX_HRV,
        temperature_index: process.env.INDEX_TEMPERATURE,
        oxygen_index: process.env.INDEX_OXYGEN,
        respiration_index: process.env.INDEX_RESPIRATION,
    },
    apm: {
        secretToken: "",
        apiKey: "",
        serverUrl: process.env.APM_SERVER_URL,
    },
    secret: process.env.SECRET,
    expires: process.env.EXPIRES,
    REDIS: {
        WRITER_HOST: process.env.REDIS_WRITER_HOST,
        READER_HOST: process.env.REDIS_READER_HOST,
        PORT: process.env.REDIS_PORT,
    },
};
