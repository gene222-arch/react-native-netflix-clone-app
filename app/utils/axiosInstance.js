import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from './../../env';

const axiosInstance = () => 
{
    let accessToken = null;

    (async () => {
        accessToken = await AsyncStorage.getItem('@access_token');
    });

    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${ accessToken }`
    }

    const axiosInstance = Axios.create({
        baseURL: ENV.DEVELOPMENT_MODE_API_URL,
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