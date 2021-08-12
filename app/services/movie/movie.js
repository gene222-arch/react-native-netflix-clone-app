import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/movies')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchCategorizedMoviesAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/movies/categorized')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchLatestTwentyAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/movies/latest/20')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/movies/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const incrementViewsAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/movies/${ id }/views`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}