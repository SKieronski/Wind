import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://e5f0-2601-249-a40-4320-8ea-b947-a51e-929e.ngrok.io'
})

export default instance