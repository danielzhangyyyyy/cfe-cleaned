import { axios } from '@/utils/request'

const api = {
  getRefreshObject: 'onDemandRefresh/getRefreshType',
  list: 'onDemandRefresh/list',
  executeFamily: 'onDemandRefresh/executeFamily',
  executeModel: 'onDemandRefresh/executeModel'
}

export default api

export function executeModel(parameter) {
  return axios({
    url: api.executeModel,
    method: 'post',
    data: parameter
  })
}

export function executeFamily(parameter) {
  return axios({
    url: api.executeFamily,
    method: 'post',
    data: parameter
  })
}

export function getRefreshObject(parameter) {
  return axios({
    url: api.getRefreshObject,
    method: 'get',
    params: parameter
  })
}

export function list(parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

