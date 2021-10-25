import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native'

export const schedulePushNotification = async (title, body) => 
{
	await Notifications
		.scheduleNotificationAsync({
			content: {
				title,
				body
			},
			trigger: { seconds: 2 }	
		})
		.then(res => res)
		.catch(err => err);
}

export const remindedMovieReleaseNotification = (title) => 
{
	const notifTitle = "Reminder 🔔";
	const body = `${ title } is Released`;
	
	schedulePushNotification(notifTitle, body);
}


export const movieReleaseNotification = (title) => 
{
	const notifTitle = "Release 📣";
	const body = `${ title } is Released`;
	
	schedulePushNotification(notifTitle, body);
}


export const registerForPushNotificationsAsync = async () => 
{
	let token;

	if (Constants.isDevice) 
	{
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
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