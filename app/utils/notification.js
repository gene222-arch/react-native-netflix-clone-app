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
			trigger: { 
				seconds: 2,
				repeats: false,
				channelId: 'movie-release-channel'
			}	
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
	try {
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
	
		if (Platform.OS === 'android') 
		{
			/** Channel ID must match server side(Laravel) api expo channel id */
			Notifications.setNotificationChannelAsync('movie-release-channel', 
			{
				name: 'Movie Release',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
				sound: true
			});

			Notifications.setNotificationChannelAsync('subscription-expired-channel', 
			{
				name: 'Subscription Expiration',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
				sound: true
			});

			Notifications.setNotificationChannelAsync('subscription-cancelled-channel', 
			{
				name: 'Subscription Cancelled',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
				sound: true
			});

			Notifications.setNotificationChannelAsync('update-subscription-channel', 
			{
				name: 'UnSubscribed User',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
				sound: true
			});
		}
	
		return token;

	} catch (error) {
		console.log(error);		
	}
}