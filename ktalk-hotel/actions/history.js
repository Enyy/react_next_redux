import { axiosInstance } from '../constants/axios'

export const getCallHistory = async () => {
    let data = {
        auth: { cpId: '1', auth_key: '1' },
        groupName: 'all',
        searchType: 'room',
        listType: 'all',
        keyword: '',
        option: {
            offset: 10 * 0,
            limit: 10,
            sort: 'desc'
        }
    }
    return await axiosInstance
        .post('/call/getCallHistoryList', {
            data
        })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err))
}

export const getManagementsByGroup = async group => {
    console.log('!!!', group)
    let data = {
        auth: { cpId: '1', auth_key: '1' },
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
    console.log("리스트 클릭!! " , listType);

        let data = {
            auth: { cpId: '1', auth_key: '1' },
            listType: listType.listType,
            option: {
                offset: 10 * (listType.active - 1),
                limit: 10,
                sort: 'desc'
            }
        }

    console.log( "  정렬하자자자자자자자자  " , data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getSearchTypeList = async searchType => {
    console.log(" r ", searchType);

    let data = {
        auth: { cpId: '1', auth_key: '1' },
        searchType: searchType.searchType,
        keyword: searchType.searchValue,
        option: {
            offset: 10 * (searchType.active - 1),
            limit: 10,
            sort: 'desc'
        }
    }

    console.log("  정렬하자자자자자자자자  ", data)
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}


export const getManagementsByPage = async page => {
    let data = {
        auth: { cpId: '1', auth_key: '1' },
        groupName: 'all',
        searchType: 'room',
        listType: page.option,
        keyword: page.searchValue,
        option: {
            offset: 10 * (page.active - 1),
            limit: 10,
            sort: 'desc'
        }
    }
    return await axiosInstance
        .post('/call/getCallHistoryList', data)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export const getManagementsBySearch = async search => {
    let data = {
        auth: { cpId: '1', auth_key: '1' },
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
