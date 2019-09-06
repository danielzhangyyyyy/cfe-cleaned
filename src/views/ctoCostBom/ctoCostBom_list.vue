<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
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
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                v-if="item.inputType=='dropDown'"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                @change="handleDropDownChange($event, item.decorator)"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
              <a-auto-complete
                v-if="item.inputType=='autoComplete'"
                :disabled="item.editDisabled"
                :placeholder="item.message"
                :allowClear="item.allowClear"
                :dataSource="item.dropDownList"
                :filterOption="filterOption"
                v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"
                @change="handleDropDownChange($event, item.decorator)"
              />
              <a-date-picker
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
                <a-auto-complete
                  v-if="item.inputType=='autoComplete'"
                  :disabled="item.editDisabled"
                  :placeholder="item.message"
                  :allowClear="item.allowClear"
                  :dataSource="item.dropDownList"
                  :filterOption="filterOption"
                  v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"
                />
                <a-date-picker
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
      <a-button type="primary" icon="download" @click="exportExcelOnClick">Export Excel</a-button>
    </div>

    <a-alert style="margin-bottom: 16px">
      <template slot="message">
        <div style="margin-right: 12px">
          <span v-if="!infoTitle.description" :style="{'font-weight': 'bold'}">CTO Cost BOM</span>
          <div v-else style="line-height: 25px;">
            <span style="font-weight: bold">Product Description: &nbsp;</span>
            {{infoTitle.description}}&nbsp;&nbsp;
            <span style="font-weight: bold">Brand:</span>
            {{infoTitle.brand}}&nbsp;&nbsp;
            <span
              style="font-weight: bold"
            >Product Family:</span>
            {{infoTitle.family}}&nbsp;&nbsp;
            <span style="font-weight: bold">CTO:</span>
            {{infoTitle.mtm}}&nbsp;&nbsp;
            <span style="font-weight: bold">Cost Life:</span>
            {{infoTitle.life}}&nbsp;&nbsp;
          </div>
        </div>
      </template>
    </a-alert>
    <m-table
      :columns="columns"
      :dataSource="dataSource"
      :scroll="scrollSize"
      :loading="loading"
      :showPagination="true"
    >
      <template slot="sbb" slot-scope="{text, record, index}">
        <a
          @click="sbbOnClick(record, text)"
          :class="{visitedPart: visitedKey.indexOf(text) != -1}"
        >{{ text }}</a>
      </template>
    </m-table>
    <!-- <a-table
                ref="table"
                size="small"
                :scroll="scrollSize"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :style="{'padding-top': '1px'}"
        >
          <span slot="sbb" slot-scope="text, record">
            <a @click="sbbOnClick(record, text)" :class="{visitedPart: visitedKey.indexOf(text) != -1}">
              {{ text }}
            </a>
          </span>
    </a-table>-->
  </a-card>
