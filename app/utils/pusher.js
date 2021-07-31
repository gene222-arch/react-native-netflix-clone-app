/** Libraries */
import Echo from "laravel-echo"
import PusherNative from 'pusher-js/react-native';

/** Utils */
import * as AsyncStorageInstance from './AsyncStorageInstance'
import ENV from './../../env';

let accessToken = null;

AsyncStorageInstance
	.getAccessToken()
	.then(token => { accessToken = token; });
	
export default () => 
{
	PusherNative.logToConsole = true;

	const auth = {
		headers: {
			Authorization: `Bearer ${ accessToken }`,
			Accept: 'application/json',
		},
	};

	const authEndpoint = ENV.DEVELOPMENT_MODE_BROADCAST_URL;

	const config = 
	{
		auth,
		authEndpoint,
		cluster: ENV.PUSHER_CONFIG.APP_CLUSTER,
		enableStats: false,
		enabledTransports: ['ws'],
		forceTLS: false,
		wsHost: ENV.PUSHER_CONFIG.HOST,
		wsPort: ENV.PUSHER_CONFIG.WS_PORT,
    };

    const pusherClient = new PusherNative(ENV.PUSHER_CONFIG.APP_KEY, config);

	const echoConfig = {
		auth,
		authEndpoint,
		broadcaster: ENV.PUSHER_CONFIG.DRIVER,
		client: pusherClient,
		encrypted: true,
		host: ENV.PUSHER_CONFIG.WEBSOCKET_HOST,
		...config
    };

    const echo = new Echo(echoConfig);

	return echo;
}