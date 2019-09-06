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
                @change="inputChange($event, item.decorator)"
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
                  v-bind:key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
              <a-date-picker
                :getCalendarContainer="getPopupContainer"
                v-if="item.inputType=='date'"
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                @change="dateChange($event, item.decorator)"
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
                  @change="inputChange($event, item.decorator)"
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
                    v-bind:key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                  :getCalendarContainer="getPopupContainer"
                  v-if="item.inputType=='date'"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  @change="dateChange($event, item.decorator)"
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
                @click="searchOnClick"
                :loading="searchLoading"
                icon="search"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button
                style="margin-left: 8px"
                icon="undo"
                @click="() => {form.resetFields();setRequiredDefault();productFamilyDropdownList.length=0}"
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

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
      uploadId="UPLOAD_ITEMEOL"
      uploadAlias="Batch EOL"
      v-on:addNewTable="addNewTable"
      v-on:editSelectOne="editSelectOne"
      v-on:deleteSeclectAll="deleteSeclectAll"
    ></tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="scrollSize"
      size="small"
      :rowKey="(record) => record.rid"
      :data="loadData"
      :alert="options.alert"
      :customRow="(record) => { return {
                    on:{
                      dblclick:(record)=>{
                        //this.doubleClickOnRow(record,true)
                      }
                    }
                  }}"
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>



