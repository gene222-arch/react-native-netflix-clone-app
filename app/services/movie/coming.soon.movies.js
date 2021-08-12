import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/coming-soon-movies', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const incrementViewsAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/coming-soon-movies/${ id }/views`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
