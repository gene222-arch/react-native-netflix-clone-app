import { Alert } from 'react-native'

export const okAlert = (title, message) => 
{
    Alert.alert(title, message,
        [
            { 
              text: 'OK' 
            }
        ]
    );
}