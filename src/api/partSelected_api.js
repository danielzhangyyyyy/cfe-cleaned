import {axios} from '@/utils/request'

const api = {
    list: 'partSelected/list',
    show: 'partSelected/show',
    add: 'partSelected/add',
    update: 'partSelected/update',
    delete: 'partSelected/delete',
    commonList: 'common/getCommonList',
    productGroup: 'partSelected/getProductGroup'
}

export default api

export function getProductGroup(parameter) {
    return axios({
        url: api.productGroup,
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
