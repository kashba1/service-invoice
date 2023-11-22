module.exports = {
    apps: [
        {
            name: 'Luna-Service-Protean',
            script: 'build/index.js',
            watch: false,
            ignore_watch: [],
            instances: 1,
            parallel: 1,
            exec_mode: "cluster_mode",
            instance_var: 'INSTANCE_ID',
            // restart_delay: 10000,
            kill_timeout: 5000,
            wait_ready: true,
            listen_timeout: 10000,
            cwd: ".",
            env: {
                NODE_ENV: 'dev',
            },
            env_stage: {
                NODE_ENV: 'stage',
            },
            env_uat: {
                NODE_ENV: 'uat',
            },
            env_prod: {
                NODE_ENV: 'prod',
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            error_file: 'logs/Luna-Service-Protean.error.log',
            out_file: 'logs/Luna-Service-Protean.out.log',
            pid_file: 'pids/Luna-Service-Protean.pid',
            merge_logs: true,
            time: true,
        }
    ],
    // deploy: {
    //     stage: {
    //         user: 'stage',
    //         host: '10.0.10.21',
    //         ref: 'origin/dev',
    //         repo: 'git@bitbucket.org:gonoise/luna-service-protean.git',
    //         path: 'luna',
    //         'post-deploy': 'pm2 reload ecosystem.config.js --env stage',
    //     },
    //     uat: {
    //         user: 'uat',
    //         host: '10.0.10.21',
    //         ref: 'origin/uat',
    //         repo: 'git@bitbucket.org:gonoise/luna-service-protean.git',
    //         path: 'luna',
    //         'post-deploy': 'pm2 reload ecosystem.config.js --env uat',
    //     },
    //     prod: {
    //         user: 'deployer',
    //         host: '15.206.82.115',
    //         ref: 'origin/master',
    //         repo: 'git@bitbucket.org:gonoise/luna-service-protean.git',
    //         path: 'luna',
    //         'post-deploy': 'pm2 reload ecosystem.config.js --env prod',
    //     },
    // },
};