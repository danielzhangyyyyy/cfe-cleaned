import {axios} from '@/utils/request'

const api = {
    list: 'basicNameMaintain/list',
    show: 'basicNameMaintain/show',
    add: 'basicNameMaintain/add',
    update: 'basicNameMaintain/update',
    delete: 'basicNameMaintain/delete',
    commonList: 'common/getCommonList',
    getProdType: 'basicNameMaintain/getProdType',
    getSBBTypeSel: 'basicNameMaintain/getSBBType'
}

export default api

export function getSBBTypeSel(parameter) {
    return axios({
        url: api.getSBBTypeSel,
        method: 'get',
        data: parameter
    })
}

export function getProdTypeSel(parameter) {
    return axios({
        url: api.getProdType,
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
