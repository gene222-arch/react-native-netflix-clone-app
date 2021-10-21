import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get('movie-notifications')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}