import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext';
import windApi from '../api/windApi'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'signout':
            return {token: null, errorMessage: ''}
        case 'signin':
            return {...state, token: action.payload}
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        default: 
            return state;
    }
};

//Sign a user up to our DB and if successful, give them a token
const signup = (dispatch) => {
    return async (email, password) => {
        try {
            const response = await windApi.post('/signup', {email, password})
            
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token});
        } catch (err) {
            dispatch({
                type: 'add_error', 
                payload: 'Something went wrong with sign up'
            })
        }
    }
}

//Sign a user in, if successful give them a token
const signin = (dispatch) => {
    return async (email, password) => {
        try {
            const response = await windApi.post('/signin', {email, password})
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token});
        } catch(err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    }
}

//this is used to check if a JWT token already exists in AsyncStorage
// then dispatch to signin automatically without the user needing to signin again
const tryLocalSignin = (dispatch) => {
    return async () =>{
        const token = await AsyncStorage.getItem('token');
        if(token){
            dispatch({type:'signin', payload: token})
        } else {
            console.log("Local Sign in no work")
        }

    }
}

//remove the token in asyncstorage and reset state in reducer
const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'})
    }
}

//this function is used in Signup and Signin screens to clear error messages
// we set it up in Reducer because the errorMessage is part of AuthContext's state
const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'})
    }
}

export const { Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin}, 
    {token: null, errorMessage: ''} 
)