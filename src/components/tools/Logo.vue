<template>
  <div class="logo" :class="{deleteLogoPaddingLeft: !showTitle}">
    <router-link :to="{name:'purchaseOrderManage'}">
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <img src="~@/assets/lenovologo.png"/> -->
      <img src="~@/assets/LenovoLogoLatest.png" alt="logo" />
      <h1 v-if="showTitle&&isPrd">{{ title }}</h1>
      <h1 v-if="showTitle&&!isPrd" style="font-size:22px; font-weight: 100;">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
    import LogoSvg from "@/assets/logo.svg?inline";

    export default {
      data(){
        return{
          isPrd: process.env.NODE_ENV != 'development'
        }
      },
  name: "Logo",
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: process.env.NODE_ENV != 'development' ?'CFE':'CFE Test',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
};
</script>
<style>
.deleteLogoPaddingLeft {
  padding-left: 0px !important;
}
.cfeFontSize {
  font-size: 27px !important;
}
</style>


