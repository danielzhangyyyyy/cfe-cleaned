// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'Name',
        dataIndex: 'exportFilename',
        align: 'left',
        width: '18%',
        sorter: true,
    },
    {
        title: 'User',
        dataIndex: 'userId',
        align: 'left',
        width: '18%',
        sorter: true,
    },
    {
        title: 'Export Time',
        dataIndex: 'startTime',
        align: 'left',
        width: '18%',
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: '15%',
        sorter: true,
    },
    {
        title: 'Size',
        dataIndex: 'fileSize',
        align: 'left',
        width: '15%',
        sorter: true,
    },
     {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'center',
        width: '16%',
        scopedSlots: { customRender: 'operation' },
    }
]

export default {
    tableTitle_langZh,
}
