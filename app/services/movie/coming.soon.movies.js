import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async ({ is_for_kids }) => 
{
    return await axiosInstance()
        .get(`/coming-soon-movies?status=Coming Soon&isForKids=${ is_for_kids }`, payload)
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
