import { axios } from '@/utils/request'

const api = {
  list: 'whereUsedModel/list',
  show: 'whereUsedModel/show',
  add: 'whereUsedModel/add',
  update: 'whereUsedModel/update',
  delete: 'whereUsedModel/delete'
}

export default api

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
    params: parameter
  })
}
