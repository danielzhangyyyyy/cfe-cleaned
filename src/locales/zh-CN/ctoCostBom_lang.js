// list页面表头
const tableTitle_langZh = [
    {
        title: 'SBB',
        dataIndex: 'sbb',
        align: 'left',
        sorter: true,
        fixed: 'left',
        scopedSlots: { customRender: 'sbb' },
    },
    {
        title: 'PartDescription',
        dataIndex: 'itemDesc',
        align: 'left',
        fixed: 'left',
        sorter: true
    },
    {
        title: 'Lv',
        dataIndex: 'lvl',
        align: 'right',
        fixed: 'left',
        sorter: true
    },
    {
        title: 'BOM Quantity',
        dataIndex: 'qtyper',
        align: 'right',
        fixed: 'left',
        sorter: true
    },
    {
        title: 'AltGroup',
        dataIndex: 'altgrup',
        align: 'left',
        fixed: 'left',
        sorter: true
    },
    {
        title: 'AltPri',
        dataIndex: 'altpri',
        align: 'left',
        sorter: true
    },
    {
        title: 'AltPercentage',
        dataIndex: 'altpercent',
        align: 'left',
        sorter: true
    },
    {
        title: 'costPlant',
        dataIndex: 'costPlant',
        align: 'left',
        sorter: true
    },
    {
        title: 'costName',
        dataIndex: 'costName',
        align: 'left',
        sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm1',
        dataIndex: 'lm1',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm2',
        dataIndex: 'lm2',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm3',
        dataIndex: 'lm3',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm4',
        dataIndex: 'lm4',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm5',
        dataIndex: 'lm5',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm6',
        dataIndex: 'lm6',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm7',
        dataIndex: 'lm7',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm8',
        dataIndex: 'lm8',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm9',
        dataIndex: 'lm9',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm10',
        dataIndex: 'lm10',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm11',
        dataIndex: 'lm11',
        align: 'right',
        sorter: true
    },
    {
        title: 'lm12',
        dataIndex: 'lm12',
        align: 'right',
        sorter: true
    }
]
let filter_langZh = [
    {
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Assembly',
        decorator: 'assembly',
        required: true,
        allowClear: true,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'autoComplete',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Product Family',
        decorator: 'aspPrdFamily',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Country/Region',
        decorator: 'country',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
]
let detail_langZh = []
let costTape_langZh = []



export default {
    tableTitle_langZh,
    filter_langZh,
    detail_langZh,
    costTape_langZh
}