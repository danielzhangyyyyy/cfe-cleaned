import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Item',
        dataIndex: 'item',
        fixed: 'left',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Item Desc',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        sorter: true
    },
    {
        title: 'Item Type',
        dataIndex: 'itemType',
        align: 'left',
        width: commonWidth.itemType,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'aspPrdFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Machine Type',
        dataIndex: 'machineType',
        align: 'left',
        width: commonWidth.machineType,
        sorter: true
    },
    {
        title: 'Prod Hierarchy',
        dataIndex: 'prodH',
        align: 'left',
        width: commonWidth.prodH,
        sorter: true
    },
    {
        title: 'EOL Status',
        dataIndex: 'eolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
        sorter: true
    },
    {
        title: 'User EOL Status',
        dataIndex: 'userEolStatus',
        align: 'left',
        width: commonWidth.eolStatusLong,
        sorter: true
    },
    {
        title: 'GM EOL Status',
        dataIndex: 'gmEolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
        sorter: true
    },
    {
        title: 'SYS EOL Status',
        dataIndex: 'sysEolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
        sorter: true
    },
    {
        title: 'Family EOL Status',
        dataIndex: 'familyEolStatus',
        align: 'left',
        width: commonWidth.eolStatusLong,
        sorter: true
    },
    {
        title: 'MT EOL Status',
        dataIndex: 'mtEolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
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
    }
];

//edit页面
const editAndDetail_langEn = [
    {
        label: 'item',
        decorator: 'item',
        required: true,
        message: 'Please input item',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'itemDesc',
        decorator: 'itemDesc',
        required: false,
        message: 'Please input itemDesc',
        editDisabled: true,
        inputType: 'input'
    },
    {
        label: 'itemType',
        decorator: 'itemType',
        required: true,
        message: 'Please input itemType',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: false,
        message: 'Please input brand',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'aspPrdFamily',
        decorator: 'aspPrdFamily',
        required: false,
        message: 'Please input aspPrdFamily',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'machineType',
        decorator: 'machineType',
        required: false,
        message: 'Please input machineType',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'prodH',
        decorator: 'prodH',
        required: false,
        message: 'Please input prodH',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'eolStatus',
        decorator: 'eolStatus',
        required: true,
        message: 'Please input eolStatus',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'userEolStatus',
        decorator: 'userEolStatus',
        required: false,
        message: 'Please input userEolStatus',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'gmEolStatus',
        decorator: 'gmEolStatus',
        required: false,
        message: 'Please input gmEolStatus',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'sysEolStatus',
        decorator: 'sysEolStatus',
        required: false,
        message: 'Please input sysEolStatus',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'familyEolStatus',
        decorator: 'familyEolStatus',
        required: false,
        message: 'Please input familyEolStatus',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'mtEolStatus',
        decorator: 'mtEolStatus',
        required: false,
        message: 'Please input mtEolStatus',
        editDisabled: true,
        inputType: 'input',
        text: ''
    }
]

let filter_langEn = [{
    index: 0,
    label: 'Item',
    decorator: 'item',
    required: true,
    allowClear: true,
    message: 'Please input item',
    placeHolder: 'Please input',
    inputType: 'input',
    text: ''
},
{
    index: 1,
    label: 'Item Type',
    decorator: 'itemType',
    required: false,
    allowClear: true,
    message: 'Please select item type',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 2,
    label: 'Brand Type',
    decorator: 'brand',
    required: true,
    allowClear: true,
    message: 'Please select brand type',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 3,
    label: 'Product Family',
    decorator: 'aspPrdFamily',
    required: true,
    allowClear: true,
    message: 'Please select product family',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 4,
    label: 'EOL Status',
    decorator: 'eolStatus',
    required: false,
    allowClear: true,
    message: 'Please select EOL status',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 5,
    label: 'Last Modified Date Start',
    decorator: 'sysLastModifiedDateStart',
    required: true,
    allowClear: true,
    message: 'Please select Last Modified Date Start',
    placeHolder: 'Please select',
    inputType: 'date',
    text: ''
},
{
    index: 6,
    label: 'Last Modified Date End',
    decorator: 'sysLastModifiedDateEnd',
    required: true,
    allowClear: true,
    message: 'Please select Last Modified Date End',
    placeHolder: 'Please select',
    inputType: 'date',
    text: ''
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}