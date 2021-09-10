import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/recently-watched-movies')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIdAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/recently-watched-movies/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/recently-watched-movies/user-profiles/${ payload.user_profile_id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/recently-watched-movies`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete(`/recently-watched-movies`, {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}


export const clearAsync = async (payload) => 
{
    return await axiosInstance()
        .delete(`/recently-watched-movies/clear`, {
            data: payload
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
