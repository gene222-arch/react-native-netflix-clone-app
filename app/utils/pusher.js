/** Libraries */
import Echo from "laravel-echo"

/** Utils */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from './../../env';

window.Pusher = require('pusher-js');

export default () => 
{
    const accessToken = AsyncStorage.getItem('access_token');

    return new Echo({
        broadcaster: ENV.DEVELOPMENT_MODE_BROADCAST_URL,
        key: ENV.PUSHER_CONFIG.APP_KEY,
        auth: {
            headers: {
              Authorization: `Bearer ${ accessToken }`,
              Accept: 'application/json',
            },
          },
        authEndpoint: ENV.DEVELOPMENT_MODE_BROADCAST_URL,
        wsHost: window.location.hostname,
        wsPort: ENV.PUSHER_CONFIG.WS_PORT,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
    });
}