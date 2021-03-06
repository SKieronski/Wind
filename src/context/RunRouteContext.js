import createDataContext from './createDataContext'

//State should hold: startPos, endPos, distance, bearing, title
// Actions should be markStart, markEnd, changeDistance, changeBearing
const runRouteReducer = (state, action) => {
    switch(action.type) {
        case 'change_modal_visibility':
            return {...state, modalVisible: action.payload}
        case 'change_loading':
            return {...state, loading: action.payload}
        case 'change_bearing':
            return {...state, bearing: action.payload}
        case 'change_title':
            return {...state, title: action.payload}
        case 'change_distance':
            return {...state, distance: action.payload}
        case 'mark_current_pos':
            return {...state, currentPos: action.payload}
        case 'mark_end':
            return {...state, endPos: action.payload};
        case 'mark_start':
            return {...state, startPos: action.payload};
        case 'reset':
            return {...state, 
                title: '', 
                startPos: null,
                endPos: null,
                distance: null,
                bearing: null
            };
        default:
            return state;
    }
}

const changeLoading = (dispatch) => {
    return (bool) => {
        dispatch({type: 'change_loading', payload: bool})
    }
}

const reset = (dispatch) => {
    return () => {
        dispatch({type: 'reset'})
    }
}

const markStart = (dispatch) => {
    return (location) => {
        dispatch({type: 'mark_start', payload: location}) 
    }
}

const markEnd = (dispatch) => {
    return (location) => {
        dispatch({type: 'mark_end', payload: location})
    }
}

const markCurrentPos = (dispatch) => {
    return (location) => {
        dispatch({type: 'mark_current_pos', payload: location})
    }
}

const changeDistance = (dispatch) => {
    return (dist) => {
        dispatch({type: 'change_distance', payload: dist})
    }
}

const changeBearing = (dispatch) => {
    return (brng) => {
        dispatch({type: 'change_bearing', payload: brng})
    }
}

const changeTitle = (dispatch) => {
    return (title) => {
        dispatch({type: 'change_title', payload: title})
    }
}

const changeModalVisible = (dispatch) => {
    return (visible) => {
        dispatch({type: 'change_modal_visibility', payload:visible})
    }
}

export const {Context, Provider} = createDataContext(
    runRouteReducer,
    {changeModalVisible, reset, markStart, markEnd, markCurrentPos,changeDistance, changeBearing, changeTitle, changeLoading},
    {title: '', startPos: null, endPos: null, currentPos: null , distance: null, bearing: null, loading: true, modalVisible: false}
)