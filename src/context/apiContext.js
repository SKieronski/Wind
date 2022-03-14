import createDataContext from './createDataContext';
import windApi from '../api/windApi'

const apiReducer = (state,action) => {
    switch(action.type) {
        case 'fetch_routes':
            return action.payload;
        default:
            return state;
    }
}

const fetchRoutes = (dispatch) => {
    return async () => {
        const response = await windApi.get('/runroutes')
        dispatch({type: 'fetch_routes', payload: response.data})
    }
}

const createRoute = (dispatch) => {
    return async (title, distance, startPos, endPos) => {
        await windApi.post('/tracks', {title, distance, startPos, endPos})
    }
}

export const {Provider, Context} = createDataContext(
    apiReducer,
    {fetchRoutes, createRoute},
    []
)