import { axios } from '@/utils/request'

const api = {
  list: 'userCommodity/list',
  show: 'userCommodity/show',
  add: 'userCommodity/add',
  update: 'userCommodity/update',
  delete: 'userCommodity/delete',
  groupList: 'userCommodity/getGroupList',
  userList: 'userCommodity/getUserList',
  save: 'userCommodity/save'
}

export default api

export function save (paramter) {
  return axios({
    url: api.save,
    method: 'put',
    data: paramter
  })
}

export function userList (parameter) {
  return axios({
    url: api.userList,
    method: 'get',
    params: parameter
  })
}


export function groupList (parameter) {
  return axios({
    url: api.groupList,
    method: 'get',
    params: parameter
  })
}

export function list (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function show (parameter) {
  return axios({
    url: api.show,
    method: 'get',
    params: parameter
  })
}

export function add (parameter) {
  return axios({
    url: api.add,
    method: 'post',
    params: parameter
  })
}

export function update (parameter) {
  return axios({
    url: api.update,
    method: 'put',
    params: parameter
  })
}

export function del (parameter) {
  return axios({
    url: api.delete,
    method: 'delete',
    data: parameter
  })
}
