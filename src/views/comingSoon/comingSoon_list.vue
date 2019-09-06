<template>
  <a-card :bordered="false" class="content comingSoonCard">
    <!-- <div id="skinny" v-if="!drawerOpened" ></div> -->
    <div class="comingSoon">
      <a-icon type="fire" />Coming Soon ...
    </div>
  </a-card>
</template>
<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    drawerOpened() {
      return this.$store.getters.drawerOpened;
    }
  }
};
</script>
<style scoped>
.comingSoon {
  font-size: 100px;
  padding-top: 20%;
}
.comingSoonCard {
  position: relative;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

#skinny {
  width: 80px;
  height: 92%;
  opacity: 0.5;
  background-color: #ffffff;
  position: absolute;
  z-index: 999999;
  box-shadow: 20px 20px 20px transparent;
  animation: animation 3s infinite;
}

@keyframes animation {
  0% {
    left: 10%;
  }
  100% {
    left: 85%;
  }
}
</style>
