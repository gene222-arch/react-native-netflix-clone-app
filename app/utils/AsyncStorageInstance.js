import AsyncStorage  from '@react-native-async-storage/async-storage';

export const setItem = async (key = '', value = '') => 
{
    try {
        await AsyncStorage.setItem(key, value);
    } catch ({ message }) {
        console.log(message);
    }
}

export const getItem = (key) => 
{
    try {
        const result = AsyncStorage.getItem(key);

        return result;
    } catch ({ message }) {
        console.log(message);
    }
}