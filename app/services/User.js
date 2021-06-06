import axiosInstance from './../utils/axiosInstance';

export const index = async () => 
{
    return await axiosInstance()
        .get('/users')
        .then(({ data }) => data)
        .catch(({ response }) => Promise.reject(response.data));
}
