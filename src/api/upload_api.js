import { axios } from '@/utils/request'

const api = {
  list: 'uploadLog/list',
  statusList: 'uploadLog/getUploadStatus',
  commonUpload: 'common/uploadExcel',
  detail: 'common/getUploadDetail'
}

export default api


export function detail(parameter) {
  return axios({
    url: api.detail,
    method: 'post',
    data: parameter
  })
}

export function upload(parameter, file) {
  return axios({
    url: api.commonUpload,
    method: 'post',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    params: parameter,
    data: file,
    timeout: 1000*60*30
  })
}

export function getDropDownList(parameter) {
  return axios({
    url: api.statusList,
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




