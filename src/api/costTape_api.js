import { axios } from '@/utils/request'

const api = {
  list: 'costTape/list',
  show: 'costTape/show',
  add: 'costTape/add',
  update: 'costTape/update',
  delete: 'costTape/delete',
  commonList: 'common/getCommonList',
  getPlantList: 'costTape/getPlantList',
  getCostElemList: 'costTape/getCostElemList',
  getPGList: 'costTape/getPGList',
  getStatusList: 'costTape/getStatusList',
  getCommodityList: 'costTape/getCommodityList',
  getSpecList: 'costTape/getSpecList',
  getSourceList: 'costTape/getSourceList',
  executeImport:'workflow/fullImport'
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
export function getPlantList (parameter) {
  return axios({
    url: api.getPlantList,
    method: 'get',
    params: parameter
  })
}

export function getCostElemList (parameter) {
  return axios({
    url: api.getCostElemList,
    method: 'get',
    params: parameter
  })
}

export function getPGList (parameter) {
  return axios({
    url: api.getPGList,
    method: 'get',
    params: parameter
  })
}

export function getStatusList (parameter) {
  return axios({
    url: api.getStatusList,
    method: 'get',
    params: parameter
  })
}

export function getCommodityList (parameter) {
  return axios({
    url: api.getCommodityList,
    method: 'get',
    params: parameter
  })
}

export function getSpecList (parameter) {
  return axios({
    url: api.getSpecList,
    method: 'get',
    params: parameter
  })
}

export function getSourceList (parameter) {
  return axios({
    url: api.getSourceList,
    method: 'get',
    params: parameter
  })
}

export function executeImport(parameter) {
  return axios({
    url: api.executeImport,
    method: 'post',
    data: parameter
  })
}