<script>
import Vue from "vue";
import moment from "moment";
import { STable, tableBtns } from "@/components";
import { del, getDropDownList, list } from "@api/itemEOL_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/itemEOL_lang.js";
import langEn from "../../locales/en-US/itemEOL_lang.js";
import { isNullOrUndefined } from "util";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      currentPageManipulationAuth: ["View", "Upload", "Update"],
      productFamilyDropdownList: [],
      brandTypeDropdownList: [],
      itemTypeDropDownList: ["MTM", "SBB", "COMPONENT"],
      eolStatusDropDownList: ["EOL", "OL", "TEMP"],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      searchLoading: false,
      mdl: {},
      requiredArray: [
        "item",
        "brand",
        "aspPrdFamily",
        "sysLastModifiedDateStart",
        "sysLastModifiedDateEnd"
      ],
      loading: false, // 页面是否加载中
      advanced: true, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: "",
      scrollSize: {},
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
    console.log(this.$store.getters);
    this.changeLanguage();
    this.scrollSize.x = getXScrollSize(this.columns, 62);
    this.getListFun();
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandTypeDropdownList,
      "BRAND"
    );
    this.setDropDownLists();
  },
  watch: {
    brandTypeDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandTypeDropdownList);
        }
      });
    },
    productFamilyDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "aspPrdFamily") {
          element["dropDownList"] = [].concat(this.productFamilyDropdownList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/itemEOL/itemEOL_list") {
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
    moment,
    searchOnClick() {
      // this.$refs.table.refresh(true);
      this.form.validateFields((err, values) => {
        if (
          (values.item !== "" && !isNullOrUndefined(values.item)) ||
          (values.brand !== "" && !isNullOrUndefined(values.brand)) ||
          (values.eolStatus !== "" && !isNullOrUndefined(values.eolStatus)) ||
          (values.sysLastModifiedDateStart !== "" &&
            !isNullOrUndefined(values.sysLastModifiedDateStart) &&
            values.sysLastModifiedDateEnd !== "" &&
            !isNullOrUndefined(values.sysLastModifiedDateEnd)) ||
          (values.brand !== "" &&
            !isNullOrUndefined(values.brand) &&
            values.aspPrdFamily !== "" &&
            !isNullOrUndefined(values.aspPrdFamily)) ||
          (values.brand !== "" &&
            !isNullOrUndefined(values.brand) &&
            values.aspPrdFamily !== "" &&
            !isNullOrUndefined(values.aspPrdFamily) &&
            values.eolStatus !== "" &&
            !isNullOrUndefined(values.eolStatus))
        ) {
          this.queryParam.item = values.item;
          this.queryParam.itemType = values.itemType;
          this.queryParam.brand = values.brand;
          this.queryParam.aspPrdFamily = values.aspPrdFamily;
          this.queryParam.eolStatus = values.eolStatus;
          this.queryParam.sysLastModifiedDateStart = !isNullOrUndefined(
            values.sysLastModifiedDateStart
          )
            ? values.sysLastModifiedDateStart.format("YYYY-MM-DD")
            : "";
          this.queryParam.sysLastModifiedDateEnd = !isNullOrUndefined(
            values.sysLastModifiedDateEnd
          )
            ? values.sysLastModifiedDateEnd.format("YYYY-MM-DD")
            : "";
          this.$refs.table.refresh(true);
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description:
              "Please fill in 'Item' or choose 'Brand Type' and 'Product Famliy' before proceeding",
            duration: 6,
            style: { background: "#F5222D" } //red
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
            description:
              "Please fill in 'Item' or choose 'Brand Type' and 'Product Famliy' before proceeding",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
    },
    setDropDownLists() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandTypeDropdownList);
        } else if (element["decorator"] == "itemType") {
          element["dropDownList"] = [].concat(this.itemTypeDropDownList);
        } else if (element["decorator"] == "eolStatus") {
          element["dropDownList"] = [].concat(this.eolStatusDropDownList);
        }
      });
    },
    handleDropDownChange(value, decorator) {
      console.log("value", value);
      if (decorator == "brand") {
        this.form.resetFields(["aspPrdFamily"]);
        this.productFamilyDropdownList = [];
        this.getDropDown(
          { moduleName: "getProductFamilyByBrand", brand: value },
          this.productFamilyDropdownList,
          "COST_PROD_FAMILY"
        );
        if (this.requiredArray.includes(decorator)) {
          this.changeRequrie(value, decorator);
        }
      }
    },
    inputChange(ev, decorator) {
      let value = ev.target.value;
      if (this.requiredArray.includes(decorator)) {
        this.changeRequrie(value, decorator);
      }
    },
    dateChange(ev, decorator) {
      let value = "";
      if (ev !== null) {
        value = ev.format("YYYY-MM-DD");
      }
      if (this.requiredArray.includes(decorator)) {
        this.changeRequrie(value, decorator);
      }
    },
    changeRequrie(value, decoratorC) {
      let existedValue = false;
      let existedkeys = [];
      let fieldsValues = this.form.getFieldsValue(this.requiredArray);
      if (fieldsValues.sysLastModifiedDateStart != undefined) {
        fieldsValues.sysLastModifiedDateStart = fieldsValues.sysLastModifiedDateStart.format(
          "YYYY-MM-DD"
        );
      }
      if (fieldsValues.sysLastModifiedDateEnd != undefined) {
        fieldsValues.sysLastModifiedDateEnd = fieldsValues.sysLastModifiedDateEnd.format(
          "YYYY-MM-DD"
        );
      }
      if (value == "" || isNullOrUndefined(value)) {
        for (let key in fieldsValues) {
          if (
            key !== decoratorC &&
            !isNullOrUndefined(fieldsValues[key]) &&
            fieldsValues[key] !== ""
          ) {
            existedValue = true;
            existedkeys.push(key);
          }
        }
      } else if (value != "" && !isNullOrUndefined(value)) {
        existedkeys.push(decoratorC);
        existedValue = true;
        for (let key in fieldsValues) {
          if (key !== decoratorC && fieldsValues[key]) {
            existedkeys.push(key);
          }
        }
      }
      if (existedValue) {
        this.requiredArray.forEach(item => {
          this.filterList.forEach(el => {
            if (el.decorator == item) {
              if (existedkeys.includes(item)) {
                el.required = true;
                this.form.getFieldDecorator(el.decorator, {
                  rules: [{ required: true, message: el.message }]
                });
              } else {
                el.required = false;
                this.form.resetFields([el.decorator]);
                this.form.getFieldDecorator(el.decorator, {
                  rules: [{ required: false, message: el.message }]
                });
              }
            }
          });
        });
      } else {
        this.setRequiredDefault();
      }
    },
    setRequiredDefault() {
      this.requiredArray.forEach(item => {
        this.filterList.forEach(el => {
          if (el.decorator == item) {
            el.required = true;
          }
        });
      });
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
      that.searchLoading = true;
      // const value = this.queryParam
      that.loadData = parameter => {
        console.log("loadData.parameter", parameter);
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          console.log(res.result);
          that.searchLoading = false;
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    addNewTable() {
      // 新建列表
      this.$router.replace("/itemEOL/itemEOL_add");
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      console.log(selectedRowKeyslen);
      if (selectedRowKeyslen == 1) {
        const editSelectKey = this.selectedRowKeys[0];
        Vue.ls.set("itemEOL_editSelectKey", editSelectKey);
        this.$router.replace(`/itemEOL/itemEOL_edit`);
      } else if (selectedRowKeyslen < 1) {
        this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectEditRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
      } else {
         this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messageEditMultiRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
      }
    },
    doubleClickOnRow(record) {
      // 双击行查看详情
      const rowKey = record.target.parentNode.dataset.rowKey;
      console.log(rowKey);
      Vue.ls.set("itemEOL_dblclickRowKey", rowKey);
      this.$router.replace("/itemEOL/itemEOL_detail");
      // this.editListFun(rowKey, true)
    },

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
    },
    // 删除单个列表
    deleteListFun(id) {
      console.log(id);
      const datas = {
        rid: id
      };
      this.delfun(datas);
    },
    // 删除选中列表
    deleteSeclectAll() {
      const selectedIdArr = this.selectedRowKeys.join(",");
      const iddatas = { id: selectedIdArr };
      this.delfun(iddatas);
    },

    delfun(datas) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("lang.messageDeleteSelectedConfirm"),
        onOk() {
          return del(datas)
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                self.$notification.open({
                  message: "Success",
                  description: self.$t("lang.messageDeleteSuccess"),
                  duration: 6,
                  style: { background: "#52C41A" }
                });
                self.selectedRowKeys = [];
                self.handleOk(); // 删除后刷新列表
              } else {
                self.$notification.open({
                  message: "Error",
                  description: res.msg,
                  duration: 6,
                  style: { background: "#F5222D" }
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
      console.log(this.language);
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
        // this.filterlList = langZh.filter_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
        // this.filterlList = langEn.filter_langEn;
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
    // 重置
    /* resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      };
    } */
    // 开启、关闭选择框
    // tableOption () {
    //   if (!this.optionAlertShow) {
    //     this.options = {
    //       alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
    //       rowSelection: {
    //         selectedRowKeys: this.selectedRowKeys,
    //         onChange: this.onSelectChange
    //       }
    //     }
    //     this.optionAlertShow = true
    //   } else {
    //     this.options = {
    //       alert: false,
    //       rowSelection: null
    //     }
    //     this.optionAlertShow = false
    //   }
    // }
  }
};
</script>
