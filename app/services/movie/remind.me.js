import axiosInstance from '../../utils/axiosInstance'

export const markAsReadAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/remind-mes/mark-as-read', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}