import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async ({ is_for_kids }) => 
{
    return await axiosInstance()
        .get(`/movies?isForKids=${ is_for_kids }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchCategorizedMoviesAsync = async ({ is_for_kids }) => 
{
    return await axiosInstance()
        .get(`/movies/categorized?isForKids=${ is_for_kids }`)
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

export const fetchTopSearchesAsync = async ({ is_for_kids }) => 
{
    return await axiosInstance()
        .get(`/movies/top-searches?isForKids=${ is_for_kids }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchMostLikedMoviesAsync = async () => 
{
    return await axiosInstance()
        .get('/movies/most-liked')
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


export const findRandomlyAsync = async (isForkids = false) => 
{
    return await axiosInstance()
        .get(`/movies/random?isForKids=${ isForkids }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const incrementSearchCountAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/movies/${ id }/search-count`)
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