import { axios } from '@/utils/request'

const api = {
  list: 'whereUsed/list',
  commonList: 'common/getCommonList',
  executeAPI: 'common/commonExecute',
  modelListAPI: 'whereUsedModel/list',
}

export default api

export function list (parameter) {
  return axios({
    url: api.list,
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

export function execute (parameter) {
  return axios({
    url: api.executeAPI,
    method: 'post',
    data: parameter
  })
}

export function modelList (parameter) {
  return axios({
    url: api.modelListAPI,
    method: 'get',
    params: parameter
  })
}

