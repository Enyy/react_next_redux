import { axiosInstance, handleSuccess, handleError} from '../constants/axios'
const cpId = 'ConsultingWeb'
const auth_key = 'Q29uc3VsdGluZ1dlYl9ob3RlbA==';

export const getMemoInfo = async idx => {
    console.log(idx)
    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        historyIdx: idx
    }
    console.log(data);

    return await axiosInstance
        .post('/call/getMemoInfo', data)
        .then(handleSuccess)
        .catch(handleError)

}