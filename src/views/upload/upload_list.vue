<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
            <a-form-item :label="item.label">
              <a-input
                :placeholder="item.placeHolder"
                v-if="item.inputType=='input'"
                :disabled="item.editDisabled"
                v-decorator="[item.decorator, {initialValue: item.text}, {rules: [{required: item.required, message: item.message }]}]"
              />
              <a-select
                :getPopupContainer="getPopupContainer"
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                v-if="item.inputType=='dropDown'"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
              <a-date-picker
                :getCalendarContainer="getPopupContainer"
                v-if="item.inputType=='date'"
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
              />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
              <a-form-item :label="item.label">
                <a-input
                  :placeholder="item.placeHolder"
                  v-if="item.inputType=='input'"
                  :disabled="item.editDisabled"
                  v-decorator="[item.decorator, {initialValue: item.text}, {rules: [{required: item.required, message: item.message }]}]"
                />
                <a-select
                  :getPopupContainer="getPopupContainer"
                  showSearch
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  v-if="item.inputType=='dropDown'"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    :key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                  :getCalendarContainer="getPopupContainer"
                  v-if="item.inputType=='date'"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button
                type="primary"
                icon="search"
                :loading="searchLoading"
                @click="searchOnClick"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button
                style="margin-left: 8px"
                icon="undo"
                @click="() => {form.resetFields()}"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-row type="flex" justify="start" :gutter="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }">
        <a-col>
          <a-upload
            :fileList="fileList"
            :multiple="false"
            :disabled="uploadDisabled"
            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :beforeUpload="beforeUpload"
            :remove="handleRemove"
            @change="handleChange"
          >
            <a-button :loading="uploading">
              <a-icon type="upload" />Click to Upload
            </a-button>
          </a-upload>
        </a-col>
        <a-col>
          <a-button :loading="downloading" @click="exportTemplate">
            <a-icon type="download" />Template Download
          </a-button>
        </a-col>
        <a-col>
          <a-button type="primary" icon="rollback" @click="goBack">Return</a-button>
        </a-col>
      </a-row>
    </div>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: 2000 }"
      size="small"
      :rowKey="(record) => record.uploadId"
      :data="loadData"
      :customRow="(record) => { return {
        on:{
          // dblclick:(record)=>{
          //   this.doubleClickOnRow(record,true)
          // }
        }
      }}"
    >
      <span slot="successRows" slot-scope="text, record">
        <a :style="{'font-weight': 'bold'}" @click="customCellClick(record, 'success')">{{ text }}</a>
      </span>
      <span slot="failRows" slot-scope="text, record">
        <a :style="{'font-weight': 'bold'}" @click="customCellClick(record, 'fail')">{{ text }}</a>
      </span>
    </s-table>

    <a-modal
      title="Confirm uploading?"
      v-model="visibleModal"
      @ok="handleUpload"
      @cancel="handleCancel"
    >
      <p>Confirm upload ' {{fileName}} ' file</p>
    </a-modal>
  </a-card>
</template>

