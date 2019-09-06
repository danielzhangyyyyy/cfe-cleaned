import { axios } from '@/utils/request'

const api = {
  getCategory: 'flexibleQuery/getCategoryList',
  getReport: 'flexibleQuery/getReportList',
  getFilter: 'flexibleQuery/getReportFilter',
  getData: 'flexibleQuery/search',
  commonList: 'common/getFlexibleQueryList',
  execute: 'flexibleQuery/execute'
}

export default api

export function executeApi(parameter) {
  return axios({
    url: api.execute,
    method: 'post',
    data: parameter
  })
}

export function getCommonList(parameter) {
  return axios({
    url: api.commonList,
    method: 'post',
    data: parameter
  })
}


export function getCategoryList(parameter) {
  return axios({
    url: api.getCategory,
    method: 'get',
    params: parameter
  })
}

export function getReportList(parameter) {
  return axios({
    url: api.getReport,
    method: 'get',
    params: parameter
  })
}

export function getReportFilter(parameter) {
  return axios({
    url: api.getFilter,
    method: 'post',
    data: parameter
  })
}

export function getReportData(parameter) {
  return axios({
    url: api.getData,
    method: 'post',
    data: parameter
  })
}
