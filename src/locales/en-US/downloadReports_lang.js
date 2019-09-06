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
        width: 90,
        scopedSlots: { customRender: 'operation' },
    },
    {
        title: 'Name',
        dataIndex: 'exportFilename',
        align: 'left',
        width: 350,
        sorter: true,
    },
    {
        title: 'User',
        dataIndex: 'userId',
        align: 'left',
        width: 100,
        sorter: true,
    },
    {
        title: 'Export Time',
        dataIndex: 'startTime',
        align: 'left',
        width: 160,
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 80,
        sorter: true,
    },
    {
        title: 'Size',
        dataIndex: 'sizeKb',
        align: 'right',
        width: 100,
        sorter: true,
    },
     
]

export default {
    deltaSize,
    tableTitle_langEn,
}
