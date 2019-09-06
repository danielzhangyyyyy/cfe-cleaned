import { axios } from '@/utils/request'
import store from '@/store'

const api = {
  list: 'sysUIMessage/list',
  delete: 'sysUIMessage/delete',
  delAllRead: 'sysUIMessage/deleteAllRead',
  changeAllToRead: 'sysUIMessage/markAllAsRead',
  changeOneToRead: 'sysUIMessage/markRead',
  getUnreadMount: 'sysUIMessage/findUnread',
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

export function del(parameter) {
  return axios({
    url: api.delete,
    method: 'delete',
    data: parameter
  })
}

export function delAllRead(parameter) {
  return axios({
    url: api.delAllRead,
    method: 'delete',
    data: parameter
  })
}

export function changeAllToRead(parameter) {
  store.dispatch('ToggleCloseTab', '');
  store.dispatch('ToggleCloseTab', '/plantMaintenance/plantMaintenance_list');
  return axios({
    url: api.changeAllToRead,
    method: 'get',
    params: parameter
  })
}

export function changeOneToRead(parameter) {
  return axios({
    url: api.changeOneToRead,
    method: 'get',
    params: parameter
  })
}

export function getUnreadMount(parameter) {
  return axios({
    url: api.getUnreadMount,
    method: 'get',
    params: parameter
  })
}
