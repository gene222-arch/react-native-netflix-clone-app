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

	useEffect(() => {
		NOTIFICATION_UTIL.registerForPushNotificationsAsync();

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			console.log(notification);
		});	

		return () => {
			Notifications.cancelAllScheduledNotificationsAsync();
			Notifications.removeNotificationSubscription(notificationListener.current);
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