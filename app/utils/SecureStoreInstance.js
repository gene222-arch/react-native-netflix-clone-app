import * as SecureStore from 'expo-secure-store';

const TOKEN_NAME = 'access_token';

export const storeAccessToken = async (value = '') => 
{
    try {
        await SecureStore.setItemAsync(TOKEN_NAME, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getAccessToken = async () => 
{
    try {
        return await SecureStore.getItemAsync(TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}

export const removeAccessToken = async () => 
{
    try {
        return await SecureStore.deleteItemAsync(TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}