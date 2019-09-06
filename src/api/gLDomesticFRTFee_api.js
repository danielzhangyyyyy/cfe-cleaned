import {axios} from '@/utils/request'

const api = {
    list: 'gLDomesticFRTFee/list',
    delete: 'gLDomesticFRTFee/delete',
    commonList: 'common/getCommonList',
    getGeoCode: 'gLOutboundFRTByUnit/getGeoCode'
}

export default api

export function getGeoCode(parameter) {
    return axios({
        url: api.getGeoCode,
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

export function del(parameter) {
    return axios({
        url: api.delete,
        method: 'delete',
        data: parameter
    })
}
