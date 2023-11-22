import apm from 'elastic-apm-node';
import config from "../config";
// import getLogger from "./winston";

export const getAPMInstance = () => {
    if (!apm.isStarted()) {
        apm.start({
            // Override service name from package.json
            // Allowed characters: a-z, A-Z, 0-9, -, _, and space
            serviceName: config.SERVICE_NAME,
            // Use if APM Server requires a token
            secretToken: config.apm.secretToken,
            // Use if APM Server uses API keys for authentication
            apiKey: config.apm.apiKey,
            // Set custom APM Server URL (default: http://127.0.0.1:8200)
            serverUrl: config.apm.serverUrl,
            captureBody: 'all',
            captureErrorLogStackTraces: 'messages',
            captureExceptions: false,
            // asyncHooks: false,
            // logUncaughtExceptions: false,
            captureHeaders: true,
            environment: config.RUN_ENV,
            // logLevel: 'info',
            // logger: {
            //     fatal: getLogger().error.bind(getLogger()),
            //     error: getLogger().error.bind(getLogger()),
            //     warn: getLogger().warn.bind(getLogger()),
            //     info: getLogger().info.bind(getLogger()),
            //     debug: getLogger().debug.bind(getLogger()),
            //     trace: getLogger().silly.bind(getLogger())
            // },
        });
        // apm.handleUncaughtExceptions((err) => {
        //     // Perform your own custom actions here
        //     console.error('Uncaught exception:', err);
        //     // Terminate the Node.js process
        //     process.exit(1);
        // });
    }
    return apm;
};