<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="6">消费能力分析</el-col>
                <el-col :span="18" class="lableText">
                    付款时间：<el-date-picker
                        v-model="dateTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        format="yyyy/M/d HH:mm"
                        @change="getDate(dateTime)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    新老客户:
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
            <el-col :span="24">
                <el-row class="chartsTitle">
                    支付金额分布图
                </el-row>
                <el-row class="radioS">
                    <el-col :span="2" class="labeltitle">客户指标</el-col>
                    <el-col :span="12">
                         <el-radio-group v-model="radio">
                            <el-radio :label="1">客户数</el-radio>
                            <el-radio :label="2">支付总额</el-radio>
                            <el-radio :label="3">客户支付件数</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <div id="chartBar" style="width:100%;height:80vh"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { inquirecity } from '../../api/index'
    export default {
        data() {
            return {
                chartBar: null,
                dateTime: '',
                radio:1,
                params:{
                    mobile: '',
                    startTime:'',
                    endTime:''
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                ylable:[
                    '1-10',
                    '10-15',
                    '15-25',
                    '25-40',
                    '40-70',
                    '70-100',
                    '100-150',
                    '150-200',
                    '200-300',
                    '300-500',
                    '500-700',
                    '700-1000',
                    '1000-1500',
                    '1500-2000',
                    '2000-3000',
                    '3000-4000',
                    '4000-5000',
                    '5000-6000',
                    '6000以上',

                ],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
            this.params.mobile = userInfo.mobile
        },
        methods: {
            getDate(getDate){
                this.params.startTime = this.$moment(getDate[0]).format('YYYY/M/D HH:mm')
                this.params.endTime = this.$moment(getDate[1]).format('YYYY/M/D HH:mm')
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {           // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                        
                    },
                    color: [
                        '#1aa1ff',
                        '#31c17b',
                    ],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show: true,
                        splitLine:{
                            show: true
                        },
                        axisLabel:{
                            show: false
                        },
                        axisLine:{
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: this.ylable
                    },
                    series: [
                        {
                            name: '新用户',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '老用户',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
                }
                this.chartBar.setOption(option);
            }
        },
        mounted() {
            this.drawBarChart()
        }
    }
</script>

<style scoped lang="scss">
    .chart-container {
        width: 100%;
        float: left;
    }
    #chartBar{
        height: auto;
    }
    .title{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        padding: 0;
        font-weight: bold;
        background: #f2f2f2;
        padding: 0 30px;
        .lableText{
            text-align: right;
            font-weight:normal;
            font-size: 14px;  
        }
    }
    .chartsTitle{
        font-size: 16px;
        padding: 10px 30px;
    }
    .radioS{
        font-size: 14px;
        padding: 10px 30px;

    }
</style>
