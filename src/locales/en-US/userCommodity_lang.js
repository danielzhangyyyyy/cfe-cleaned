import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Commodities',
        dataIndex: 'commodity',
        align: 'left',
        width: commonWidth.commodity,
        sorter: true
    },
    {
        title: 'User',
        dataIndex: 'userLoginName',
        align: 'left',
        width: commonWidth.userLoginName,
        sorter: true
    },
    {
        title: 'Operator',
        dataIndex: 'operatorLoginName',
        align: 'left',
        width: commonWidth.operatorLoginName,
        sorter: true
    },
    {
        title: 'Operation Time',
        dataIndex: 'operationTime',
        align: 'left',
        width: commonWidth.operationTime,
        sorter: true
    },
   /*  {
        title: 'pk',
        dataIndex: 'pk',
        align: 'left',
        width: 300,
        sorter: true
    },
    
    {
        title: 'operationType',
        dataIndex: 'operationType',
        align: 'left',
        width: 300,
        sorter: true
    }*/
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'pk',
        decorator: 'pk',
        required: true,
        message: 'Please input pk'
    },
    {
        label: 'userLoginName',
        decorator: 'userLoginName',
        required: true,
        message: 'Please input userLoginName'
    },
    {
        label: 'commodity',
        decorator: 'commodity',
        required: true,
        message: 'Please input commodity'
    },
    {
        label: 'operationType',
        decorator: 'operationType',
        required: true,
        message: 'Please input operationType'
    },
    {
        label: 'operationTime',
        decorator: 'operationTime',
        required: true,
        message: 'Please input operationTime'
    },
    {
        label: 'operatorLoginName',
        decorator: 'operatorLoginName',
        required: true,
        message: 'Please input operatorLoginName'
    },
]

let filter_langEn = [{
    index: 0,
    label: 'Group',
    decorator: 'group',
    required: true,
    allowClear: true,
    message: 'Please select group',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
},
{
    index: 1,
    label: 'User',
    decorator: 'userLoginName',
    required: true,
    allowClear: true,
    message: 'Please select user',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}