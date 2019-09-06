import {axios} from '@/utils/request'

const api = {
    list: 'sBBBomStructure/list',
    show: 'sBBBomStructure/show',
    add: 'sBBBomStructure/add',
    update: 'sBBBomStructure/update',
    delete: 'sBBBomStructure/delete',
    commonList: 'common/getCommonList',
    getPlantList: 'sBBBomStructure/getPlantList',
    getShow: 'itemEOL/show'
}

export default api

export function getShow(parameter) {
    return axios({
        url: api.getShow,
        method: 'get',
        params: parameter
    })
}

export function getPlantList(parameter) {
    return axios({
        url: api.getPlantList,
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
