import Axios from 'axios'
import ENV from './../../env';
import * as AsyncStorageInstance from './AsyncStorageInstance'


let accessToken = ''; 

AsyncStorageInstance
    .getAccessToken()
    .then(token => {
        accessToken = token;
    });


const axiosInstance = () => 
{
    const headers = {
        Authorization: `Bearer ${ accessToken }`
    };

    const axiosInstance = Axios.create({
        baseURL: ENV.DEVELOPMENT_MODE_API_URL,
        headers
    });

    axiosInstance.interceptors.request.use(req => 
    {
        console.log(req);
        return req;
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