import Constants from 'expo-constants';

const DEVELOPMENT_MODE_API_URL = "http://192.168.1.6:8000/api";
const DEVELOPMENT_MODE_BROADCAST_URL = "http://192.168.1.6:8000/broadcasting/auth";
const PRODUCTION_MODE_API_URL = "";
const PRODUCTION_MODE_BROADCAST_URL = "";

const PUSHER_CONFIG = {
    WS_PORT: 6001,
    DRIVER: 'pusher',
    APP_ID: 'myPusherId',
    APP_KEY: 'myPusherKey',
    APP_SECRET: 'myPusherSecret',
    APP_CLUSTER: 'mt1'
}

const ENVIRONMENT_VARIABLES = 
{
    dev: {
        DEVELOPMENT_MODE_API_URL,
        DEVELOPMENT_MODE_BROADCAST_URL,
        PUSHER_CONFIG
    },
    staging: {
        PRODUCTION_MODE_API_URL,
        PRODUCTION_MODE_BROADCAST_URL,
        PUSHER_CONFIG
    },
    production: {
        PRODUCTION_MODE_API_URL,
        PRODUCTION_MODE_BROADCAST_URL,
        PUSHER_CONFIG
    }
};

const env = (env = Constants.manifest.releaseChannel) => 
{
    const { dev, staging, production } = ENVIRONMENT_VARIABLES;

    if (env === null || env === undefined || env === "") return dev;
    if (env.indexOf('dev') !== -1) return dev;
    if (env.indexOf('staging') !== -1) return staging;
    if (env.indexOf('prod') !== -1) return production;
}

const ENV = env();

export default ENV;
