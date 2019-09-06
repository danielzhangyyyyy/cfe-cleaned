import { axios } from '@/utils/request'

const api = {
  commonList: 'common/getCommonList',
  getProdFamily: 'dailyStandardCost/getProdFamilyByBrand',
  updateMonthlyEnd: 'stdcostInModelList/updateMonthlyEnd',
  execMonthlyStdCost: 'workflow/execMonthlyStdCost',
  publishMonthlyStdCost: 'workflow/publishMonthlyStdCost'
}

export default api

export function updateMonthlyEnd(parameter) {
  return axios({
    url: api.updateMonthlyEnd,
    method: 'put',
    data: parameter
  })
}

export function getDropDownList(parameter) {
  return axios({
    url: api.commonList,
    method: 'post',
    data: parameter
  })
}

export function getProdFamily(parameter) {
  return axios({
      url: api.getProdFamily,
      method: 'get',
      params: parameter
  })
}

export function execMonthlyStdCost(parameter) {
  return axios({
    url: api.execMonthlyStdCost,
    method: 'post',
    data: parameter
  })
}

export function publishMonthlyStdCost(parameter) {
  return axios({
    url: api.publishMonthlyStdCost,
    method: 'post',
    data: parameter
  })
}
