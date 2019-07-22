import { axiosInstance, handleError, handleSuccess } from '../constants/axios'
const cpId = 'ConsultingWeb'
const auth_key = 'Q29uc3VsdGluZ1dlYl9ob3RlbA==';


export const getMissedList = async () => {
    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        groupName: 'all',
        searchType: 'room',
        listType: 'miss',
        option: {
            offset: 10 * 0,
            limit: 10,
            sort: 'desc', 
            startTime : 20190701
        }
    }

    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(handleSuccess)
        .catch(handleError)

}