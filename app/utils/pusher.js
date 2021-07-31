/** Libraries */
import Echo from "laravel-echo"

/** Utils */
import * as AsyncStorageInstance from './AsyncStorageInstance'
import ENV from './../../env';

window.Pusher = require('pusher-js/react-native');


export default () => 
{
    let accessToken = null;

    AsyncStorageInstance
		.getAccessToken()
		.then(token => {
			accessToken = token;
		});

	const config = {
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
    };

    const echo = new Echo(config);

	return echo;
}