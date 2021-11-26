/** Libraries */
import Echo from "laravel-echo"
import PusherNative from 'pusher-js/react-native';

/** Utils */
import * as SecureStoreInstance from './SecureStoreInstance'
import ENV from '../../env';

export default async () => 
{
	const accessToken = await SecureStoreInstance.getAccessToken();
	
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
		enabledTransports: ['ws', 'wss'],
		forceTLS: false,
		encrypted: true,
		wsHost: ENV.PUSHER_CONFIG.HOST,
		wsPort: ENV.PUSHER_CONFIG.WS_PORT,
    };

    const pusherClient = new PusherNative(ENV.PUSHER_CONFIG.APP_KEY, config);

	const echoConfig = {
		broadcaster: ENV.PUSHER_CONFIG.DRIVER,
		client: pusherClient,
		host: ENV.PUSHER_CONFIG.WEBSOCKET_HOST,
		...config
    };

    const echo = new Echo(echoConfig);

	return echo;
}