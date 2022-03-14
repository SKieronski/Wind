import createDataContext from './createDataContext'
const modalReducer = (state, action) => {
    switch(action.type) {
        case 'change_modal_visibility':
            return {...state, modalVisible: action.payload}
        default:
            return state
    }
}

const changeModalVisible = (dispatch) => {
    return (visible) => {
        dispatch({type: 'change_modal_visibility', payload:visible})
    }
}

export const { Provider, Context} = createDataContext(
    modalReducer,
    {changeModalVisible}, 
    {modalVisible: false} 
)