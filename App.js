import React, { useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/redux/store';
import Navigation from './app/navigation/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NOTIFICATION_UTIL from './app/utils/notification'
const { persistor, store } = configureStore();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});

const App = () => 
{    
	const notificationListener = useRef();
	const responseListener = useRef();

	const handleNotifReceivedListener = (notification) => console.log(notification);
	const handleNotifResponseReceivedListener = (notification) => console.log(notification);

	useEffect(() => 
	{
		NOTIFICATION_UTIL.registerForPushNotificationsAsync();
		notificationListener.current = Notifications.addNotificationReceivedListener(handleNotifReceivedListener);	
		responseListener.current = Notifications.addNotificationResponseReceivedListener(handleNotifResponseReceivedListener);

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		}
	}, []);

	return (
		<Provider store={ store }>
			<PersistGate 
				loading={ <ActivityIndicator /> } 
				persistor={ persistor }
			>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}

export default App