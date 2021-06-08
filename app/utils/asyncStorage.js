import AsyncStorage  from '@react-native-async-storage/async-storage';

export const setItem = async (key = '', value = '') => 
{
    try {
        await AsyncStorage.setItem(key, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getItem = async (key) => 
{
    try {
        return await AsyncStorage.getItem(key);
    } catch ({ message }) {
        console.log(message);
    }
}