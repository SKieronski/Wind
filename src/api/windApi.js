import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://c83a-2601-249-a40-4320-d552-c33e-6fdd-fe85.ngrok.io'
})

export default instance