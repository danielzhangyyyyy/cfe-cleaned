import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'SBB',
        dataIndex: 'sbb',
        align: 'left',
        width: commonWidth.sbb,
        scopedSlots: { customRender: 'sbb' },
        fixed: 'left'
    },
    {
        title: 'PartDescription',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        fixed: 'left'
    },
    {
        title: 'Lv',
        dataIndex: 'lvl',
        align: 'right',
        width: commonWidth.lvl,
    },
    {
        title: 'Qty',
        dataIndex: 'qtyper',
        align: 'right',
        width: commonWidth.qtyper,
    },
    {
        title: 'AltGrp',
        dataIndex: 'altgrup',
        align: 'left',
        width: commonWidth.altgrup,
    },
    {
        title: 'AltPri',
        dataIndex: 'altpri',
        align: 'right',
        width: commonWidth.altpri,
    },
    {
        title: 'AltPer',
        dataIndex: 'altpercent',
        align: 'right',
        width: commonWidth.altpercent,
    },
    {
        title: 'CostPlant',
        dataIndex: 'costPlant',
        align: 'left',
        width: commonWidth.plant,
        // sorter: true
    },
    {
        title: 'CostName',
        dataIndex: 'costName',
        align: 'left',
        width: commonWidth.costName,
        // sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm1',
        dataIndex: 'lm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm2',
        dataIndex: 'lm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm3',
        dataIndex: 'lm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm4',
        dataIndex: 'lm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm5',
        dataIndex: 'lm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm6',
        dataIndex: 'lm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm7',
        dataIndex: 'lm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm8',
        dataIndex: 'lm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm9',
        dataIndex: 'lm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm10',
        dataIndex: 'lm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm11',
        dataIndex: 'lm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm12',
        dataIndex: 'lm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    }
]

// sbbdetail
const sbbTableTitle_langEn = [
    {
        title: 'Part',
        dataIndex: 'sbb',
        align: 'left',
        // sorter: true,
        width: commonWidth.sbb,
        fixed: 'left',
        scopedSlots: { customRender: 'sbb' },
    },
    {
        title: 'PartDescription',
        dataIndex: 'itemDesc',
        align: 'left',
        fixed: 'left',
        width: commonWidth.itemDesc,
        // sorter: true
    },
    {
        title: 'Lv',
        dataIndex: 'lvl',
        align: 'right',
        width: commonWidth.lvl,
        // sorter: true
    },
    {
        title: 'BOM Quantity',
        dataIndex: 'qtyper',
        align: 'right',
        width: commonWidth.qtyper,
        // sorter: true
    },
    {
        title: 'AltGroup',
        dataIndex: 'altgrup',
        align: 'left',
        width: commonWidth.altgrup,
        // sorter: true
    },
    {
        title: 'AltPri',
        dataIndex: 'altpri',
        align: 'right',
        width: commonWidth.altpri,
        // sorter: true
    },
    {
        title: 'AltPercentage',
        dataIndex: 'altpercent',
        align: 'right',
        width: commonWidth.altpercent,
        // sorter: true
    },
    {
        title: 'CostPlant',
        dataIndex: 'costPlant',
        align: 'left',
        width: commonWidth.plant,
        // sorter: true
    },
    {
        title: 'CostName',
        dataIndex: 'costName',
        align: 'left',
        width: commonWidth.costName,
        // sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm1',
        dataIndex: 'lm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm2',
        dataIndex: 'lm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm3',
        dataIndex: 'lm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm4',
        dataIndex: 'lm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm5',
        dataIndex: 'lm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm6',
        dataIndex: 'lm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm7',
        dataIndex: 'lm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm8',
        dataIndex: 'lm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm9',
        dataIndex: 'lm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm10',
        dataIndex: 'lm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm11',
        dataIndex: 'lm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm12',
        dataIndex: 'lm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
]
let costDetail_langEn = [
    {
        title: 'Cost Name',
        dataIndex: 'sbb',
        align: 'left',
        // sorter: true,
        width: commonWidth.sbb,
        fixed: 'left',
        scopedSlots: { customRender: 'sbb' },
    },
    {
        title: 'Description',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        fixed: 'left',
        // sorter: true
    },
    {
        title: 'Lv',
        dataIndex: 'lvl',
        align: 'right',
        width: commonWidth.lvl,
        // sorter: true
    },
    {
        title: 'BOM Quantity',
        dataIndex: 'qtyper',
        align: 'right',
        width: commonWidth.qtyper,
        // sorter: true
    },
    {
        title: 'AltGroup',
        dataIndex: 'altgrup',
        align: 'left',
        width: commonWidth.altgrup,
        // sorter: true
    },
    {
        title: 'AltPri',
        dataIndex: 'altpri',
        align: 'right',
        width: commonWidth.altpri,
        // sorter: true
    },
    {
        title: 'AltPercentage',
        dataIndex: 'altpercent',
        align: 'right',
        width: commonWidth.altpercent,
        // sorter: true
    },
    {
        title: 'CostPlant',
        dataIndex: 'costPlant',
        align: 'left',
        width: commonWidth.plant,
        // sorter: true
    },

    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,

    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm1',
        dataIndex: 'lm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm2',
        dataIndex: 'lm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm3',
        dataIndex: 'lm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm4',
        dataIndex: 'lm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm5',
        dataIndex: 'lm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm6',
        dataIndex: 'lm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm7',
        dataIndex: 'lm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm8',
        dataIndex: 'lm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm9',
        dataIndex: 'lm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm10',
        dataIndex: 'lm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm11',
        dataIndex: 'lm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'lm12',
        dataIndex: 'lm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
]

let filter_langEn = [
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

let costTape_langEn = [
    {
        title: 'Cost Elem',
        dataIndex: 'costElem',
        align: 'left',
        // sorter: true,
        width: commonWidth.costElem
    },
    {
        title: 'Base Currency',
        dataIndex: 'baseCurrency',
        align: 'left',
        width: commonWidth.baseCurrency,
        // sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        // sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    },

]



export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn,
    sbbTableTitle_langEn,
    costDetail_langEn,
    costTape_langEn
}
