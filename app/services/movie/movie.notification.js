import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (isForKids = false) => 
{
    return await axiosInstance()
        .get(`movie-notifications?isForKids=${ isForKids }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}