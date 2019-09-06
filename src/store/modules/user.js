import Vue from 'vue'
import {
  loginUsf,
  login,
  getInfo,
  logout
} from '@/api/loginApi'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import { isNullOrUndefined } from 'util';
import {
  getUnreadMount
} from "@api/sysUIMessage_api";

const user = {
  state: {
    productGroup: '',
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    findUnread: 0
  },

  mutations: {
    SET_UNREAD: (state, payload) => {
      state.findUnread = payload.findUnread
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PRODUCTGROUP: (state, productGroup) => {
      state.productGroup = productGroup
    }
  },

  actions: {
    getUnread({ commit }) {
      return new Promise((resolve, reject) => {
        getUnreadMount({}).then(res => {
          console.log(res, 'resUnread success');
          commit('SET_UNREAD', { findUnread: res.result })
          resolve(res)
        }).catch(err => {
          console.log(err, 'get Unread failed');
          reject(err)
        })
      })
    },
    // 登录--并保存token
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code == 0) {
            const result = response.result
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)// 保存token
            commit('SET_TOKEN', result.token)
            Vue.ls.set('PRODUCTGROUP', result.productGroup)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    setProdcutGroup({ commit }, productGroup) {
      commit('SET_PRODUCTGROUP', productGroup);
    },
    GetUserInfo({ commit }, data) {
      return new Promise(resolve => {
        let { loginName, itCode } = data
        if (isNullOrUndefined(loginName)) {
          loginName = Vue.ls.get('LOGINNAME');
        }
        commit('SET_NAME', {
          name: loginName, // 昵称=IDcode
          welcome: welcome() // 欢迎语
        })
        commit('SET_ITCODE', itCode)// IDcode
        resolve()
      })
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove('Access-Token')
        Vue.ls.remove('PRODUCTGROUP')
        Vue.ls.remove('LOGINNAME')
        Vue.ls.remove('USER_ITCODE')
        Vue.ls.remove('GET_MENU')
        localStorage.removeItem('flexibleReportId')
        window.location.reload()
        commit('Toggle_IsLogin', false)
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }
  }
}


export default user
