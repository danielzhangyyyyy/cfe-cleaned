// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './core/lazy_use' // 按需加载
import { VueAxios } from './utils/request' // 按需加载
// mock
// import './mock'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import VueI18n from 'vue-i18n'
import './commoncss/fontStyle.less'
import { mTable } from "mz-series"
import './core/echartsUse'

import { DEFAULT_LANGUAGE } from '@/store/mutation-types'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(VueI18n)
Vue.use(mTable)

const langs = Vue.ls.get(DEFAULT_LANGUAGE)
const i18n = new VueI18n({
  locale: langs, // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-CN': require('./locales/zh-CN'), // 中文语言包
    'en-US': require('./locales/en-US') // 英文语言包
  }
})

new Vue({
  router,
  store,
  i18n,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
