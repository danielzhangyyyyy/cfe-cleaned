<template>
    <a-card :bordered="false" class="content">
        <a-alert style="margin-bottom: 16px;padding: 15px;">
            <template slot="message">
                <span>
                    <span class="title">Cost Tape For Part: &nbsp;</span>{{part}}&nbsp;&nbsp;
                    <span class="title">Plant: &nbsp;</span>{{plant}}
                </span>
                <!--<a-button-->
                        <!--type="primary"-->
                        <!--icon="rollback"-->
                        <!--@click="goBack"-->
                        <!--:style="{'float': 'right', 'bottom': '6px'}"-->
                <!--&gt;Return-->
                <!--</a-button>-->
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
        ></a-table>
    </a-card>
</template>

<script>
    import {STable} from "@/components";
    import {detail, getDropDownList, list} from "@api/ctoCostBom_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/ctoCostBom_lang.js";
    import langEn from "../../locales/en-US/ctoCostBom_lang.js";

    export default {
        name: "TableList",
        components: {
            STable
        },
        data() {
            return {
                form: this.$form.createForm(this),
                dataSource: [],
                loading: false, // 页面是否加载中
                queryParam: {}, // 查询参数
                columns: [], // 表头
                pagination: {showSizeChanger: true, hideOnSinglePage: true},
                part: '',
                plant: '',
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
            this.scrollSize.x = getXScrollSize(this.columns,0);
            this.loadData({});
            this.getMonths();
        },
        watch: {
            language() {
                this.changeLanguage();
            },
            '$route': {
                handler(route) {
                    if (route.path === "/ctoCostBom/ctoCostBom_costTape") this.loadData({});
                },
                deep: true
            }
        },
        methods: {
            getMonths() {
                getDropDownList({moduleName: "getMonthListByCycle", cycle: this.queryParam.cycle}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns) {
                            if (
                                item.dataIndex &&
                                item.dataIndex.toUpperCase() === key.toUpperCase()
                            ) {
                                item.title = res.result[0][key];
                            }
                        }
                    }
                });
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;
                this.loadData({
                    /*   pageSize: pagination.pageSize,
                    pageNum: pagination.current, */
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            loadData(params) {
                const self = this;
                this.loading = true;
                this.searchLoading = true;
                this.part = "";
                this.plant = "";
                this.dataSource = [];
                let parameter = {
                    /*  pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10 */
                };
                if (params.sortField) parameter.sortField = params.sortField;
                if (params.sortOrder) parameter.sortOrder = params.sortOrder;
                this.part = self.$route.query.partNumber
                this.plant = self.$route.query.mfgPlant;
                this.queryParam.uiName = "ctoCostBom";
                this.queryParam.uiAction = "getCostTape";
                this.queryParam.cycle = this.$route.query.cycle;
                this.queryParam.partNumber = this.$route.query.partNumber;
                this.queryParam.plant = this.$route.query.mfgPlant;
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    for (let i = 0; i < res.result.data.length; i++) res.result.data[i].key = i + 1;
                    self.dataSource = res.result.data;
                    self.loading = false;
                    self.searchLoading = false;
                });
            },
            goBack() {
                this.$store.dispatch("ToggleCloseTab", "");
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.replace(`/ctoCostBom/ctoCostBom_detail`);
                }, 500);
            },
            rowClassName(record, index) {
                return record.costElem == "BOME" || record.costElem == "BOML" ? "yellowRows" : "noColor";
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.costTape_langEn;
                } else if (this.language == "en-US") {
                    this.columns = langEn.costTape_langEn;
                }
                // this.scroll.x = 0;
                // this.columns.forEach(el => {
                //     if (el.width != undefined) {
                //         this.scroll.x += el.width;
                //     }
                // });
            }
        }
    };
</script>
<style>
    .yellowRows {
        background-color: #faad14 !important;
    }

    .title {
        font-weight: bold;
        margin-right: 5px;
    }

    .noColor {
        background-color: #ffffff !important;
    }
</style>
