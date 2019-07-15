import { actionTypes } from '../contsants'

const initialState = {
    list: [],
    loading: false,
    error: '',
    status: ''
}

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }

        case actionTypes.LOAD_HISTORY_SUCCESS:
            return {
                list: [...state.list, action.payload.list],
                loading: false,
                error: ''
            }

        case actionTypes.LOAD_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        default:
            return state
    }
}

export default historyReducer
