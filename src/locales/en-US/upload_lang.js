// list页面表头
const tableTitle_langEn = [
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Template Name',
        dataIndex: 'templateName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Success Rows',
        dataIndex: 'successRows',
        align: 'center',
        width: 100,
        sorter: true,
        scopedSlots: { customRender: 'successRows' },
    },
    {
        title: 'Fail Rows',
        dataIndex: 'failRows',
        align: 'center',
        width: 100,
        sorter: true,
        scopedSlots: { customRender: 'failRows' },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Message',
        dataIndex: 'errorMessage',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Upload ID',
        dataIndex: 'uploadId',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Upload File Name',
        dataIndex: 'uploadFilename',
        align: 'left',
        width: 300,
        sorter: true,
    },
    // {
    //     title: 'Server File Path',
    //     dataIndex: 'ftpFilepath',
    //     align: 'left',
    //     width: 200,
    //     sorter: true,
    // },
    {
        title: 'Upload User',
        dataIndex: 'uploadUser',
        align: 'left',
        width: 100,
        sorter: true
    },

]

let filter_langEn = [{
    index: 0,
    label: 'Upload Template',
    decorator: 'templateName',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'input',
    text: '',
    dropDownList: [],
    editDisabled: true,
},
{
    index: 1,
    label: 'Status',
    decorator: 'status',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: '',
    editDisabled: false,
},
{
    index: 2,
    label: 'Upload Date From',
    decorator: 'uploadDateStart',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'date',
    dropDownList: [],
    text: '',
    editDisabled: false,
},
{
    index: 3,
    label: 'Upload Date to',
    decorator: 'uploadDateEnd',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'date',
    dropDownList: [],
    text: '',
    editDisabled: false,
}]

export default {
    tableTitle_langEn,
    filter_langEn
}
