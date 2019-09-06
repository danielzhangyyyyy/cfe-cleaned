import { axios } from '@/utils/request'

const api = {
  list: 'costTapeSelectedImport/list',
  show: 'costTapeSelectedImport/show',
  add: 'costTapeSelectedImport/add',
  update: 'costTapeSelectedImport/update',
  delete: 'costTapeSelectedImport/delete',
  commonList: 'common/getCommonList',
  save: 'costTapeSelectedImport/save',
  getCommodity: 'costTapeSelectedImport/getCommodity',
  executeSelectedImport: 'workflow/selectedImport'
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

export function save (parameter) {
  return axios({
    url: api.save,
    method: 'post',
    data: parameter
  })
}

export function getCommodity (parameter) {
  return axios({
    url: api.getCommodity,
    method: 'get',
    params: parameter
  })
}

export function invokeWorkflowSelectedIm(parameter) {
  return axios({
    url: api.executeSelectedImport,
    method: 'post',
    data: parameter
  })
}
