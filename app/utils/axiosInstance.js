import Axios from 'axios'
import ENV from './../../env';
import * as SecureStoreInstance from './SecureStoreInstance'

const axiosInstance = () => 
{
    const headers = {};

    const axiosInstance = Axios.create({
        baseURL: ENV.DEVELOPMENT_MODE_API_URL,
        headers
    });

    axiosInstance.interceptors.request.use(async (req) => {
        const accessToken = await SecureStoreInstance.getAccessToken();

        return {
            ...req,
            headers: {
                ...req.headers,
                Authorization: `Bearer ${ accessToken }`
            }
        };
    })

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