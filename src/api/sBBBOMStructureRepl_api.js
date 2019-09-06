import {axios} from '@/utils/request'

const api = {
    list: 'sBBBOMStructureRepl/list',
    show: 'sBBBOMStructureRepl/show',
    add: 'sBBBOMStructureRepl/add',
    update: 'sBBBOMStructureRepl/update',
    delete: 'sBBBOMStructureRepl/delete',
    commonList: 'common/getCommonList',
    getBomType: 'sBBBOMStructureRepl/getBomType',
    getPlantList: 'sBBBOMStructureRepl/getPlantList',
    getCostPlantList: 'sBBBOMStructureRepl/getCostPlantList'
}

export default api

export function getCostPlantList(parameter) {
    return axios({
        url: api.getCostPlantList,
        method: 'get',
        data: parameter
    })
}

export function getPlantList(parameter) {
    return axios({
        url: api.getPlantList,
        method: 'get',
        data: parameter
    })
}

export function getBomType(parameter) {
    return axios({
        url: api.getBomType,
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
