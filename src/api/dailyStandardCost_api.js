import {axios} from '@/utils/request'

const api = {
    list: 'dailyStandardCost/list',
    show: 'dailyStandardCost/show',
    add: 'dailyStandardCost/add',
    update: 'dailyStandardCost/update',
    delete: 'dailyStandardCost/delete',
    commonList: 'common/getCommonList',
    prodFamilyByBrand: 'dailyStandardCost/getProdFamilyByBrand',
    publishDailyStdCost:'workflow/publishDailyStdCost',
    execDailyStdCost:'workflow/execDailyStdCost'
}

export default api

export function execDailyStdCost(parameter) {
    return axios({
        url: api.execDailyStdCost,
        method: 'post',
        data: parameter
    })
}

export function publishDailyStdCost(parameter) {
    return axios({
        url: api.publishDailyStdCost,
        method: 'post',
        data: parameter
    })
}

export function getProdFamilyByBrand(parameter) {
    return axios({
        url: api.prodFamilyByBrand,
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
