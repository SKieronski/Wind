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

const fetchOneRouteAndDelete = (dispatch) => {
    return async ({title, distance, startPos, endPos}) => {
        console.log("YO")
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
        console.log(response.data)
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
    return async () => {
        await windApi.delete('/runroutes/:id')
    }
}

export const {Provider, Context} = createDataContext(
    apiReducer,
    {fetchRoutes, createRoute, deleteRoute, fetchOneRouteAndDelete},
    []
)