// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'Primary Key',
        dataIndex: 'pk',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Related to USER_PROFILE.LOGIN_NAME',
        dataIndex: 'userLoginName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COMMODITY',
        dataIndex: 'commodity',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'The value of this column is &#39;CREATE&#39;',
        dataIndex: 'operationType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'OPERATION_TIME',
        dataIndex: 'operationTime',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Related to USER_PROFILE.LOGIN_NAME',
        dataIndex: 'operatorLoginName',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'Primary Key',
        decorator: 'pk',
        required: true,
        message: '请输入Primary Key'
    },
    {
        label: 'Related to USER_PROFILE.LOGIN_NAME',
        decorator: 'userLoginName',
        required: true,
        message: '请输入Related to USER_PROFILE.LOGIN_NAME'
    },
    {
        label: 'COMMODITY',
        decorator: 'commodity',
        required: true,
        message: '请输入COMMODITY'
    },
    {
        label: 'The value of this column is &#39;CREATE&#39;',
        decorator: 'operationType',
        required: true,
        message: '请输入The value of this column is &#39;CREATE&#39;'
    },
    {
        label: 'OPERATION_TIME',
        decorator: 'operationTime',
        required: true,
        message: '请输入OPERATION_TIME'
    },
    {
        label: 'Related to USER_PROFILE.LOGIN_NAME',
        decorator: 'operatorLoginName',
        required: true,
        message: '请输入Related to USER_PROFILE.LOGIN_NAME'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}