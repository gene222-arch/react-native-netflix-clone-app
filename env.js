import Constants from 'expo-constants';

const HOST = '192.168.1.33';

const DEVELOPMENT_MODE_API_URL = `http://${HOST}:8000/api`;
const DEVELOPMENT_MODE_BROADCAST_URL = `http://${HOST}:8000/broadcasting/auth`;
const PRODUCTION_MODE_API_URL = "";
const PRODUCTION_MODE_BROADCAST_URL = "";
const DEVELOPMENT_MODE_WEB_APP_URL = `http://${ HOST }:3000`;
const PRODUCTION_MODE_WEB_APP_URL = "";

const PUSHER_CONFIG = 
{
    WS_PORT: 6001,
    DRIVER: 'pusher',
    APP_ID: 'IDukFb2MggByICNXro1nS',
    APP_KEY: 'KEYukFb2MggByICNXro1nS',
    APP_SECRET: 'SECRETukFb2MggByICNXro1nS',
    APP_CLUSTER: 'mt1',
    HOST,
    WEBSOCKET_HOST: `${HOST}:6001`
}

const ENVIRONMENT_VARIABLES = 
{
    dev: {
        DEVELOPMENT_MODE_API_URL,
        DEVELOPMENT_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        DEVELOPMENT_MODE_WEB_APP_URL
    },
    staging: {
        PRODUCTION_MODE_API_URL,
        PRODUCTION_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        DEVELOPMENT_MODE_WEB_APP_URL
    },
    production: {
        PRODUCTION_MODE_API_URL,
        PRODUCTION_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        PRODUCTION_MODE_WEB_APP_URL
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
