<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo :showTitle="!collapsed" />
    <s-menu
      :class="{lightMenu: theme=='light'}"
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from "@/components/tools/Logo";
import SMenu from "./index";
import { mixin, mixinDevice } from "@/utils/mixin";

export default {
  name: "SideMenu",
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    }
  }
};
</script>

<style lang="less">
.ant-menu .ant-menu-inline.ant-menu-sub {
  // box-shadow: inset 0 -10px 10px -10px #9DA5AE, inset 0 9px 9px -9px #9DA5AE;
  box-shadow: inset 0 -10px 10px -10px #787878, inset 0 9px 9px -9px #787878;
  // box-shadow: inset 0 -10px 10px -10px #DEE5EC, inset 0 9px 9px -9px #DEE5EC;
}
.lightMenu {
  background: #dee5ec !important;
}
/* 
.sider /deep/ .ant-menu-dark .ant-menu-inline.ant-menu-sub{
   background: #787878;
  //  DEE5EC
}

.header-animat /deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
  background: #999;
}

.header-animat /deep/ .ant-layout-header{
  background: #999;
}

.sider /deep/ .ant-layout-sider{
  background: #ff6700
} */

.ant-layout-sider-children::-webkit-scrollbar {
  width: 4px;
}

.ant-layout-sider-children::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -box-shadow: inset 0 0 5px white;
  background: white;
}

.ant-layout-sider-children::-webkit-scrollbar-track {
  -box-shadow: inset 0 0 5px transparent;
  border-radius: 0;
  background: transparent;
}
</style>
