import { axios } from '@/utils/request'

const api = {
  list: 'common/downloadReports', 
  getFileUrl: 'common/getFileUrl'
}

export default api

export function getFileUrl(parameter) {
  return axios({
    url: api.getFileUrl,
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

