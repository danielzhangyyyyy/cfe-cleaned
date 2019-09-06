<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      @mousemove="mouseMove"
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :class="{hiddenGlobalHeader: hiddenGlobalHeader&&!fixedHeader}"
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content
        class="transition"
        :style="{ height: '100%', margin: multiTab ? '24px 24px 0' : '24px 24px 0', paddingTop: fixedHeader&&!hiddenGlobalHeader ? '64px' : '0' }"
      >
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
      <announcement></announcement>
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from "@/utils/util";
import { mapState, mapActions } from "vuex";
import { mixin, mixinDevice } from "@/utils/mixin";
import config from "@/config/defaultSettings";

import RouteView from "./RouteView";
import MultiTab from "@/components/MultiTab";
import SideMenu from "@/components/Menu/SideMenu";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import SettingDrawer from "@/components/SettingDrawer";
import {
  asyncRouterMap,
  constructRouter,
  constantRouterMap
} from "@/config/router.config.js";
import announcement from "@/components/announcement/announcement";
/* import { clearTimeout } from "timers"; */

export default {
  name: "BasicLayout",
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer,
    announcement
  },
  data() {
    return {
      hiddenGlobalHeader: true,
      production: config.production,
      collapsed: false,
      menus: [],
      timer: null
    };
  },
  computed: {
    ...mapActions(["Logout"]),
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters,
      menuAlias(state) {
        return state.getMenu.menu;
      }
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return "0";
      }
      if (this.sidebarOpened) {
        return "256px";
      }
      return "80px";
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    },
    menuAlias(val) {
      // 监视路由变化，例如添加favorite时
      const newAsyncRouterMap = constructRouter(this.menuAlias);
      this.$router.addRoutes(constantRouterMap.concat(newAsyncRouterMap), {
        replace: true
      });
      // this.$router.options.routes = constantRouterMap.concat(newAsyncRouterMap);
      console.log(this.$router);
      this.menus = newAsyncRouterMap.find(item => item.path === "/").children;
      this.collapsed = !this.sidebarOpened;
    }
  },
  created() {
    this.menus = asyncRouterMap.find(item => item.path === "/").children;
    // this.menus = this.mainMenu.find((item) => item.path === '/').children
    this.collapsed = !this.sidebarOpened;
  },
  mounted() {
    window.addEventListener('click', ()=>{
      this.timeOutHandler()
    })
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edge") > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    ...mapActions(["setSidebar"]),
    timeOutHandler() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let self = this;
      this.timer = setTimeout(() => {
        this.$warning({
          title: "Login Expired",
          content: "Please login again !!!",
          onOk() {
            self
              .Logout()
              .then(() => {
                window.location.reload();
              })
              .catch(err => {
                self.$message.error({
                  title: "Error",
                  description: err.message
                });
              });
          }
        });
      }, 1000 * 60 * 30);
    },
    mouseMove(e) {
      if (this.fixedHeader) {
        this.hiddenGlobalHeader = false;
        return;
      }
      if (e.clientY <= 5) {
        this.hiddenGlobalHeader = false;
      } else if (!this.hiddenGlobalHeader && e.clientY <= 64 && e.clientY > 5) {
        this.hiddenGlobalHeader = false;
      } else if (e.clientY > 64) {
        this.hiddenGlobalHeader = true;
      } else {
        this.hiddenGlobalHeader = true;
      }
    },
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
      triggerWindowResizeEvent();
    },
    paddingCalc() {
      let left = "";
      if (this.sidebarOpened) {
        left = this.isDesktop() ? "256px" : "80px";
      } else {
        left = (this.isMobile() && "0") || ((this.fixSidebar && "80px") || "0");
      }
      return left;
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false;
      }
    },
    drawerClose() {
      this.collapsed = false;
    }
  }
};
</script>

<style lang="less">
@import url("../components/global.less");

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.transition {
  transition: all 0.3s linear;
}
.hiddenGlobalHeader {
  display: none;
}
</style>
