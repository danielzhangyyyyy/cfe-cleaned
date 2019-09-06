import {axios} from '@/utils/request'

const api = {
  list: 'groupCostForModel/list',
  show: 'groupCostForModel/show',
  add: 'groupCostForModel/add',
  update: 'groupCostForModel/update',
  delete: 'groupCostForModel/delete',
  commonList: 'common/getCommonList',
  getTypeList: 'groupCostForModel/getTypeList',
}

export default api

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
    method: 'put',
    params: parameter
  })
}

export function del (parameter) {
  return axios({
    url: api.delete,
    method: 'delete',
    data: parameter
  })
}

export function getTypeList (parameter) {
  return axios({
    url: api.getTypeList,
    method: 'get',
    params: parameter
  })
}
