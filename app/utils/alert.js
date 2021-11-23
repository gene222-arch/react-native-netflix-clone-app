import { Alert } from 'react-native'

export const okAlert = (title, message) => 
{
    setTimeout(() => {
        Alert.alert(title, message,
            [
                { 
                  text: 'OK' 
                }
            ]
        );
    }, 2000);
}