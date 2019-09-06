import { axios } from '@/utils/request'

const api = {
  commonList: 'common/getCommonList',
  executeAPI: 'workflow/executeReportWorkflow'
}

export default api

export function getDropDownList(parameter) {
  return axios({
    url: api.commonList,
    method: 'post',
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
