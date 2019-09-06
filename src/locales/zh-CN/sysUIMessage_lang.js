// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'MSG_FROM',
        dataIndex: 'msgFrom',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MSG_TO',
        dataIndex: 'msgTo',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MSG_TYPE',
        dataIndex: 'msgType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MSG_CONTENT',
        dataIndex: 'msgContent',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'CREATED_TIME',
        dataIndex: 'createdTime',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'READ_MARK',
        dataIndex: 'readMark',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'EXPORT_ID',
        dataIndex: 'exportId',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'MSG_FROM',
        decorator: 'msgFrom',
        required: true,
        message: '请输入MSG_FROM'
    },
    {
        label: 'MSG_TO',
        decorator: 'msgTo',
        required: true,
        message: '请输入MSG_TO'
    },
    {
        label: 'MSG_TYPE',
        decorator: 'msgType',
        required: true,
        message: '请输入MSG_TYPE'
    },
    {
        label: 'MSG_CONTENT',
        decorator: 'msgContent',
        required: true,
        message: '请输入MSG_CONTENT'
    },
    {
        label: 'CREATED_TIME',
        decorator: 'createdTime',
        required: true,
        message: '请输入CREATED_TIME'
    },
    {
        label: 'READ_MARK',
        decorator: 'readMark',
        required: true,
        message: '请输入READ_MARK'
    },
    {
        label: 'EXPORT_ID',
        decorator: 'exportId',
        required: true,
        message: '请输入EXPORT_ID'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}