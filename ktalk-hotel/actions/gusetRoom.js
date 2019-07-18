import { axiosInstance } from '../constants/axios'
const cpId = 'ConsultingWeb'
const auth_key = 'Q29uc3VsdGluZ1dlYl9ob3RlbA==';


export const getGuestRoomList = async () => {
    let data = {
        auth: { cpId : cpId , auth_key : auth_key},
        listType : 'all'
    }

    return await axiosInstance
            .post('/room/getGuestRoomList' , data)
        .then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}



export const getGuestRoomSearch = async (search) => {
    console.log(search);
    
    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        listType: 'all', 
        keyword: search.keyword
    }

    return await axiosInstance
        .post('/room/getGuestRoomList', data)
        .then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}

export const getGuestRoomFloorSort = async (Floor) => {
    console.log(Floor)

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        listType: Floor.listType
    }

    return await axiosInstance.post('/room/getGuestRoomList', data)
        .then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}