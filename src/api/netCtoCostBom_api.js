import {axios} from '@/utils/request'

const api = {
    list: 'netCtoCostBom/ctoCostBomExecute',
    show: 'netCtoCostBom/show',
    commonList: 'common/getCommonList',
    brandList: 'modelList/getBrandList',
    brandListByAssembly: 'modelList/getBrandByItem',
    prdFamilyListByBrand: 'modelList/getFamilyByBrand',
    prdFamilyListByAssembly: 'modelList/getFamilyByItem',
    getItemByBrandFamily: 'modelList/getItemByBrandFamily',
    plantList: 'modelList/getPlantByItem',
    countryList: 'modelList/getCountryByItem',
    getDescription: 'itemEOL/show',
    detail: 'netCostBom/getBreakDown',
}

export default api

export function detail(parameter) {
    return axios({
        url: api.detail,
        method: 'post',
        data: parameter
    })
}

export function getDescription(parameter) {
    return axios({
        url: api.getDescription,
        method: 'get',
        params: parameter
    })
}

export function getBrandByAssembly(parameter) {
    return axios({
        url: api.brandListByAssembly,
        method: 'get',
        params: parameter
    })
}

export function getBrand(parameter) {
    return axios({
        url: api.brandList,
        method: 'get',
        params: parameter
    })
}

export function getPrdFamilyByAssembly(parameter) {
    return axios({
        url: api.prdFamilyListByAssembly,
        method: 'get',
        params: parameter
    })
}

export function getPrdFamilyByBrand(parameter) {
    return axios({
        url: api.prdFamilyListByBrand,
        method: 'get',
        params: parameter
    })
}

export function getItemByBrandFamily(parameter) {
    return axios({
        url: api.getItemByBrandFamily,
        method: 'get',
        params: parameter
    })
}

export function getPlantListByAssembly(parameter) {
    return axios({
        url: api.plantList,
        method: 'get',
        params: parameter
    })
}

export function getCountryListByPlant(parameter) {
    return axios({
        url: api.countryList,
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
        method: 'post',
        data: parameter
    })
}

