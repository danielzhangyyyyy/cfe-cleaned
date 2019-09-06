<template>
  <a-card :bordered="false" class="content">
    <div>
      <a-row type="flex" justify="end" :gutter="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }">
        <a-col>
          <a-button
            type="primary"
            icon="download"
            @click="exportOnClick"
          >{{ $t('lang.tabComExport') }}</a-button>
        </a-col>
        <a-col>
          <a-button type="primary" icon="rollback" @click="goBack">Return</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      ref="table"
      size="small"
      :scroll="scroll"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
      :style="{'padding-top': '5px'}"
    ></a-table>
  </a-card>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { STable } from "@/components";
import { detail } from "@api/upload_api";
import { isNullOrUndefined } from "util";

export default {
  name: "TableList",
  components: {
    STable
  },
  data() {
    return {
      dataSource: [],
      loading: false, // 页面是否加载中
      queryParam: {}, // 查询参数
      columns: [], // 表头
      pagination: { showSizeChanger: true, hideOnSinglePage: true },
      description: "",
      scroll: { x: 0 }
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.name == "upload_detail") {
          this.loadData({});
        }
      },
      deep: true
    }
  },
  created() {
    console.log(this.$route);
    this.loadData({});
  },
  methods: {
     exportOnClick() {
      this.exportLoading = true;
      let xhr = new XMLHttpRequest();
      let json = {
        ...this.queryParam, getUploadDetail: '1'
      };
      xhr.open("POST", "/pcg/api/common/exportExcel");
      xhr.responseType = "blob";
      xhr.setRequestHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      const token = Vue.ls.get('Access-Token');
      if (token) {
        xhr.setRequestHeader("pcgcfe-java-token", token);
      }
      xhr.send(JSON.stringify(json));
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (
            !isNullOrUndefined(xhr.getResponseHeader("async")) &&
            xhr.getResponseHeader("async") == 1
          ) {
              this.$notification.open({
                  message: "Info",
                  description: "Start exporting, please wait...",
                  style: { background: "#52C41A" }
              });
          } else {
            let title = xhr.getResponseHeader("Content-Disposition")
              ? xhr.getResponseHeader("Content-Disposition").split("=")[1]
              : new Date().toLocaleString();
            if ("msSaveOrOpenBlob" in navigator) {
              //IE
              window.navigator.msSaveOrOpenBlob(
                new Blob([xhr.response]),
                title
              );
            } else {
              // non-IE
              let blob = new Blob([xhr.response], {
                type: "application/vnd.ms-excel"
              });
              let url = URL.createObjectURL(blob);
              let aLink = document.createElement("a");
              aLink.href = url;
              aLink.download = title;
              aLink.click();
            }
          }
        }
        this.exportLoading = false;
        // window.location.href = url;
      };
    },
    handleTableChange(pagination, filters, sorter) {
      /*  const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager; */
      this.loadData({
        /*  pageSize: pagination.pageSize,
        pageNum: pagination.current, */
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    loadData(params) {
      this.loading = true;
      this.searchLoading = true;
      this.dataSource = [];
      this.queryParam.uploadId = this.$route.query.uploadId;
      this.queryParam.uploadStatus = this.$route.query.uploadStatus;
      this.queryParam.eventName = this.$route.query.eventName;
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
      detail(self.queryParam).then(res => {
        self.setColumns(res.result.header);
        res.result.data.forEach((el, index) => {
          el.key = index + 1;
          self.dataSource.push(el);
        });
        self.loading = false;
        self.searchLoading = false;
      });
    },
    goBack() {
      const origin = this.$route.query.origin;
      this.$store.dispatch("ToggleCloseTab", "");
      setTimeout(() => {
        this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
        this.$router.replace(origin);
      }, 500);
    },
    // 更改列表数组
    setColumns(cols) {
      this.columns.splice(0);
      for (let key in cols) {
        this.columns.push({
          title: cols[key],
          dataIndex: key,
          align: "center",
          width: 200,
          sorter: true
        });
      }
      this.scroll.x = 0;
      this.columns.forEach(el => {
        if (el.width != undefined) {
          this.scroll.x += el.width;
        }
      });
    }
  }
};
</script>