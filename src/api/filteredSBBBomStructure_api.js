import {axios} from '@/utils/request'

const api = {
    list: 'filteredSBBBomStructure/list',
    show: 'filteredSBBBomStructure/show',
    add: 'filteredSBBBomStructure/add',
    update: 'filteredSBBBomStructure/update',
    delete: 'filteredSBBBomStructure/delete',
    commonList: 'common/getCommonList',
    getSbbType: 'filteredSBBBomStructure/getSbbType',
    getPlantBySbb:'filteredSBBBomStructure/getPlantBySbb',
    filteredByBasicName:'workflow/filteredByBasicName'
}

export default api

export function filteredByBasicName(parameter) {
    return axios({
        url: api.filteredByBasicName,
        method: 'post',
        data: parameter
    })
}
export function getPlantBySbbSel(parameter) {
    return axios({
        url: api.getPlantBySbb,
        method: 'get',
        params: parameter
    })
}

export function getSbbTypeSel(parameter) {
    return axios({
        url: api.getSbbType,
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
