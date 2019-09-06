<template>
  <a-card :bordered="false" class="content">
    <div>
      <a-row type="flex" justify="end" :gutter="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }">
        <a-col>
          <a-button type="primary" icon="redo" @click="loadData({})">Refresh</a-button>
        </a-col>
        <a-col>
          <a-button type="primary" icon="upload" @click="UploadOnClick">Upload</a-button>
        </a-col>
        <a-col>
          <a-button type="primary" icon="download" @click="exportExcelOnClick">Export</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      ref="table"
      :bordered="true"
      size="small"
      :scroll="{ x: 1900 }"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
      :style="{'padding-top': '10px'}"
    ></a-table>
  </a-card>
</template>

<script>
import { STable } from "@/components";
import { list } from "@api/tapePublishSchedule_api";
import langZh from "../../locales/zh-CN/tapePublishSchedule_lang.js";
import langEn from "../../locales/en-US/tapePublishSchedule_lang.js";
import { exportByURL } from "@api/exportFunction_api";

export default {
  name: "TableList",
  components: {
    STable
  },
  data() {
    return {
      uploadId: "UPLOAD_TAPE_PUBLISH_SCHEDULE",
      dataSource: [],
      loading: false, // 页面是否加载中
      queryParam: {}, // 查询参数
      columns: [], // 表头
      scroll: { x: true }
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    this.loadData({});
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log(to);
        if (to.path == "/tapePublishSchedule/tapePublishSchedule_list") {
          this.loadData({});
        }
      },
      deep: true
    },
    language(val) {
      this.changeLanguage();
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.loadData({
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    loadData(params) {
      this.loading = true;
      this.searchLoading = true;
      this.dataSource = [];
      let parameter = {};
      if (params.sortField) {
        parameter.sortField = params.sortField;
      }
      if (params.sortOrder) {
        parameter.sortOrder = params.sortOrder;
      }
      let self = this;
      list(Object.assign(parameter, self.queryParam)).then(res => {
        res.result.list.forEach((item, index) => {
          item.key = index;
        });
        self.dataSource = res.result.list;
        self.dataSource.length > 10
          ? (self.scroll.y = 450)
          : (self.scroll.y = false);
        self.loading = false;
        self.searchLoading = false;
      });
    },
    UploadOnClick() {
      this.$router.push(
        `/upload/upload_list/${this.uploadId}/origin/${this.$route.name}`
      );
    },
    exportExcelOnClick() {
      exportByURL(
        { ...this.queryParam, eventName: "UPLOAD_TAPE_PUBLISH_SCHEDULE" },
        "common/exportExcel"
      );
    },
    // 更改列表数组
    changeLanguage() {
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
      }
    }
  }
};
</script>
