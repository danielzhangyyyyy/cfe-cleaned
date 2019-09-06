// list页面表头
const tableTitle_langEn = [
    {
        title: 'Month',
        dataIndex: 'month',
        align: 'left',
        sorter: false,
        width: 100,
        fixed: 'left'
    },
    {
        title: 'Week 1',
        align: 'left',
        width: 450,
        children: [
            {
                title: 'B1 Model List Fix',
                dataIndex: 'wk1Fixmodellist',
                align: 'left',
                sorter: false
            },
            {
                title: 'B1 Bake&Publish',
                dataIndex: 'wk1Bakenpublish',
                align: 'left',
                sorter: false
            },
            {
                title: 'B1 Write Back',
                dataIndex: 'wk1Writeback',
                align: 'left',
                sorter: false
            },
        ]
    },
    {
        title: 'Week 2',
        align: 'left',
        width: 450,
        children: [{
            title: 'B2 Model List Fix',
            dataIndex: 'wk2Fixmodellist',
            align: 'left',
            sorter: false
        },
        {
            title: 'B2 Bake&Publish',
            dataIndex: 'wk2Bakenpublish',
            align: 'left',
            sorter: false
        },
        {
            title: 'B2 Write Back',
            dataIndex: 'wk2Writeback',
            align: 'left',
            sorter: false
        },]
    },
    {
        title: 'Week 3',
        align: 'left',
        width: 450,
        children: [{
            title: 'B3 Model List Fix',
            dataIndex: 'wk3Fixmodellist',
            align: 'left',
            sorter: false
        },
        {
            title: 'B3 Bake&Publish',
            dataIndex: 'wk3Bakenpublish',
            align: 'left',
            sorter: false
        },
        {
            title: 'B3 Write Back',
            dataIndex: 'wk3Writeback',
            align: 'left',
            sorter: false
        },]
    },
    {
        title: 'Week 4',
        align: 'left',
        width: 450,
        children: [{
            title: 'B4 Model List Fix',
            dataIndex: 'wk4Fixmodellist',
            align: 'left',
            sorter: false
        },
        {
            title: 'B4 Bake&Publish',
            dataIndex: 'wk4Bakenpublish',
            align: 'left',
            sorter: false
        },
        {
            title: 'B4 Write Back',
            dataIndex: 'wk4Writeback',
            align: 'left',
            sorter: false
        }]
    }
]

export default {
    tableTitle_langEn
}
