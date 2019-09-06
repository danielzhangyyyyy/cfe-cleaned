import { axios } from '@/utils/request'

const api = {
  list: 'poWb/list',
  show: 'poWb/show',
  add: 'poWb/add',
  update: 'poWb/update',
  delete: 'poWb/delete',
  commonList: 'common/getCommonList',
  executeAPI: 'workflow/executeReportWorkflow',
  executePOWB: 'workflow/powb'
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

export function invokeWorkflow(parameter) {
  return axios({
    url: api.executeAPI,
    method: 'post',
    data: parameter
  })
}

export function invokeWorkflowPOWB(parameter) {
  return axios({
    url: api.executePOWB,
    method: 'post',
    data: parameter
  })
}
