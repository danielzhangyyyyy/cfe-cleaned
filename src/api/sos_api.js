import {axios} from '@/utils/request'

const api = {
    list: 'sos/list',
    show: 'sos/show',
    add: 'sos/add',
    update: 'sos/update',
    delete: 'sos/delete',
    commonList: 'common/getCommonList',
    getMachineTypeList: 'sos/getMachineTypeByPrdf',
    getPrdFamily: 'sos/getPrdFamily'
}

export default api

export function getPrdFamily(parameter) {
    return axios({
        url: api.getPrdFamily,
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

export function getMachineTypeList(parameter) {
    return axios({
        url: api.getMachineTypeList,
        method: 'get',
        params: parameter
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
