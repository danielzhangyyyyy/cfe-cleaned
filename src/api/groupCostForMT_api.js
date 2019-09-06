import {axios} from '@/utils/request'

const api = {
    list: 'groupCostForMT/list',
    show: 'groupCostForMT/show',
    add: 'groupCostForMT/add',
    update: 'groupCostForMT/update',
    delete: 'groupCostForMT/delete',
    commonList: 'common/getCommonList',
    selectType: 'groupCostForMT/getGroupType',
    machineType: 'groupCostForMT/getMachineType'
}

export default api

export function getMachineType(parameter) {
    return axios({
        url: api.machineType,
        method: 'get',
        params: parameter
    })
}

export function getSelectType(parameter) {
    return axios({
        url: api.selectType,
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
