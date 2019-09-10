import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, USER_ITCODE } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) {
    next()
    if (Vue.ls.get(USER_ITCODE)) {
      const itCode = Vue.ls.get(USER_ITCODE)
      store.dispatch('GetUserInfo', { itCode })
    }
  } else {
    if (to.path === '/user/login') {
      next()
      NProgress.done()
    } else {
      next('/user/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
