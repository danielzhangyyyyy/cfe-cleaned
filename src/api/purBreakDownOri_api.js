import {axios} from '@/utils/request'

const api = {
    list: 'purBreakDownOri/list',
    show: 'purBreakDownOri/show',
    add: 'purBreakDownOri/add',
    update: 'purBreakDownOri/update',
    delete: 'purBreakDownOri/delete',
    commonList: 'common/getCommonList',
    findPartNumList: 'purBreakDownOri/findPartNumList',
    findCommElemList: 'purBreakDownOri/findCommElemList'
}

export default api

export function getCommElemList(parameter) {
    return axios({
        url: api.findCommElemList,
        method: 'get',
        params: parameter
    })
}

export function getPartNumList(parameter) {
    return axios({
        url: api.findPartNumList,
        method: 'get',
        params: parameter
    })
}

export function getDropDownList(parameter) {
    return axios({
        url: api.commonList,
        method: 'post',
        data: parameter
    })
}

export function list(parameter) {
    return axios({
        url: api.list,
        method: 'get',
        params: parameter
    })
}

export function show(parameter) {
    return axios({
        url: api.show,
        method: 'get',
        params: parameter
    })
}

export function add(parameter) {
    return axios({
        url: api.add,
        method: 'post',
        params: parameter
    })
}

export function update(parameter) {
    return axios({
        url: api.update,
        method: 'put',
        params: parameter
    })
}

export function del(parameter) {
    return axios({
        url: api.delete,
        method: 'delete',
        data: parameter
    })
}
