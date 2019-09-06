import { axios } from '@/utils/request'

const api = {
  commonDownload: 'common/exportExcel'
}

export default api

export function download(parameter) {
  return axios({
    url: api.commonDownload,
    method: 'post',
    data: parameter,
    responseType: "blob",
    header: {
      'Accept': 'application/vnd.ms-excel' 
    }
  })
}
