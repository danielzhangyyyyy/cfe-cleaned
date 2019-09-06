import { axios } from '@/utils/request'

const api = {
  list: 'tapePublishSchedule/list',
}

export default api

export function list (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}
