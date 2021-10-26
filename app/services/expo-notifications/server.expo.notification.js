import axiosInstance from '../../utils/axiosInstance'

const BASE_URL = '/exponent/devices';

export const subscribe = async (payload) => 
{
    return await axiosInstance()
        .post(`${ BASE_URL }/subscribe`, payload)
        .then(response => response)
        .catch(error => console.log(error.response));
}


export const unsubscribe = async (payload) => 
{
    return await axiosInstance()
        .post(`${ BASE_URL }/unsubscribe`)
        .then(response => console.log('UNSUBSCRIBED SUCCESSFULLY'))
        .catch(error => console.log(error.response));
}