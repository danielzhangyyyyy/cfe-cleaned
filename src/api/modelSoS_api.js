import {axios} from '@/utils/request'

const api = {
    list: 'modelSoS/list',
    show: 'modelSoS/show',
    add: 'modelSoS/add',
    update: 'modelSoS/update',
    delete: 'modelSoS/delete',
    commonList: 'common/getCommonList',
    getBrandList: 'modelSoS/getBrandList',
    getMotList: 'modelSoS/getMotList',
    // add 页面的接口
    getProdFamilyByModel:'modelSoS/getProdFamilyByModel',
    getBrandByModel:'modelSoS/getBrandByModel',
    getDescByModel:'modelSoS/getDescByModel'
}

export default api

//以下为add页面的
export function getProdFamilyByModel(parameter) {
    return axios({
        url: api.getProdFamilyByModel,
        method: 'get',
        params: parameter
    })
}

export function getBrandByModel(parameter) {
    return axios({
        url: api.getBrandByModel,
        method: 'get',
        params: parameter
    })
}
export function getDescByModel(parameter) {
    return axios({
        url: api.getDescByModel,
        method: 'get',
        params: parameter
    })
}
//以上为add页面的
export function getMotList(parameter) {
    return axios({
        url: api.getMotList,
        method: 'get',
        data: parameter
    })
}

export function getBrandList(parameter) {
    return axios({
        url: api.getBrandList,
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
