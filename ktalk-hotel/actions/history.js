import { axiosInstance, handleError, handleSuccess } from '../constants/axios'
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
        .then(handleSuccess)
        .catch(handleError)
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
        .then(handleSuccess)
        .catch(handleError)
}
// 통화 정렬 
export const getCurrencyBySort = async listType => {

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        listType: listType.listType,
        option: {
            offset: 10 * (listType.active - 1),
            limit: 10,
            sort: 'desc',
            sortType : '',
            endTime: listType.option.endTime,
            startTime: listType.option.startTime
        }
    }

    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(handleSuccess)
        .catch(handleError)
}

export const getSearchResultList = async searchType => {

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

    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(handleSuccess)
        .catch(handleError)
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
        .then(handleSuccess)
        .catch(handleError)
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

    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(handleSuccess)
        .catch(handleError)
}

export const getTableHeaderBySort = async sortType => {

    let data = {
        auth: { cpId: cpId, auth_key: auth_key },
        option: {
            offset: 10 * (sortType.active - 1),
            limit: 10,
            sortType: sortType.option.sortType,
            sort: sortType.option.sort
        }
    }

    console.log("헤더 정렬!!!!!!!!!!! ", data);
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(handleSuccess)
        .catch(handleError)
}
