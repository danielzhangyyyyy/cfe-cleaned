import {axios} from '@/utils/request'

const api = {
    list: 'bomStructure/list',
    show: 'bomStructure/show',
    add: 'bomStructure/add',
    update: 'bomStructure/update',
    delete: 'bomStructure/delete',
    commonList: 'common/getCommonList',
    getPlantList: 'bomStructure/getPlantList',
    getProdFamilyList:'bomStructure/getProdFamilyList',
    getAssemblyList: 'bomStructure/getAssemblyList',
    alterShow: 'itemEOL/show'
}

export default api

export function alterShow(parameter) {
    return axios({
        url: api.alterShow,
        method: 'get',
        params: parameter
    })
}

export function getAssemblyList(parameter) {
    return axios({
        url: api.getAssemblyList,
        method: 'get',
        params: parameter
    })
}

export function getProdFamilyList(parameter) {
    return axios({
        url: api.getProdFamilyList,
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
