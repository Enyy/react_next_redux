import { axiosInstance } from '../constants/axios'
const cpId = 'ConsultingWeb'
const auth_key = 'Q29uc3VsdGluZ1dlYl9ob3RlbA==';

export const getMemoInfo = async memo => {

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        historyIdx : 4
    }
    console.log(data);

    return await axiosInstance
        .post('/call/getMemoInfo', data)
        .then(res => res)
        .catch(err => Promise.reject(err))


}