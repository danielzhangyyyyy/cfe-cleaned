// list页面表头
const tableTitle_langEn = []

// categoryReports
const categoryReports_langEn = [
    {
        index: 0,
        label: 'Category',
        decorator: 'category',
        required: true,
        allowClear: true,
        message: 'Please select Category',
        placeHolder: 'Category',
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
        message: 'Please select Report',
        placeHolder: 'Report',
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
];

let filter_langEn = []
export default {
    tableTitle_langEn,
    categoryReports_langEn,
    filter_langEn
}
