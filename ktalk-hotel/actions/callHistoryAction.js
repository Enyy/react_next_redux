import { actionTypes} from '../contsants'
import axios from 'axios'


export const loadHistories = () => async dispath => {
    try {
        dispath({
            type : actionTypes.LOAD_HISTORY_REQUEST // 요청
        })

        let res = await axios.post('http://ktgenie.com:8000/hotel/v1/call/getCallHistoryList')

        console.log(res);

        dispatch({
            type: actionTypes.LOAD_HISTORY_SUCCESS,
            payload: {
                data
            }
        })
    } catch (err) {
        console.log('err', err)
        dispatch({
            type: actionTypes.LOAD_HISTORY_FAILURE,
            payload: {
                error: err
            }
        })
    }
} 