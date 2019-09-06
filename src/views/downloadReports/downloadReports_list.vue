<template>
  <a-card :bordered="false" class="content">
    <a-table
      ref="table"
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :scroll="scrollSize"
      :pagination="pagination"
      :rowKey="(record) => record.rid"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <span>
          <a-icon
            class="operationIcon"
            type="download"
            v-if="record.exportId!=''"
            @click="exportIdOnClick(record, record.exportId)"
          />
        </span>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { tableBtns } from "@/components";
import { list, getFileUrl } from "@api/downloadReports_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/downloadReports_lang.js";
import langEn from "../../locales/en-US/downloadReports_lang.js";

export default {
  name: "TableList",
  components: {
    tableBtns
  },
  data() {
    return {
      loading: false,
      pagination: { showSizeChanger: true, hideOnSinglePage: true },
      queryParam: {}, // 查询参数
      columns: [],
      scrollSize: {},
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    this.scrollSize.x = getXScrollSize(this.columns, 0);
    this.loadData({});
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/downloadReports/downloadReports_list") {
          this.loadData({});
        }
      },
      deep: true
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loadData({
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    loadData(params) {
      this.loading = true;
      this.dataSource = [];
      let parameter = {
        pageNum: params.pageNum || this.pagination.current || 1,
        pageSize: params.pageSize || this.pagination.pageSize || 10
      };
      if (params.sortField) {
        parameter.sortField = params.sortField;
      }
      if (params.sortOrder) {
        parameter.sortOrder = params.sortOrder;
      }
      let self = this;
      list(Object.assign(parameter, self.queryParam)).then(res => {
        const pagination = { ...self.pagination };
        pagination.total = res.result.total;
        pagination.pageSize = res.result.pageSize;
        pagination.current = res.result.pageNum;
        self.pagination = pagination;
        self.dataSource = res.result.list;
        self.loading = false;
      });
    },
    exportIdOnClick(record, text) {
      getFileUrl({ exportId: text }).then(res => {
        if (res != "" && res) {
          window.open(res);
        } else {
          this.$notification.open({
            message: "Download Failed",
            description: "File expired, please export again.",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
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
<style>
.operationIcon {
  color: #1890ff;
}
.operationIcon:hover {
  transform: scale(1.4);
  cursor: pointer;
}
</style>

