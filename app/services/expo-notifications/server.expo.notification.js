import axiosInstance from '../../utils/axiosInstance'

export const subscribe = async (payload) => 
{
    return await axiosInstance()
        .get('/exponent/devices/subscribe')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}


export const unsubscribe = async (payload) => 
{
    return await axiosInstance()
        .get('/exponent/devices/unsubscribe')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}