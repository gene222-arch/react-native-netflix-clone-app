import Constants from 'expo-constants';

const HOST = '192.168.1.10';

const DEVELOPMENT_MODE_API_URL = `http://${HOST}:8000/api`;
const DEVELOPMENT_MODE_BROADCAST_URL = `http://${HOST}:8000/broadcasting/auth`;
const STAGING_MODE_API_URL = `http://${HOST}:8000/api`;
const STAGING_MODE_BROADCAST_URL = `http://${HOST}:8000/broadcasting/auth`;
const PRODUCTION_MODE_API_URL = `http://${HOST}:8000/api`;
const PRODUCTION_MODE_BROADCAST_URL = `http://${HOST}:8000/broadcasting/auth`;
const WEB_APP_URL = 'http://192.168.1.10:3000';

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
        API_URL: DEVELOPMENT_MODE_API_URL,
        BROADCAST_URL: DEVELOPMENT_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        WEB_APP_URL
    },
    staging: {
        API_URL: STAGING_MODE_API_URL,
        BROADCAST_URL: STAGING_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        WEB_APP_URL
    },
    production: {
        API_URL: PRODUCTION_MODE_API_URL,
        BROADCAST_URL: PRODUCTION_MODE_BROADCAST_URL,
        PUSHER_CONFIG,
        WEB_APP_URL
    }
};

const env = () => 
{
    const env = Constants.manifest.releaseChannel;
    
    const { dev, staging, production } = ENVIRONMENT_VARIABLES;

    if (env === null || env === undefined || env === "") return dev;

    if (env.indexOf('dev') !== -1) return dev;

    if (env.indexOf('staging') !== -1) return staging;

    if (env.indexOf('prod') !== -1) return production;
}

const ENV = env();

export default ENV;
