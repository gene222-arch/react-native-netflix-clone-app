import Axios from 'axios'
import asyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = (contentType = null) => 
{
    let headers = {};

    if (asyncStorage.getItem('@access_token')) {
        headers.Authorization = `Bearer ${ asyncStorage.getItem('@access_token') }`
    }

    const axiosInstance = Axios.create({
        baseURL: 'https://imdb8.p.rapidapi.com',
        headers
    });

    axiosInstance.interceptors.response.use(
        response => Promise.resolve(response),
        error => {
            switch (error.response.status) {
                case 401:
                    console.log('Unauthorized access');
                    break;

                case 403:
                    console.log('Forbidden');
                    break;

                case 500:
                    console.log('Something went wrong in the server');
                    break;            

                default:
                    break;
            }

            return Promise.reject(error);
        }
    )

    return axiosInstance;
}

export default axiosInstance