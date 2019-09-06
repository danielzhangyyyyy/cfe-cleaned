import {
    axios
} from '@/utils/request'

const api = {
    purchaseOrderAdd: '/purchase/purchaseOrder/add', //新增
    purchaseOrderDel: '/purchase/purchaseOrder/delete', //根据采购订单ID数组逻辑删除
    purchaseOrderList: '/purchase/purchaseOrder/list', //获取采购订单列表
    purchaseOrderShow: '/purchase/purchaseOrder/show', //根据采购订单ID获取订单
    purchaseOrderUpdate: '/purchase/purchaseOrder/update', //更新采购订单
}

export default api


export function purchaseOrderAdd(parameter) { //新增
    return axios({
        url: api.purchaseOrderAdd,
        method: 'post',
        params: parameter,
    })
}
export function purchaseOrderDel(parameter) { //根据采购订单ID数组逻辑删除
    return axios({
        url: api.purchaseOrderDel,
        method: 'DELETE',
        params: parameter,
    })
}

export function purchaseOrderList(parameter) { //获取采购订单列表
    return axios({
        url: api.purchaseOrderList,
        method: 'get',
        params: parameter,
    })
}

export function purchaseOrderShow(parameter) { //根据采购订单ID获取订单
    return axios({
        url: api.purchaseOrderShow,
        method: 'get',
        params: parameter,
    })
}

export function purchaseOrderUpdate(parameter) { //更新采购订单
    return axios({
        url: api.purchaseOrderUpdate,
        method: 'put',
        params: parameter,
    })
}