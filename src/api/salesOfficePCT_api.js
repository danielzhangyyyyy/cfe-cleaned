import { axios } from '@/utils/request'

const api = {
  list: 'salesOfficePCT/list',
  update: 'salesOfficePCT/update',
  commonList: 'common/getCommonList',
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

export function update (parameter) {
  return axios({
    url: api.update,
    method: 'put',
    data: parameter
  })
}
