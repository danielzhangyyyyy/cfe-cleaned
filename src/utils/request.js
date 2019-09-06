import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/pcg/api', // api base_url
  timeout: 1800000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get('Access-Token')
    if (error.response.status === 403) {
      notification.open({
        message: 'Forbidden',
        description: data.message,
        duration: 6,
        style: { 'background': '#F5222D' } //red
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.open({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
        duration: 6,
        style: { 'background': '#F5222D' } //red
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['pcgcfe-java-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