<script>
    import Vue from "vue";
    import {STable} from "@/components";
    import {ACCESS_TOKEN} from "@/store/mutation-types";
    import {getDropDownList, list, upload} from "@api/upload_api";
    import langEn from "../../locales/en-US/upload_lang.js";
    import {isNullOrUndefined} from "util";

    export default {
  name: "TableList",
  components: {
    STable
  },
  data() {
    return {
      uploadDisabled: false,
      fileList: [],
      file: "",
      fileName: "",
      uploading: false,
      visibleModal: false,
      downloading: false,
      statusDropDownList: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      mdl: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      // 表头
      columns: [],
      loadData: ""
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   console.log('loadData.parameter', parameter)
      //   return list(Object.assign(parameter, this.queryParam))
      //     .then(res => {
      //       console.log(res.result)
      //       return res.result
      //     })
      // },
      // custom table alert & rowSelection
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    this.setFilterValue();
    this.getListFun();
    this.getDropDown({}, this.statusDropDownList, "status");
  },
  mounted() {
    console.log(this.$route, "asdfghgjhf");
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(to, from) {
        console.log("nnn", to.name);
        if (to.name == "upload_list") {
          if (
            this.queryParam.templateName != this.$route.params.id &&
            from.name !== "upload_list"
          ) {
            this.uploadDisabled = false;
            this.uploading = false;
          }
          this.changeLanguage();
          this.form.resetFields();
          this.setFilterValue();
          this.getDropDown({}, this.statusDropDownList, "status");
          this.queryParam.templateName = this.$route.params.id;
          this.searchOnClick();
        }
      },
      deep: true
    },
    statusDropDownList() {
      this.filterList.forEach(item => {
        if (item["decorator"] == "status") {
          item["dropDownList"] = [].concat(this.statusDropDownList);
        }
      });
    }
  },
  methods: {
    customCellClick(record, dataIndex) {
      const origin = this.$route.fullPath;
      const eventName = this.$route.params.id;
      this.$router.replace({
        path: "/upload/upload_detail",
        query: {
          uploadId: record.uploadId,
          uploadStatus: dataIndex,
          eventName: eventName,
          origin: origin
        }
      });
    },
    goBack() {
      const origin = this.$route.params.origin;
      this.$store.dispatch("ToggleCloseTab", "");
      setTimeout(() => {
        this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
        this.$router.push({ name: origin });
      }, 500);
    },
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    exportTemplate() {
      this.downloading = true;
      let xhr = new XMLHttpRequest();
      let json = {
        rownum: 1,
        eventName: this.$route.params.id,
        getTemplate: "1"
      };
      xhr.open("POST", "/pcg/api/common/exportExcel");
      xhr.responseType = "blob";
      xhr.setRequestHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      const token = Vue.ls.get("Access-Token");
      if (token) {
        xhr.setRequestHeader("pcgcfe-java-token", token);
      }
      xhr.send(JSON.stringify(json));
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let title = xhr.getResponseHeader("Content-Disposition")
            ? xhr.getResponseHeader("Content-Disposition").split("=")[1]
            : new Date().toLocaleString();
          let blob = new Blob([xhr.response], {
            type: "application/vnd.ms-excel"
          });
          let url = URL.createObjectURL(blob);
          let aLink = document.createElement("a");
          aLink.href = url;
          aLink.download = title;
          aLink.click();
        }
      };
      this.downloading = false;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    beforeUpload(file) {
      this.file = file;
      this.fileName = file.name;
      this.visibleModal = true;
      // this.fileList = [...this.fileList, file];
      return false;
    },
    handleCancel() {
      this.visibleModal = false;
    },
    handleUpload() {
      this.uploading = true;
      this.uploadDisabled = true;
      this.visibleModal = false;
      let formData = new FormData();
      // this.fileList.forEach(file => {
      formData.append("file", this.file);
      // });
      upload({ eventName: this.$route.params.id }, formData)
        .then(res => {
          // this.fileList = [];
          this.uploading = false;
          this.uploadDisabled = false;
          if (res.code == 0) {
              this.$notification.open({
                  message: `${this.file.name} upload completed`,
                  description: 'Please see detail info.',
                  duration: 6,
                  style: { background: "#52C41A" }
              });

          } else if(res.code == 1){
              this.$notification.open({
                  message: "Info",
                  description:  res.msg,
                  duration: 6,
                  style: { background: "#52C41A" }
              });
          }else {
              this.$notification.open({
                  message: "Error",
                  description: "Upload failed, " + res.msg,
                  duration: 6,
                  style: { background: "#F5222D" }
              });
          }
          this.searchOnClick();
        })
        .catch(err => {
          this.uploading = false;
          this.uploadDisabled = false;
          this.$notification.open({
            message: "Failed",
            description: `${this.file.name}  upload failed!`,
            duration: 6,
            style: { background: "#F5222D" }
          });
        });
      setTimeout(() => {
        this.searchOnClick();
        return false;
      }, 3000);
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        /*  this.$message.success(
                                  `${info.file.name} file uploaded successfully`,
                                  6
                                ); */
        this.$notification.open({
          message: "Success",
          description: `${info.file.name} file uploaded successfully`,
          duration: 6,
          style: { background: "#52C41A" }
        });
      } else if (info.file.status === "error") {
        //this.$message.error(`${info.file.name} file upload failed.`, 6);
        this.$notification.open({
          message: "Failed",
          description: `${info.file.name} file upload failed.`,
          duration: 6,
          style: { background: "#F5222D" }
        });
      }
    },
    searchOnClick() {
      // this.$refs.table.refresh(true);
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam.templateName = this.$route.params.id;
          this.queryParam.status = values.status;
          this.queryParam.uploadDateStart = isNullOrUndefined(
            values.uploadDateStart
          )
            ? ""
            : values.uploadDateStart.format("YYYY-MM-DD");
          this.queryParam.uploadDateEnd = isNullOrUndefined(
            values.uploadDateEnd
          )
            ? ""
            : values.uploadDateEnd.format("YYYY-MM-DD");
          this.$refs.table.refresh(true);
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description: "please input search conditions.",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.$notification.open({
            message: "Search condition error:",
            description: "please input search conditions.",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    setFilterValue() {
      this.filterList.forEach(item => {
        if (item["decorator"] == "templateName") {
          item["text"] = this.$route.params.id;
        }
      });
      this.queryParam.templateName = this.$route.params.id;
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    getListFun() {
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        that.searchLoading = true;
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          that.searchLoading = false;
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    doubleClickOnRow(record) {
      // 双击行查看详情
      const rowKey = record.target.parentNode.dataset.rowKey;
      console.log(rowKey);
      Vue.ls.set("plantMaintenance_dblclickRowKey", rowKey);
      this.$router.replace("/plantMaintenance/plantMaintenance_detail");
      // this.editListFun(rowKey, true)
    },
    // 更改列表数组
    changeLanguage() {
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
      }
    },
    // 刷新列表
    handleOk() {
      this.$refs.table.refresh(); // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
    },
    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    }
  }
};
</script>
