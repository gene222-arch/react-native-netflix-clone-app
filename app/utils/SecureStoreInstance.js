import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_NAME = 'access_token';
const EXPO_TOKEN_NAME = 'expo_token';

export const storeAccessToken = async (value = '') => 
{
    try {
        await SecureStore.setItemAsync(ACCESS_TOKEN_NAME, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getAccessToken = async () => 
{
    try {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}

export const removeAccessToken = async () => 
{
    try {
        return await SecureStore.deleteItemAsync(ACCESS_TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}

export const storeExpoNotificationToken = async (value = '') => 
{
    try {
        await SecureStore.setItemAsync(EXPO_TOKEN_NAME, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getExpoNotificationToken = async () => 
{
    try {
        return await SecureStore.getItemAsync(EXPO_TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}

export const removeExpoNotificationToken = async () => 
{
    try {
        return await SecureStore.deleteItemAsync(EXPO_TOKEN_NAME);
    } catch ({ message }) {
        console.log(message);
    }
}