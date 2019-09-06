import {
    axios
} from '@/utils/request'

const api = {
    salesOrderAdd: '/order/salesOrder/add', //新增
    exportExcel: '/order/salesOrder/exportExcel', //下载批量导入模板
    findBySn: '/order/salesOrder/findBySn', //根据SN获取销售订单
    findDetailsBySn: '/order/salesOrder/findDetailsBySn', //根据SN获取销售主订单及子订单
    importSalesOrder: '/order/salesOrder/importSalesOrder', //导入销售订单
    salesOrderList: '/order/salesOrder/list', //获取列表
    salesOrderShow: '/order/salesOrder/show', //根据ID获取销售订单
    salesOrderupdate: '/order/salesOrder/update', //update

}

export default api


export function salesOrderAdd(parameter) { //新增
    return axios({
        url: api.salesOrderAdd,
        method: 'post',
        params: parameter,
    })
}
export function exportExcel(parameter) { //下载批量导入模板
    return axios({
        url: api.exportExcel,
        method: 'get',
        params: parameter,
    })
}

export function findBySn(parameter) { //根据SN获取销售订单
    return axios({
        url: api.findBySn,
        method: 'get',
        params: parameter,
    })
}

export function findDetailsBySn(parameter) { //根据SN获取销售订单
    return axios({
        url: api.findDetailsBySn,
        method: 'get',
        params: parameter,
    })
}

export function importSalesOrder(parameter) { //导入销售订单
    return axios({
        url: api.importSalesOrder,
        method: 'post',
        params: parameter,
    })
}

export function salesOrderList(parameter) { //获取列表
    return axios({
        url: api.salesOrderList,
        method: 'get',
        params: parameter,
    })
}
export function salesOrderShow(parameter) { //根据ID获取销售订单
    return axios({
        url: api.salesOrderShow,
        method: 'get',
        params: parameter,
    })
}
export function salesOrderupdate(parameter) { //update
    return axios({
        url: api.salesOrderupdate,
        method: 'put',
        params: parameter,
    })
}