</template>
<script>
import Vue from "vue";
import { STable, tableBtns } from "@/components";
import {
  getBrand,
  getBrandByAssembly,
  getCountryListByPlant,
  getDescription,
  getDropDownList,
  getItemByBrandFamily,
  getPlantListByAssembly,
  getPrdFamilyByAssembly,
  getPrdFamilyByBrand,
  list
} from "@api/ctoCostBom_api";
import { exportByURL } from "@api/exportFunction_api";
import { getXScrollSize } from "@api/publicFunc_api";
import commonWidth from "../../locales/en-US/columnCommonWidth_lang.js";
import langZh from "../../locales/zh-CN/ctoCostBom_lang.js";
import langEn from "../../locales/en-US/ctoCostBom_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      cycleDataList: [],
      assemblyDataList: [], // do not loaded in created
      plantDataList: [], // do not loaded in created
      countryDataList: [], // do not loaded in created
      brandDataList: [],
      prdFamilyDataList: [], // do not loaded in created
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      timer: null,
      dataSource: [],
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: true, // 高级搜索 展开/关闭
      queryParam: { cycle: "CURRENT" }, // 查询参数
      columns: [], // 表头
      pagination: { showSizeChanger: true, hideOnSinglePage: true },
      productGroup: Vue.ls.get("PRODUCTGROUP"),
      infoTitle: {
        description: "",
        brand: "",
        family: "",
        mtm: "",
        life: ""
      },
      requestId: "",
      scrollSize: { y: false },
      visitedKey: [],
      lastQuery: ""
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.visitedKey.length = 0;
    this.changeLanguage();
    this.scrollSize.x = getXScrollSize(this.columns, 0);
    this.getDropDown(
      { moduleName: "getCycleList" },
      this.cycleDataList,
      "CYCLE"
    );
    this.getDropDown(
      { CYCLE: this.form.getFieldValue("cycle") },
      this.brandDataList,
      "brand",
      getBrand
    );
    this.getMonths();
    if (this.productGroup.toUpperCase() == "IPG") {
      for (let element of this.columns) {
        if (element.title !== "TPG_SBB") {
          this.columns.splice(1, 0, {
            title: "TPG_SBB",
            dataIndex: "tpgSbb",
            align: "left",
            // sorter: true,
            width: commonWidth.sbb
          });
          this.scrollSize.x += commonWidth.sbb;
        } else {
          return;
        }
      }
    }
  },
  watch: {
    cycleDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "cycle") {
          element["dropDownList"] = [].concat(this.cycleDataList);
        }
      });
    },
    brandDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    prdFamilyDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "aspPrdFamily") {
          element["dropDownList"] = [].concat(this.prdFamilyDataList);
        }
      });
    },
    plantDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.plantDataList);
        }
      });
    },
    countryDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "country") {
          element["dropDownList"] = [].concat(this.countryDataList);
        }
      });
    },
    assemblyDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "assembly") {
          element["dropDownList"] = [].concat(this.assemblyDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    }
    // $route: {
    //     handler(route) {
    //         console.log(route.path);
    //         if (route.path === "/ctoCostBom/ctoCostBom_list") {
    //             this.loadData({});
    //         }
    //     },
    //     deep: true
    // }
  },
  methods: {
    getMonths() {
      getDropDownList({
        moduleName: "getMonthListByCycle",
        cycle: this.queryParam.cycle
      }).then(res => {
        for (let key in res.result[0]) {
          for (let item of this.columns) {
            if (
              item.dataIndex &&
              item.dataIndex.toUpperCase() === key.toUpperCase()
            ) {
              item.title = res.result[0][key] + "E";
            } else if (
              item.dataIndex &&
              item.dataIndex.toUpperCase() === "L" + key.toUpperCase()
            ) {
              item.title = res.result[0][key] + "L";
            }
          }
        }
      });
    },
    exportExcelOnClick() {
      delete this.queryParam.brand;
      let params = { ...this.queryParam, requestId: this.requestId };
      exportByURL(params, "ctoCostBom/exportExcel");
    },
    searchOnClick() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visitedKey = [];
          this.queryParam.uiName = "ctoCostBom";
          this.queryParam.uiAction = "getCtoCostBom";
          this.queryParam.cycle = values.cycle;
          this.queryParam.model = values.assembly;
          this.queryParam.father = values.assembly;
          this.queryParam.plant = values.plant;
          this.queryParam.country = values.country;
          values.brand ? (this.queryParam.brand = values.brand) : "";
          values.aspPrdFamily
            ? (this.queryParam.prodfamily = values.aspPrdFamily)
            : "";
          this.loadData({});
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
    getDropDown(param, dropdownList, key, api = getDropDownList) {
      return new Promise((resolve, reject) => {
        api(Object.assign({}, param)).then(res => {
          dropdownList.splice(0);
          if (res.code == 0) {
            if (res.result.length != 0)
              res.result.forEach(el => {
                dropdownList.push(el[key]);
              });
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
    handleDropDownChange(value, decorator) {
      if (decorator == "assembly" && value != "" && value) {
        if (this.timer != null) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.form.resetFields(["plant"]);
          this.form.resetFields(["country"]);
          this.countryDataList.splice(0);
          this.getDropDown(
            {
              cycle: this.form.getFieldValue("cycle"),
              item: value,
              itemType: "CTO"
            },
            this.plantDataList,
            "plant",
            getPlantListByAssembly
          );
          getDescription({ item: value, itemType: "CTO" }).then(res => {
            if (res.code == 0) {
              this.infoTitle.description = res.result.itemDesc;
              this.infoTitle.brand = res.result.brand;
              this.infoTitle.family = res.result.aspPrdFamily;
              this.infoTitle.mtm = res.result.item;
              this.infoTitle.life = res.result.eolStatus;
            } else {
              this.$notification.open({
                message: "Error:",
                description: res.msg,
                duration: 6,
                style: { background: "#F5222D" }
              });
            }
          });
          if (!this.assemblyDataList.includes(value)) {
            this.form.resetFields(["brand"]);
            this.form.resetFields(["aspPrdFamily"]);
            this.prdFamilyDataList.splice(0);
            this.getDropDown(
              {
                cycle: this.form.getFieldValue("cycle"),
                item: value,
                itemType: "CTO"
              },
              this.brandDataList,
              "brand",
              getBrandByAssembly
            ).then(res => {
              if (res.result.length != 0)
                this.form.setFieldsValue({ ["brand"]: res.result[0]["brand"] });
            });
            this.getDropDown(
              {
                cycle: this.form.getFieldValue("cycle"),
                brand: this.form.getFieldValue("brand"),
                item: this.form.getFieldValue("assembly"),
                itemType: "CTO"
              },
              this.prdFamilyDataList,
              "aspPrdFamily",
              getPrdFamilyByAssembly
            ).then(re => {
              if (re.result.length != 0)
                this.form.setFieldsValue({
                  ["aspPrdFamily"]: re.result[0]["aspPrdFamily"]
                });
            });
          }
        }, 1500);
      } else if (decorator == "assembly" && (value == "" || !value)) {
        this.form.resetFields(["brand"]);
        this.form.resetFields(["aspPrdFamily"]);
        this.assemblyDataList = [];
        this.getDropDown(
          { CYCLE: this.form.getFieldValue("cycle") },
          this.brandDataList,
          "brand",
          getBrand
        );
      } else if (decorator == "plant") {
        this.form.resetFields(["country"]);
        this.getDropDown(
          {
            plant: value,
            item: this.form.getFieldValue("assembly"),
            cycle: this.form.getFieldValue("cycle"),
            itemType: "CTO"
          },
          this.countryDataList,
          "country",
          getCountryListByPlant
        );
      } else if (decorator == "brand") {
        this.form.resetFields(["aspPrdFamily"]);
        this.getDropDown(
          { cycle: this.form.getFieldValue("cycle"), brand: value },
          this.prdFamilyDataList,
          "aspPrdFamily",
          getPrdFamilyByBrand
        );
      } else if (decorator == "aspPrdFamily") {
        this.form.resetFields(["assembly"]);
        this.getDropDown(
          {
            cycle: this.form.getFieldValue("cycle"),
            brand: this.form.getFieldValue("brand"),
            aspPrdFamily: value,
            itemType: "CTO"
          },
          this.assemblyDataList,
          "item",
          getItemByBrandFamily
        );
      }
    },
    handleTableChange(pagination, filters, sorter) {
      this.loadData({
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    loadData(params) {
      const self = this;
      let parameter = {};
      this.loading = true;
      this.searchLoading = true;
      this.dataSource = [];
      if (params.sortField) parameter.sortField = params.sortField;
      if (params.sortOrder) parameter.sortOrder = params.sortOrder;
      list(Object.assign(parameter, self.queryParam)).then(res => {
        if (res.code != 0) {
          self.loading = false;
          self.searchLoading = false;
          self.dataSource = [];
          self.$notification.open({
            message: "Error",
            description: res.msg,
            duration: 6,
            style: { background: "#F5222D" }
          });
          return;
        } else {
          res.result.data.forEach((element, index) => {
            element.key = index;
          });
          self.requestId = res.result.data[0].requestId;
          self.dataSource = res.result.data;
          self.dataSource.length > 10
            ? (self.scrollSize.y = 450)
            : (self.scrollSize.y = false);
          self.loading = false;
          self.searchLoading = false;
        }
      });
    },
    sbbOnClick(record, text) {
      this.$store.dispatch("ToggleCloseTab", "");
      this.visitedKey.push(text);
      setTimeout(() => {
        this.$store.dispatch(
          "ToggleCloseTab",
          "/ctoCostBom/ctoCostBom_detail" + this.lastQuery
        );
        this.lastQuery = encodeURI(
          "?cycle=" +
            record.cycle +
            "&model=" +
            record.model +
            "&sbb=" +
            text +
            "&country=" +
            record.country +
            "&plant=" +
            record.plant +
            "&father=" +
            record.father +
            "&requestId=" +
            record.requestId
        ).replace(new RegExp(/(:)/g), "%3A");
        this.$router.replace({
          path: "/ctoCostBom/ctoCostBom_detail",
          query: {
            cycle: record.cycle,
            model: record.model,
            sbb: text,
            country: record.country,
            plant: record.plant,
            father: record.father,
            requestId: record.requestId
          }
        });
      }, 500);
    },
    rowClassName(record, index) {
      return record.costType == "COST-OUTPUT" ? "darkRows" : "noColor";
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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

<style lang="less" scoped>
.myTable {
  min-width: 1000px;
  thead {
    tr {
      th {
        display: inline-block;
        width: 150px;
        height: 50px;
        /*line-height: 50px;*/
      }
    }
  }
  tbody {
    tr {
      td {
        display: inline-block;
        width: 200px;
        height: 45px;
        line-height: 45px;
      }
    }
  }
}
.ant-table-content
  .ant-table-body
  .ant-table-tbody
  > tr
  > td
  > span
  > a:visited {
  color: #9f5fc5 !important;
}

.visitedPart {
  color: #9f5fc5 !important;
}
</style>
