import {axios} from '@/utils/request'

const api = {
    list: 'componentWarranty/list',
    show: 'componentWarranty/show',
    add: 'componentWarranty/add',
    update: 'componentWarranty/update',
    delete: 'componentWarranty/delete',
    commonList: 'common/getCommonList',
    typeSelect: 'componentWarranty/getType'
}

export default api

export function getTypeSelect(parameter) {
    return axios({
        url: api.typeSelect,
        method: 'get',
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
