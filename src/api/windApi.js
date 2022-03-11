import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://0c64-2601-249-a40-4320-4cf0-31f8-deac-be5a.ngrok.io'
})

export default instance