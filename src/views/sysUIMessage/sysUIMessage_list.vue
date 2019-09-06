<template>
  <a-card :bordered="false" class="content">
    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
    >
      <a-button
        type="primary"
        icon="delete"
        :loading="deleteLoading"
        @click="deleteAllReadOnClick"
      >Delete all read</a-button>
      <a-button
        type="primary"
        icon="read"
        :loading="changeAllLoading"
        @click="changeAllToReadOnClick"
      >Mark all as read</a-button>
      <a-button type="primary" icon="reload" :loading="loading" @click="loadData({})">Refresh</a-button>
    </tableBtns>
    <a-table
      ref="table"
      size="small"
      :columns="columns"
      :scroll="scrollSize"
      :dataSource="dataSource"
      :pagination="pagination"
      :rowKey="(record) => record.rid"
      @change="handleTableChange"
      :style="{'padding-top': '1px'}"
    >
      <span slot="every" slot-scope="text, record" :style="{ cursor: 'pointer'}">
        <span
          v-if="record.readMark==0"
          @click="everyOnClick(record)"
          :style="{'font-weight': 'bold'}"
        >{{ text }}</span>
        <span v-else>{{ text }}</span>
      </span>
      <span slot="readMark" slot-scope="text, record" :style="{ cursor: 'pointer'}">
        <span
          v-if="record.readMark==0"
          @click="everyOnClick(record)"
          :style="{'font-weight': 'bold'}"
        >Unread</span>
        <span v-else>Read</span>
      </span>
      <span slot="exportId" slot-scope="text, record">
        <a
          v-if="record.exportId!=''&&record.exportId"
          @click="exportIdOnClick(record, text)"
          :style="{'font-weight': 'bold'}"
        >{{ text }}</a>
        <span v-else>{{ text }}</span>
      </span>
      <template slot="operation" slot-scope="text, record">
        <span>
          <a-icon class="operationIcon" type="delete" @click="sureToDelete(record)" />
          <span v-if="record.exportId!=''&&record.exportId">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a-icon
            class="operationIcon"
            type="download"
            v-if="record.exportId!=''&&record.exportId"
            @click="exportIdOnClick(record, record.exportId)"
          />
        </span>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { tableBtns } from "@/components";
import {
  changeAllToRead,
  changeOneToRead,
  del,
  delAllRead,
  getDropDownList,
  getFileUrl,
  list
} from "@api/sysUIMessage_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/sysUIMessage_lang.js";
import langEn from "../../locales/en-US/sysUIMessage_lang.js";

export default {
  name: "TableList",
  components: {
    tableBtns
  },
  data() {
    return {
      loading: false,
      currentPageManipulationAuth: [],
      pagination: { showSizeChanger: true, hideOnSinglePage: true },
      queryParam: {}, // 查询参数
      columns: [],
      deleteLoading: false,
      changeAllLoading: false,
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
        if (route.path === "/sysUIMessage/sysUIMessage_list") {
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
    changeAllToReadOnClick() {
      this.changeAllLoading = true;
      changeAllToRead({})
        .then(res => {
          this.changeAllLoading = false;
          this.loadData({});
          this.$store.dispatch("getUnread");
        })
        .catch(err => {
          this.changeAllLoading = false;
          this.$notification.open({
            message: "Error",
            description: err.msg,
            duration: 6,
            style: { background: "#F5222D" } // red
          });
        });
    },
    deleteAllReadOnClick() {
      this.deleteLoading = true;
      delAllRead({})
        .then(res => {
          this.loadData({});
          this.$store.dispatch("getUnread");
          this.deleteLoading = false;
        })
        .catch(err => {
          this.deleteLoading = false;
          this.$notification.open({
            message: "Error",
            description: err.msg,
            duration: 6,
            style: { background: "#F5222D" } // red
          });
        });
    },
    everyOnClick(record) {
      for (let i = 0; i < this.dataSource.length; i++) {
        if (
          record.rid == this.dataSource[i].rid &&
          this.dataSource[i].readMark == 0
        ) {
          this.dataSource[i].readMark = 1;
          changeOneToRead({ rid: record.rid })
            .then(res => {
              if (res.code == 0) {
                this.loadData({});
                this.$store.dispatch("getUnread");
              }
            })
            .catch(err => {});
        }
      }
    },
    exportIdOnClick(record, text) {
      this.everyOnClick(record);
      getFileUrl({ exportId: text }).then(res => {
        if (res != "" && res) {
          window.open(res);
        } else {
          this.$notification.open({
            message: "Download Failed",
            description: "File expired, please download again.",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
    },
    sureToDelete(record) {
      console.log(record, "rererereddddddd");
      this.delfun([{ rid: record.rid }]);
    },
    deleteSelectAll() {
      if (this.selectedRowKeys.length == 0) {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messagePleaseSelectDeleteRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
        return;
      }
      const rowKeys = [];
      this.selectedRowKeys.forEach(element => {
        rowKeys.push({
          rid: element.split("@")[0]
        });
      });
      this.delfun(rowKeys);
    },

    delfun(params) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("lang.messageDeleteSelectedConfirm"),
        onOk() {
          return del(params)
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                self.$notification.open({
                  message: "Success",
                  description: self.$t("lang.messageDeleteSuccess"),
                  duration: 6,
                  style: { background: "#52C41A" } // green
                });
                self.selectedRowKeys = [];
                self.loadData({});
                self.$store.dispatch("getUnread");
              } else {
                self.$notification.open({
                  message: "Error",
                  description: res.msg,
                  duration: 6,
                  style: { background: "#F5222D" } // red
                });
              }
            })
            .catch(err => {
              console.log(err);
              // this.requestFailed(err)
            });
        },
        onCancel() {}
      });
    },
    // 更改列表数组
    changeLanguage() {
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
      }
    },
    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
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

