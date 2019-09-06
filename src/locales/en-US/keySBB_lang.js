import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Basic Name',
        dataIndex: 'basicName',
        align: 'left',
        width: commonWidth.basicName,
        sorter: true
    },
    {
        title: 'Commodity',
        dataIndex: 'commodity',
        align: 'left',
        width: commonWidth.commodity,
        sorter: true
    },
    {
        title: 'Max Range',
        dataIndex: 'maxRange',
        align: 'right',
        width: commonWidth.maxRange,
        sorter: true
    },
    {
        title: 'Min Range',
        dataIndex: 'minRange',
        align: 'right',
        width: commonWidth.minRange,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Please input Brand',
        editDisabled: true,
        addDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        allowClear: true,
        text: ''
    },
    {
        label: 'Basic Name',
        decorator: 'basicName',
        required: true,
        message: 'Please input BasicName',
        editDisabled: true,
        addDisabled: false,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'Commodity',
        decorator: 'commodity',
        required: false,
        message: 'Please input Commodity',
        editDisabled: true,
        addDisabled: false,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'Max Range',
        decorator: 'maxRange',
        required: true,
        addDisabled: false,
        message: 'Please input MaxRange',
        editDisabled: false,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'MinRange',
        decorator: 'minRange',
        required: true,
        addDisabled: false,
        message: 'Please input MinRange',
        editDisabled: false,
        inputType: 'input',
        allowClear: true,
        text: ''
    }
]

let filter_langEn = [{
    index: 0,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select brand',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}, {
    index: 1,
    label: 'Basic Name',
    decorator: 'basicName',
    required: false,
    allowClear: true,
    message: 'Please select basic name',
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
