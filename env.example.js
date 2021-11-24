import Constants from 'expo-constants';

const HOST = '';

const DEVELOPMENT_MODE_API_URL = ``;
const DEVELOPMENT_MODE_BROADCAST_URL = ``;
const STAGING_MODE_API_URL = ``;
const STAGING_MODE_BROADCAST_URL = ``;
const PRODUCTION_MODE_API_URL = ``;
const PRODUCTION_MODE_BROADCAST_URL = ``;
const WEB_APP_URL = '';

const PUSHER_CONFIG = 
{
    WS_PORT: 6001,
    DRIVER: '',
    APP_ID: '',
    APP_KEY: '',
    APP_SECRET: '',
    APP_CLUSTER: '',
    HOST,
    WEBSOCKET_HOST: ``
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
