import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://f4ce-2601-249-a40-4320-60e3-cb6c-60d3-eb2f.ngrok.io'
})

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