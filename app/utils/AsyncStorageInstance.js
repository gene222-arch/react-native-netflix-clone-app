import AsyncStorage  from '@react-native-async-storage/async-storage';

const TOKEN_NAME = 'access_token';

export const storeAccessToken = async (value = '') => 
{
    try {
        await AsyncStorage.setItem(TOKEN_NAME, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getAccessToken = async () => 
{
    try {
        return await AsyncStorage.getItem(TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}

export const removeAccessToken = async () => 
{
    try {
        return await AsyncStorage.removeItem(TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}