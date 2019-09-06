// list页面表头
const tableTitle_langZh = []

// categoryReports
const categoryReports_langZh = [
    {
        index: 0,
        label: 'Category',
        decorator: 'category',
        required: true,
        allowClear: true,
        message: 'Please select category',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        index: 1,
        label: 'Report',
        decorator: 'report',
        required: true,
        allowClear: true,
        message: 'Please select report',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
];

let filter_langZh = []
export default {
    tableTitle_langZh,
    categoryReports_langZh,
    filter_langZh
}
