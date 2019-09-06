import {axios} from '@/utils/request'

const api = {
    list: 'warrantyIdMap/list',
    show: 'warrantyIdMap/show',
    add: 'warrantyIdMap/add',
    update: 'warrantyIdMap/update',
    delete: 'warrantyIdMap/delete',
    commonList: 'common/getCommonList',
    seachWarrantyId: 'warrantyIdMap/getWarrantyId',
    seachWarrantyCode: 'warrantyIdMap/getWarrantyCode'
}

export default api

export function getWarrantyCode(parameter) {
    return axios({
        url: api.seachWarrantyCode,
        method: 'get',
        params: parameter
    })
}
export function getWarrantyId(parameter) {
    return axios({
        url: api.seachWarrantyId,
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
