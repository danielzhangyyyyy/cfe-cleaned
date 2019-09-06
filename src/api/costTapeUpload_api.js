import {axios} from '@/utils/request'

const api = {
    list: 'costTapeUpload/list',
    show: 'costTapeUpload/show',
    add: 'costTapeUpload/add',
    update: 'costTapeUpload/update',
    delete: 'costTapeUpload/delete',
    commonList: 'common/getCommonList',
    commodity: 'costTapeSelectedImport/getCommodity',
    specByCommodity: 'costTapeUpload/getSpecByCommodity'
}

export default api

export function getSpecByCommodity(parameter) {
    return axios({
        url: api.specByCommodity,
        method: 'get',
        params: parameter
    })
}
export function getCommodity(parameter) {
    return axios({
        url: api.commodity,
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
