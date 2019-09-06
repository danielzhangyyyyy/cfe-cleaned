<template>
    <a-card :bordered="false" class="content">
        <a-alert style="margin-bottom: 16px;padding: 15px 15px;">
            <template slot="message">
                <span>
                  <span class="title">SBB: </span>{{title.sbb}}&nbsp;&nbsp;
                  <span class="title">Plant: </span>{{title.plant}}&nbsp;&nbsp;
                  <span class="title">Country/Region: </span>{{title.country}}&nbsp;&nbsp;
                </span>
                <a-button type="primary" icon="rollback" @click="goBack" :style="{'float': 'right', 'bottom': '6px'}">
                    Return
                </a-button>
            </template>
        </a-alert>
        <a-table
                ref="table"
                size="small"
                :scroll="scrollSize"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :style="{'padding-top': '1px'}"
                :rowClassName="rowClassName"
        >
          <span slot="sbb" slot-scope="text, record">
            <a @click="partOnClick(record, text)" :class="{visitedPart: visitedKey.indexOf(text) != -1}">
                {{ text }}
            </a>
          </span>
        </a-table>

        <a-table
                ref="table"
                size="small"
                :scroll="scrollSize1"
                :columns="columns1"
                :dataSource="dataSource1"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :style="{'padding-top': '40px'}"
                :rowClassName="rowClassName"
        >
        </a-table>

    </a-card>
</template>

<script>
    import {detail, getDropDownList, list} from "@api/ctoCostBom_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/ctoCostBom_lang.js";
    import langEn from "../../locales/en-US/ctoCostBom_lang.js";

    export default {
        name: "TableList",
        data() {
            return {
                form: this.$form.createForm(this),
                dataSource: [],
                dataSource1: [],
                loading: false, // 页面是否加载中
                queryParam: {}, // 查询参数
                columns: [], // 表头
                columns1: [],
                visitedKey: [],
                pagination: {showSizeChanger: true, hideOnSinglePage: true},
                title: {
                    sbb: '',
                    plant: '',
                    country: ''
                },
                scrollSize: {},
                scrollSize1: {},
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize.x = getXScrollSize(this.columns,0);
            this.scrollSize1.x = getXScrollSize(this.columns1,0);
            this.visitedKey.length = 0;
            this.loadData({});
            this.getMonths(this.columns);
            this.getMonths(this.columns1);
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            '$route': {
                handler(route) {
                    if (route.path == "/ctoCostBom/ctoCostBom_detail") {
                        this.loadData({});
                    }
                },
                deep: true
            }
        },
        methods: {
            partOnClick(record, text) {
                this.$store.dispatch("ToggleCloseTab", "");
                this.visitedKey.push(text);
                setTimeout(() => {
                    this.$store.dispatch(
                        "ToggleCloseTab",
                        "/ctoCostBom/ctoCostBom_costTape" + this.lastQuery
                    );
                    this.lastQuery = encodeURI(
                        "?cycle=" + record.cycle +
                        "&mfgPlant=" + record.costPlant +
                        "&partNumber=" + text
                    ).replace(new RegExp(/(:)/g), "%3A");
                    this.$router.replace({
                        path: "/ctoCostBom/ctoCostBom_costTape",
                        query: {
                            cycle: record.cycle,
                            mfgPlant: record.costPlant,
                            partNumber: text
                        }
                    });
                }, 500);
            },
            getMonths(params) {
                getDropDownList({moduleName: "getMonthListByCycle", cycle: this.queryParam.cycle}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of params) {
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
                this.title.sbb = this.$route.query.sbb;
                this.title.plant = this.$route.query.plant;
                this.title.country = this.$route.query.country;
                this.dataSource = [];
                let parameter = {};
                if (params.sortField) {
                    parameter.sortField = params.sortField;
                }
                if (params.sortOrder) {
                    parameter.sortOrder = params.sortOrder;
                }
                this.queryParam = {};
                this.queryParam.uiName = "ctoCostBom";
                this.queryParam.uiAction = "getCtoCostBomDetail";
                this.queryParam.onClick = "getSbbDetail";
                this.queryParam.cycle = this.$route.query.cycle;
                this.queryParam.model = this.$route.query.model;
                this.queryParam.sbb = this.$route.query.sbb;
                this.queryParam.country = this.$route.query.country;
                this.queryParam.father = this.$route.query.father;
                this.queryParam.plant = this.$route.query.plant;
                this.queryParam.requestId = this.$route.query.requestId;
                let self = this;
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    if (res.code == 0) {
                        for (let i = 0; i < res.result.adderList.length; i++) {
                            res.result.adderList[i].key = i + 1;
                        }
                        for (let i = 0; i < res.result.partList.length; i++) {
                            res.result.partList[i].key = ((i + 1) * 10000) + 1;
                        }
                        self.dataSource1 = res.result.adderList;
                        self.dataSource = res.result.partList;
                    } else {
                        self.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                    self.loading = false;
                    self.searchLoading = false;
                });
            },
            goBack() {
                this.$store.dispatch("ToggleCloseTab", "");
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.replace(`/ctoCostBOM/ctoCostBom_list`);
                }, 500);
            },
            rowClassName(record, index) {
                return record.sbb && (record.sbb == "LEVEL4_ALL_COST" || record.sbb == "LEVEL6_ALL_COST") ? "darkRows" : "noColor";
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.sbbTableTitle_langEn;
                    this.columns1 = langZh.costDetail_langEn;
                } else if (this.language == "en-US") {
                    this.columns = langEn.sbbTableTitle_langEn;
                    this.columns1 = langEn.costDetail_langEn;
                }
            }
        }
    };
</script>
<style>
    .darkRows {
        background-color: #dee5ec !important;
    }

    .noColor {
        background-color: #ffffff !important;
    }

    .title {
        font-weight: bold;
        margin-right: 5px;
    }

    .visitedPart {
        cursor: pointer;
        color: #9f5fc5 !important;
    }
</style>
