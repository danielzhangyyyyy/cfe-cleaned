import Vue from 'vue'
let echarts = require('echarts/lib/echarts')

// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

Vue.prototype.$echarts = echarts