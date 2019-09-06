import {axios} from '@/utils/request'

const api = {
    list: 'sBBComponentFilter/list',
    show: 'sBBComponentFilter/show',
    add: 'sBBComponentFilter/add',
    update: 'sBBComponentFilter/update',
    delete: 'sBBComponentFilter/delete',
    commonList: 'common/getCommonList',
    filterSBB: 'workflow/filterSBB'
}

export default api

export function filterSBB(parameter) {
    return axios({
        url: api.filterSBB,
        method: 'post',
        data: parameter
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
