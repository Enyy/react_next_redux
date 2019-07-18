import { axiosInstance } from '../constants/axios'
const cpId = 'ConsultingWeb'
const auth_key = 'Q29uc3VsdGluZ1dlYl9ob3RlbA==';
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
let monthc, days
if (month < 10) {
    monthc = "0" + month;
}
if (day < 10) {
    days = "0" + day
} else {
    days = day
}
        const today = year + "-" + monthc + "-" + days;
export const getCallHistory = async () => {


    console.log(today);
    
    let data = {
        auth: { cpId: cpId, auth_key: auth_key},
        groupName: 'all',
        searchType: 'room',
        listType: 'all',
        option: {
            offset: 10 * 0,
            limit: 10,
            sort: 'desc'
        }
    }
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err))
}

export const getManagementsByGroup = async group => {
    console.log('!!!', group)
    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        groupName: group.group,
        searchType: 'room',
        listType: '',
        keyword: '',
        option: {
            offset: 10 * (group.active - 1),
            limit: 10,
            sort: 'desc'
        }
    }

    console.log('data?', data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getCurrencyBySort = async listType => {
    console.log("리스트 클릭!! ", listType);

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        listType: listType.listType,
        option: {
            offset: 10 * (listType.active - 1),
            limit: 10,
            sort: 'desc',
            endTime: listType.option.endTime,
            startTime: listType.option.startTime
        }
    }

    console.log("  정렬하자자자자자자자자  ", data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getSearchResultList = async searchType => {
    console.log(" r ", searchType);
    let data
    if (searchType.searchType == '') {
        data = {
            auth: { cpId: cpId, auth_key: auth_key },
            searchType: 'room',
            keyword: searchType.keyword,
            option: {
                offset: 10 * (searchType.active - 1),
                limit: 10,
                sort: 'desc', 
                startTime: searchType.option.startTime,
                endTime: searchType.option.endTime
            }
        }
    } else {
        data = {
            auth: { cpId: cpId, auth_key: auth_key },
            searchType: searchType.searchType,
            keyword: searchType.keyword,
            option: {
                offset: 10 * (searchType.active - 1),
                limit: 10,
                sort: 'desc',
                startTime: searchType.option.startTime,
                endTime: searchType.option.endTime
            }
        }

    }

    console.log("  검색!!! 결과!   ", data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getManagementsBySort = async search => {
    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        groupName: 'all',
        searchType: 'room',
        listType: search.optin,
        keyword: search.searchValue,
        option: {
            offset: 10 * (search.active - 1),
            limit: 10,
            sort: 'desc'
        }
    }
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getCalendarBySearch = async _data => {

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        groupName: 'all',
        searchType: 'room',
        option: {
            offset: 10 * (_data.active - 1),
            limit: 10,
            startTime: _data.option.startTime,
            endTime: _data.option.endTime,
            sort: 'desc'
        }
    }

    console.log("2" , data);
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getTableHeaderBySort = async sortType => {
    console.log("리스트 클릭!! ", sortType);

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        option: {
            offset: 10 * (sortType.active - 1),
            limit: 10,
            sortType: sortType.option.sortType,
            sort: sortType.option.sort
        }
    }

    console.log("  정렬하자자자자자자자자  ", data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}
