import { axios } from '@/utils/request'

const api = {
  list: 'partialCal/list',
  show: 'partialCal/show',
  add: 'partialCal/add',
  update: 'partialCal/update',
  delete: 'partialCal/delete',
  commonList: 'common/getCommonList',
  typeList: 'partialCal/getTypeList'
}

export default api

export function getTypeDropDownList (parameter) {
  return axios({
    url: api.typeList,
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
