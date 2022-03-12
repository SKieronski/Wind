import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://7531-2601-249-a40-4320-a8da-d1b-192-1398.ngrok.io'
})

export default instance