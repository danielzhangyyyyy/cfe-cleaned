import {
  axios
} from '@/utils/request'

const api = {
  loginUsf: '/sys/login/login', // 登录
  getMenu: '/sys/login/getMenu', // 查询当前用户的菜单
  getTenantList: '/sys/login/getTenantList', // 查询当前用户的租户列表,
  getUserInfo: '/sys/login/getUserInfo', // 根据token查询当前用户信息
  logout: '/sys/login/logout', // 登出
  tenant: 'login/tenant', // 切换租户
  // ------------------
  login: '/login/login',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms'

}

export default api

export function loginUsf (parameter) { // 登录
  return axios({
    url: api.loginUsf,
    method: 'post',
    params: parameter
  })
}

export function getMenu (parameter) { // 查询当前用户的菜单
  return axios({
    url: api.getMenu,
    method: 'get',
    headers: parameter
  })
}

export function getTenantList (parameter) { // 查询当前用户的租户列表
  return axios({
    url: api.getTenantList,
    method: 'get',
    headers: parameter
  })
}
export function getUserInfo (parameter) { // 根据token查询当前用户信息
  return axios({
    url: api.getUserInfo,
    method: 'get'
    // headers: parameter,
  })
}
export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function logout (parameter) { // 登出
  return axios({
    url: api.logout,
    method: 'get',
    headers: parameter
  })
}
export function tenant (parameter) { // 切换租户
  return axios({
    url: api.tenant,
    method: 'get',
    headers: parameter
  })
}

// --------------------------
export function login (parameter) {
  return axios({
    url: api.login,
    method: 'post',
    params: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
