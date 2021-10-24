import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native'

export const schedulePushNotification = ({ title, body, data }) => 
{
	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
			data: { data },
		},
	  	trigger: { seconds: 2 },
	});
}

export const registerForPushNotificationsAsync = async () => 
{
	const GRANTED = 'granted';
	let token;

	if (Constants.isDevice) 
	{
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== GRANTED) {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== GRANTED) {
			alert('Failed to get push token for push notification!');
			return;
		}

		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', 
		{
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}