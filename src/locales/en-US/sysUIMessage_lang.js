import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'operation' },
    },
    
    // {
    //     title: 'msgTo',
    //     dataIndex: 'msgTo',
    //     align: 'left',
    //     width: '12.5%',
    //     sorter: true,
    //     scopedSlots: { customRender: 'every' },
    // },
    {
        title: 'Type',
        dataIndex: 'msgType',
        align: 'left',
        width: 80,
        sorter: true,
        scopedSlots: { customRender: 'every' },
    },
    {
        title: 'Message Content',
        dataIndex: 'msgContent',
        align: 'left',
        width: 420,
        sorter: true,
        scopedSlots: { customRender: 'every' },
    },
    {
        title: 'Created Time',
        dataIndex: 'createdTime',
        align: 'left',
        width: 160,
        sorter: true,
        scopedSlots: { customRender: 'every' },
    },
    // {
    //     title: 'exportId',
    //     dataIndex: 'exportId',
    //     align: 'left',
    //     width: '20%',
    //     sorter: true,
    //     scopedSlots: { customRender: 'exportId' },
    // },
    {
        title: 'is Read',
        dataIndex: 'readMark',
        align: 'left',
        width: 90,
        sorter: true,
        scopedSlots: { customRender: 'readMark' },
    },
    {
        title: 'From',
        dataIndex: 'msgFrom',
        align: 'left',
        width: 80,
        sorter: true,
        scopedSlots: { customRender: 'every' },
    },
    
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'msgFrom',
        decorator: 'msgFrom',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input msgFrom'
    },
    {
        label: 'msgTo',
        decorator: 'msgTo',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input msgTo'
    },
    {
        label: 'msgType',
        decorator: 'msgType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input msgType'
    },
    {
        label: 'msgContent',
        decorator: 'msgContent',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input msgContent'
    },
    {
        label: 'createdTime',
        decorator: 'createdTime',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input createdTime'
    },
    {
        label: 'readMark',
        decorator: 'readMark',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input readMark'
    },
    {
        label: 'exportId',
        decorator: 'exportId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input exportId'
    },
]

let filter_langEn = [
    {
        index: 1,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
