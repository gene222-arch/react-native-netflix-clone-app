import axiosInstance from '../../utils/axiosInstance'

export const createDownloadAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/my-downloads', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteDownloadAsync = async ({ ids, user_profile_id }) => 
{
    return await axiosInstance()
        .delete(`/my-downloads/user-profiles/${user_profile_id}`, {
            data: ids
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}