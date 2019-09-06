import { axios } from '@/utils/request'

const api = {
  list: 'netCostBom/costBomExecute',
  show: 'netCostBom/show'
}

export default api

export function list (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}

export function show (parameter) {
  return axios({
    url: api.show,
    method: 'get',
    params: parameter
  })
}
