import createDataContext from './createDataContext';
import windApi from '../api/windApi'

const apiReducer = (state,action) => {
    switch(action.type) {
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'fetch_routes':
            return action.payload;
        default:
            return state;
    }
}

const fetchOneRouteAndDelete = (dispatch) => {
    return async ({title, distance, startPos, endPos}) => {
        const response = await windApi.get('/runroutes/one', 
            {
                params: {
                    title: title, 
                    distance: distance, 
                    startPos: startPos, 
                    endPos: endPos
                }
            }
        );
        await windApi.delete(`/runroutes/${response.data._id}`)
    }
}

const fetchRoutes = (dispatch) => {
    return async () => {
        const response = await windApi.get('/runroutes')
        dispatch({type: 'fetch_routes', payload: response.data})
    }
}

const createRoute = (dispatch) => {
    return async ({title, distance, startPos, endPos}) => {
        await windApi.post('/runroutes', 
            {
                title: title, 
                distance: distance, 
                startPos: startPos, 
                endPos: endPos
            }
        );
    }
}

const deleteRoute = (dispatch) => {
    return async (id) => {
        await windApi.delete(`/runroutes/${id}`)
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

export const {Provider, Context} = createDataContext(
    apiReducer,
    {fetchRoutes, createRoute, deleteRoute, fetchOneRouteAndDelete},
    []
)