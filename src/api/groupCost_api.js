import { axios } from '@/utils/request'

const api = {
  list: 'groupCost/list',
  show: 'groupCost/show',
  add: 'groupCost/add',
  update: 'groupCost/update',
  delete: 'groupCost/delete',
  commonList: 'common/getCommonList',
  getGroupType: 'groupCost/getGroupType',
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

export function getGroupType (parameter) {
  return axios({
    url: api.getGroupType,
    method: 'get',
    params: parameter
  })
}