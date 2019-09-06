import Vue from 'vue'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
  DEFAULT_ISLOGIN,
  USER_ITCODE
} from '@/store/mutation-types'

const app = {
  state: {
    sidebar: true,
    language: 'en-US',
    device: 'desktop',
    theme: '',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: true,
    autoHideHeader: false,
    color: null,
    itCode: '',
    weak: false,
    multiTab: false,
    closeTab: '',
    drawerOpened: false,
  },
  mutations: {
    SET_DRAWER_STATUS: (state, data) => {
      state.drawerOpened = data;
      Vue.ls.set('drawerOpened', data);
    },
    SET_CLOSE_TAB: (state, url) => {
      state.closeTab = url;
      Vue.ls.set('CLOSE_TAB', url);
    },
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      Vue.ls.set(SIDEBAR_TYPE, type)
    },
    CLOSE_SIDEBAR: (state) => {
      Vue.ls.set(SIDEBAR_TYPE, true)
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      // setStore('_DEFAULT_THEME', theme)
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme = theme
    },
    Toggle_IsLogin: (state, isLogin) => {
      Vue.ls.set(DEFAULT_ISLOGIN, isLogin)
      state.isLogin = isLogin
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      Vue.ls.set(DEFAULT_LAYOUT_MODE, layout)
      state.layout = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER, fixed)
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed)
      state.fixSiderbar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show)
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type)
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color)
      state.color = color
    },
    SET_ITCODE: (state, itCode) => {
      Vue.ls.set(USER_ITCODE, itCode)
      state.itCode = itCode
    },
    TOGGLE_Language: (state, language) => {
      Vue.ls.set(DEFAULT_LANGUAGE, language)
      state.language = language
    },
    TOGGLE_WEAK: (state, flag) => {
      Vue.ls.set(DEFAULT_COLOR_WEAK, flag)
      state.weak = flag
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      Vue.ls.set(DEFAULT_MULTI_TAB, bool)
      state.multiTab = bool
    }
  },
  actions: {
    ToggleDrawerStatusChange({ commit }, data) {
      commit('SET_DRAWER_STATUS', data)
    },
    ToggleCloseTab({ commit }, url) {
      commit('SET_CLOSE_TAB', url)
    },
    setSidebar({
      commit
    }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar({
      commit
    }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme({
      commit
    }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleIsLogin({
      commit
    }, isLogin) {
      commit('Toggle_IsLogin', isLogin)
    },
    ToggleLayoutMode({
      commit
    }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader({
      commit
    }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSiderbar({
      commit
    }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
    ToggleFixedHeaderHidden({
      commit
    }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth({
      commit
    }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor({
      commit
    }, color) {
      commit('TOGGLE_COLOR', color)
    },
    SETITCODE({
      commit
    }, itCode) {
      commit('SET_ITCODE', itCode)
    },
    ToggleLanguage({
      commit
    }, language) {
      commit('TOGGLE_Language', language)
    },

    ToggleWeak({
      commit
    }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleMultiTab({
      commit
    }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    }
  }
}

export default app
