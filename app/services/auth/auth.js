import axiosInstance from '../../utils/axiosInstance'

export const fetchAllProfilesAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/user-profiles')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findProfileByIdAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/user-profiles/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createProfileAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/user-profiles`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateProfileAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/user-profiles/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteProfileByIdAsync = async (id) => 
{
    return await axiosInstance()
        .delete(`/user-profiles/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const toggleMyListAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/my-lists', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const toggleRemindMeAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/remind-mes', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const rateMovieAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/user-ratings`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
