<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import { AppDeviceEnquire } from '@/utils/mixin'
import { log } from 'util'
import { DEFAULT_LANGUAGE } from '@/store/mutation-types'
import router from './router'
import Router from 'vue-router'
import store from './store'
import constantRouterMap from '@/config/router.config'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: enUS
    }
  },
  mounted () {},
  computed: {
    language () {
      //return this.$store.getters.language
      return 'en-US'
    }
  },
  created () {
    if (this.language == 'zh-CN') {
      this.locale = zhCN
    } else if (this.language == 'en-US') {
      this.locale = enUS
    }
  },
  watch: {
    language (val) {
      if (val == 'zh-CN') {
        this.locale = zhCN
        Vue.ls.set(DEFAULT_LANGUAGE, 'zh-CN')
      } else if (val == 'en-US') {
        this.locale = enUS
        Vue.ls.set(DEFAULT_LANGUAGE, 'en-US')
      }
      // let roles = Vue.ls.get(DEFAULT_Roles)
      // console.log(roles)
      // this.$store.dispatch('GenerateRoutes', { roles }).then(() => {
      //   console.log(store.getters.addRouters)
      //   console.log(router)
      // })
    }
  }
}
</script>
<style>
#app {
  height: 100%;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}

::-webkit-scrollbar-track {
  -box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  /* background: rgba(0,0,0,0.2); */
  background: transparent;
}

</style>
