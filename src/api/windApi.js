import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://c629-2601-249-a40-4320-6d4d-e5ab-fa6b-8942.ngrok.io'
})

//Adds our token to the headers of the request before sending it to the BE server
instance.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (err) => {
        return Promise.reject(err);
    }
)

export default instance