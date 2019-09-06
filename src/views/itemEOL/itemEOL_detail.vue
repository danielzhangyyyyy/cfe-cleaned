<template>
  <a-card :bordered="false">
    <detail-list :title="$t('lang.detailCommonTitle')">
      <detail-list-item
        v-for="(item,index) in detailList"
        :key="index"
        :term="item.label"
      >{{ item.text }}</detail-list-item>
    </detail-list>
  </a-card>
</template>

<script>
    import Vue from "vue";
    import DetailList from "@/components/tools/DetailList";
    import langZh from "../../locales/zh-CN/itemEOL_lang.js";
    import langEn from "../../locales/en-US/itemEOL_lang.js";
    import {show} from "@api/itemEOL_api";

    const DetailListItem = DetailList.Item;

export default {
  components: {
    DetailList,
    DetailListItem
  },
  data() {
    return {
      id: "",
      babelList: [], // 从lang包获取的要展示的字段
      detailList: [] // 列表详情数据
    };
  },
  created() {
    this.changeLanguage();
    this.id = Vue.ls.get("itemEOL_dblclickRowKey");
    console.log(this.id);
    this.getDetailfun(this.id);
  },
  computed: {
    language() {
      return this.$store.getters.language;
    },
    title() {
      return this.$route.meta.title;
    }
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.name);
        const that = this;
        // eslint-disable-next-line eqeqeq
        if (route.name === "itemEOL_detail") {
          this.id = Vue.ls.get("itemEOL_dblclickRowKey");
          that.getDetailfun(this.id);
        }
      },
      deep: true
    }
  },
    methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    // 更改列表国际化
    changeLanguage() {
      console.log(this.language);
      // eslint-disable-next-line
      if (this.language == "zh-CN") {
        this.babelList = langZh.editAndDetail_langZh;
        // eslint-disable-next-line
      } else if (this.language == "en-US") {
        this.babelList = langEn.editAndDetail_langEn;
      }
    },

    getDetailfun(id) {
      const values = {
        item: id
      };
      console.log(values);
      show(values)
        .then(res => {
          if (res.code != 0) {
            this.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
              });
            this.$store.dispatch('ToggleCloseTab', '');
            setTimeout(() => {
              this.$store.dispatch('ToggleCloseTab', this.$route.path);
              this.$router.replace(`/itemEOL/itemEOL_list`);
            }, 500);
            return;
          }
          console.log(res);
          const babelList = this.babelList;
          this.detailList = [];
          for (let i = 0; i < babelList.length; i++) {
            const textField = `${babelList[i].decorator}`;
            this.detailList.push({
              label: babelList[i].label,
              text: res.result[textField]
            });
          }
          // this.$message.success(res.msg)
          // this.$emit('ok', values)
        })
        .catch(er => {
          this.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
              });
          console.log(er);
        });
    }
  }
};
</script>
