import T from 'ant-design-vue/es/table/Table'
import get from 'lodash.get'

export default {
  data() {
    return {
      havaselected: '',
      havaselectedZh: '已选择',
      havaselectedEn: 'Selected',
      clearbutton: '',
      clearbuttonZh: '清空',
      clearbuttonEn: 'Clear',

      needTotalList: [],

      selectedRows: [],
      selectedRowKeys: [],

      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    /**
     * {
     *   show: true,
     *   clear: Function
     * }
     */
    alert: {
      type: [Object, Boolean],
      default: null
    },
    rowSelection: {
      type: Object,
      default: null
    },
    /** @Deprecated */
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    }
  }),
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    'localPagination.current'(val) {
      this.$router.push({
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, {
          pageNo: val
        })
      })
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    },
    language(val) {
      this.changeLanguage()
    }
  },
  created() {
    console.log(this.language)
    this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
      current: this.pageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger,
      showTotal: total => total == 1 ? `total ${total} row` : `total ${total} rows`,
      pageSizeOptions: ['10', '50', '100', '150']
    })
    console.log("total", this.localPagination.showTotal);
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
    this.changeLanguage()
  },
  methods: {
    changeLanguage() {
      if (this.language == 'zh-CN') {
        this.havaselected = this.havaselectedZh
        this.clearbutton = this.clearbuttonZh
      } else if (this.language == 'en-US') {
        this.havaselected = this.havaselectedEn
        this.clearbutton = this.clearbuttonEn
      }
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, pageSize: this.localPagination.pageSize || this.pageSize
      }))
      this.clearSelected()
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      this.localLoading = true
      const parameter = Object.assign({
        pageNum: (pagination && pagination.current) ||
          this.localPagination.current || this.pageNum,
        pageSize: (pagination && pagination.pageSize) ||
          this.localPagination.pageSize || this.pageSize
      },
        (sorter && sorter.field && {
          sortField: sorter.field
        }) || {},
        (sorter && sorter.order && {
          sortOrder: (sorter.order === 'descend') ? 'desc' : ''
        }) || {}, {
          ...filters
        }
      )
      this.localPagination.pageSize = parameter.pageSize; //用户点击search后， 保持pageSize与上次搜索一致
      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = Object.assign({}, this.localPagination, {
            current: r.pageNum, // 返回结果中的当前分页数
            total: r.total, // 返回结果中的总记录数
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) ||
              this.localPagination.pageSize
          })

          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.list.length === 0 && this.localPagination.current > 1) {
            this.localPagination.current--
            this.loadData()
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 或 this.showPagination = false
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          // (!this.showPagination || !r.total && this.showPagination === 'auto') && (this.localPagination.hideOnSinglePage = true)
          this.localDataSource = r.list // 返回结果中的数组数据
          this.localLoading = false
        })
      }
      if (document.getElementsByClassName("ant-table-body")[0]) {
        //滚动条置顶
        document.getElementsByClassName("ant-table-body")[0].scrollTop = 0;
        //滚动条置左
        document.getElementsByClassName("ant-table-body")[0].scrollLeft = 0;
      }
    },
    initTotalList(columns) {
      const totalList = []
      columns && columns instanceof Array && columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({
            ...column,
            total: 0
          })
        }
      })
      return totalList
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
      const list = this.needTotalList
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(get(val, item.dataIndex))
            return isNaN(total) ? 0 : total
          }, 0)
        }
      })
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.rowSelection) {
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear(callback) {
      if (this.selectedRowKeys.length <= 0) return null
      return (
        <a style="margin-left: 24px" onClick={() => {
          callback()
          this.clearSelected()
        }}>{this.clearbutton}</a>
      )
    },
    renderAlert() {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item) => {
        return (<span style="margin-right: 12px">
          {item.title}总计 <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
        </span>)
      })

      // 绘制 清空 按钮
      const clearItem = (typeof this.alert.clear === 'boolean' && this.alert.clear) ? (
        this.renderClear(this.clearSelected)
      ) : (this.alert !== null && typeof this.alert.clear === 'function') ? (
        this.renderClear(this.alert.clear)
      ) : null

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">{this.havaselected}: <a style="font-weight: 600">{this.selectedRows.length}</a></span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      )
    }
  },

  render() {
    const props = {}
    const localKeys = Object.keys(this.$data)
    const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert

    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      if (k === 'rowSelection') {
        if (showAlert && this.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          props[k] = {
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows)
            }
          }
          return props[k]
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null
          return props[k]
        }
      }
      props[k] = this[k]
      // 删除勾选固定
      if (k === 'columns' && props[k][0]['fixed'] == 'left' && props[k][0]['title'] == undefined) {
        props[k].splice(0, 1)
      }
      if (k === 'scroll') {
        props[k] ? props[k].y = 450 : props[k] = { y: 450 };
        /* if (props.dataSource.length > 10) {
          props[k] ? props[k].y = 450 : props[k] = { y: 450 };
        } else if (props.dataSource.length <= 10 && props[k] != undefined) {
          props[k].y ? delete props[k].y : '';
        } */

        // 动态计算scroll.x的值
        /* if (props['columns'].length > 0 && typeof props['columns'][1]['width'] != 'string' && props[k].x) {
          props[k].x = props['columns'].reduce((ac, next) => ac + next['width'], props[k].x)
        } */
      }
      return props[k]
    })
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
        {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
      </a-table>
    )

    return (
      <div class="table-wrapper">
        {showAlert ? this.renderAlert() : null}
        {table}
      </div>
    )
  }
}
