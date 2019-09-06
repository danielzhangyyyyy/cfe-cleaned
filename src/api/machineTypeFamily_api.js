import { axios } from '@/utils/request'

const api = {
  list: 'machineTypeFamily/list',
  show: 'machineTypeFamily/show',
  add: 'machineTypeFamily/add',
  update: 'common/commonExecute',
  delete: 'machineTypeFamily/delete',
  commonList: 'common/getCommonList',
  productTypeList: 'machineTypeFamily/getProductType',
  productFamilyList: 'machineTypeFamily/getProdFamilyList'
}

export default api

export function getProductFamilyDropDownList (parameter) {
  return axios({
    url: api.productFamilyList,
    method: 'get',
    params: parameter
  })
}


export function getProductTypeDropDownList (parameter) {
  return axios({
    url: api.productTypeList,
    method: 'get',
    params: parameter
  })
}

export function getDropDownList (parameter) {
  return axios({
    url: api.commonList,
    method: 'post',
    data: parameter
  })
}

export function list (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function show (parameter) {
  return axios({
    url: api.show,
    method: 'get',
    params: parameter
  })
}

export function add (parameter) {
  return axios({
    url: api.add,
    method: 'post',
    params: parameter
  })
}

export function update (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

export function del (parameter) {
  return axios({
    url: api.delete,
    method: 'delete',
    params: parameter
  })
}
