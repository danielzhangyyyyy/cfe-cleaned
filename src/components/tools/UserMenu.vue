<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a>
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank"> -->
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action"/>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar" size="small" :src="avatar()"/> -->
          <span>Login: {{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!--<a-menu-item key="0">-->
            <!--<router-link :to="{ name: 'center' }">-->
              <!--<a-icon type="user"/>-->
              <!--<span>{{ $t('lang.menuaccountcenter') }}</span>-->
            <!--</router-link>-->
          <!--</a-menu-item>-->
          <!--<a-menu-item key="1">-->
            <!--<router-link :to="{ name: 'settings' }">-->
              <!--<a-icon type="setting"/>-->
              <!--<span>{{ $t('lang.menuaccountsettings') }}</span>-->
            <!--</router-link>-->
          <!--</a-menu-item>-->
          <!-- <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>{{$t('lang.menuAccountTest')}}</span>
          </a-menu-item>-->
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>{{ $t('lang.menuaccountlogout') }}</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <!-- <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon type="global"/>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper" @click="changeLangEvent">
          <a-menu-item key="0">
            <span role="img" aria-label="简体中文">🇨🇳</span>
            <span>简体中文</span>
          </a-menu-item>
          <a-menu-item key="1">
            <span role="img" aria-label="English">🇬🇧</span>
            <span>English</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown> -->
    </div>
  </div>
</template>

<script>
    import NoticeIcon from '@/components/NoticeIcon'
    import {mapActions, mapGetters} from 'vuex'

    export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this

      this.$confirm({
        title: 'Tip',
        content: 'Are you sure to logout ?',
        onOk () {
          return that
            .Logout()
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
                that.$message.error({
                title: 'Error',
                description: err.message
              })
            })
        },
        onCancel () {}
      })
    }
    // changeLangEvent (e) {
    //   if (e.key === '0') {
    //     this.$i18n.locale = 'zh-CN' // 关键语句
    //     this.$store.dispatch('ToggleLanguage', 'zh-CN')
    //   } else if (e.key === '1') {
    //     this.$i18n.locale = 'en-US' // 关键语句
    //     this.$store.dispatch('ToggleLanguage', 'en-US')
    //   }
    // }
  }
}
</script>
