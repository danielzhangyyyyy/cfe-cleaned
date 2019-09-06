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
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
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
                @change="handleDropDownChange($event, item.decorator)"
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
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
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
                  @change="handleDropDownChange($event, item.decorator)"
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
              <!-- <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('lang.tabComSearchButtonName') }}</a-button> -->
              <a-button
                type="primary"
                :loading="searchLoading"
                icon="search"
                @click="searchOnClick"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button
                style="margin-left: 8px"
                icon="search"
                @click="() => {form.resetFields();productFamilyDropdownList.length=0}"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="save" :loading="saveLoading" @click="saveOnClick()">{{ $t('lang.SaveBtn') }}</a-button>
    </div>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      size="small"
      :rowKey="(record) => record.commodity"
      :data="loadData"
      :alert="options.alert"
      :customRow="(record) => { return {
        on:{
          dblclick:(record)=>{
            // this.doubleClickOnRow(record,true)
          }
        }
      }}"
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>

<script>
    import Vue from "vue";
    import {STable, tableBtns} from "@/components";
    import {groupList, list, save, userList} from "@api/userCommodity_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/userCommodity_lang.js";
    import langEn from "../../locales/en-US/userCommodity_lang.js";
    import {isNullOrUndefined} from "util";

    export default {
  name: "TableList",
  components: {
    STable
  },
  data() {
    return {
      groupDropDownList: [],
      userDropDownList: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      searchLoading: false,
        saveLoading: false,
      defaultCheckedKeys: [],
      defaultCheckedRows: [],
      mdl: {},
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: { userLoginName: "" }, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: "",
      scrollSize: {y:1000},
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
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          getCheckboxProps: record => {
            console.log("props", record);
            return {
              props: {
                defaultChecked: this.defaultChecked.includes(record.commodity)
              }
            };
          },
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        },
        customRow: {
          click: this.aaaa
        }
      }
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.getListFun();
    this.changeLanguage();
    this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
    groupList({})
      .then(res => {
        this.groupDropDownList.length = 0;
        res.result.forEach(element => {
          this.groupDropDownList.push(element["pvalue"]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    userDropDownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "userLoginName") {
          element["dropDownList"] = [].concat(this.userDropDownList);
        }
      });
    },
    groupDropDownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "group") {
          element["dropDownList"] = [].concat(this.groupDropDownList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/userCommodity/userCommodity_list") {
          this.handleOk();
        }
      },
      deep: true
    }
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    searchOnClick() {
      // this.$refs.table.refresh(true);
      this.form.validateFields((err, values) => {
        if (!err) {
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
    handleDropDownChange(value, decorator) {
      console.log("value", value);
      if (decorator == "group") {
        userList({ pvalue: value })
          .then(res => {
            this.form.resetFields(["userLoginName"]);
            this.userDropDownList = [];
            res.result.forEach(element => {
              this.userDropDownList.push(element["loginName"]);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (decorator == "userLoginName") {
        this.queryParam.userLoginName = value;
        this.$refs.table.refresh(true);
      }
    },
    saveOnClick() {
      console.log(this.defaultChecked);
      this.form.validateFields((err, values) => {
        console.log(this.selectedRowKeys);
        const params = [];
        if (this.selectedRowKeys.length == 0) {
          params.push({ userLoginName: values.userLoginName });
        } else {
          this.selectedRowKeys.forEach(element => {
            params.push({
              userLoginName: values.userLoginName,
              commodity: element
            });
          });
        }

        if (!err) {
            this.saveLoading = true
            save(params).then(res => {
              if (res.code == "0") {
                  this.saveLoading = false
                this.$notification.open({
                  message: "Success",
                  description: this.$t("lang.messageEditSuccess"),
                  duration: 6,
                  style: { background: "#52C41A" }
                });
                this.$refs.table.refresh(true);
              } else {
                this.$notification.open({
                  message: "Error",
                  description: res.msg,
                  duration: 6,
                  style: { background: "#F5222D" }
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$notification.config({
            duration: 5
          });
          this.$notification["error"]({
            message: "Search condition error:",
            description: "please select search conditions."
          });
        }
      });
    },
    getListFun() {
      const that = this;
      that.searchLoading = true;
      // const value = this.queryParam
      that.loadData = parameter => {
        parameter.pageSize = 9999;
        that.searchLoading = true;
        console.log("loadData.parameter", parameter);
        if (that.queryParam.userLoginName != "") {
          return list(Object.assign(parameter, that.queryParam)).then(res => {
            console.log(res.result);
            that.defaultCheckedKeys.length = 0;
            that.defaultCheckedRows.length = 0;
            res.result.list.forEach(element => {
              if (
                element["userLoginName"] != "" &&
                !isNullOrUndefined(element["userLoginName"])
              ) {
                that.defaultCheckedKeys.push(element["commodity"]);
                that.defaultCheckedRows.push({
                  commodity: element["commodity"]
                });
              }
            });
            this.$refs.table.updateSelect(
              that.defaultCheckedKeys,
              that.defaultCheckedRows
            );
            that.selectedRowKeys = that.defaultCheckedKeys;
            that.selectedRows = that.defaultCheckedRows;
            res.result.pageSize = 200;
            this.$refs.table.localPagination.pageSize = 200;
            that.searchLoading = false;
            return res.result;
          });
        } else {
          const promise = new Promise((resolve, reject) => {
            if (true) {
              resolve({
                code: "0",
                msg: "ok",
                result: {
                  total: 0,
                  list: [],
                  pageNum: 1,
                  pageSize: 10,
                  size: 10,
                  startRow: 1,
                  endRow: 10,
                  pages: 11,
                  prePage: 0,
                  nextPage: 2,
                  isFirstPage: true,
                  isLastPage: false,
                  hasPreviousPage: false,
                  hasNextPage: true,
                  navigatePages: 1,
                  navigatepageNums: [1],
                  navigateFirstPage: 1,
                  navigateLastPage: 8,
                  firstPage: 1,
                  lastPage: 8
                }
              });
            } else {
              reject("something error");
            }
          });
          return promise.then(res => {
            console.log(res.result);
            that.searchLoading = false;
            return res.result;
          });
        }
      };
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      console.log(selectedRowKeyslen);
      if (selectedRowKeyslen == 1) {
        const editSelectKey = this.selectedRowKeys[0];
        Vue.ls.set("userCommodity_editSelectKey", editSelectKey);
        this.$router.replace(`/userCommodity/userCommodity_edit`);
      } else if (selectedRowKeyslen < 1) {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messagePleaseSelectEditRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
      } else {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messageEditMultiRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
      }
    },
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(this.selectedRowKeys);
      console.log(this.selectedRows);
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      console.log("keyssss", selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
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
