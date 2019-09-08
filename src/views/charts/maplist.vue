<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="12">地域分布</el-col>
                <el-col :span="12" class="queryDate">
                    <el-date-picker
                        v-model="dateTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        format="yyyy/M/d HH:mm"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    <el-button type="primary" @click="queryData()">查询</el-button>
                </el-col>
            </el-row>
            <el-col :span="8">
                <div id="chartBar" style="width:100%;height:400px"></div>
            </el-col>
            <el-col :span="16">
                <el-table
                    :data="tableData"
                    height="80vh"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="city"
                    label="城市"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="数量"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="total"
                    label="总金额">
                    </el-table-column>
                </el-table>
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
                provinceList:[],
                pages: [],
                cityS:[],
                percentage:[],
                listArr:[],
                dataList:[],
                dataList2:[],
                tableData: []
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
            this.params.mobile = userInfo.mobile
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 200);
            this.params.startTime = this.$moment(start).format('YYYY/M/D HH:mm')
            this.params.endTime = this.$moment(end).format('YYYY/M/D HH:mm')
        },
        methods: {
            queryData(){
                this.params.startTime = this.$moment(this.dateTime[0]).format('YYYY/M/D HH:mm')
                this.params.endTime = this.$moment(this.dateTime[1]).format('YYYY/M/D HH:mm')
                this.getListData()
            },
            getListData(){
                inquirecity(this.params).then((res)=>{
                    if(res.code == 200){
                        this.provinceList = res.data.province
                        this.tableData = res.data.city
                        this.$message({
                            type:'success',
                            message:res.msg
                        })
                    } else{
                        this.$message.error(res.msg)
                    }
                    this.drawBarChart()
                })
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    title: {
                        left: 'center'
                    },
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            if (params.data) return params.name + '：' + params.data['value']
                        },
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    visualMap: {
                        show:false,
                        min: 0,
                        max: 10,
                        left: 'left',
                        top: 'top',
                        text: ['高','低'],           // 文本，默认为数值文本
                        calculable: false,
                        inRange: {
                            color: ['#eee', '#1D9BD6', '#5ACAFF']
                        },
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: 'iphone3',
                            type: 'map',
                            mapType: 'china',
                            showLegendSymbol: false,//去除红点标记
                            roam: false,
                            label: {
                                normal: {
                                    show: false //省份名称不显示
                                }
                            },
                            data:this.provinceList
                        }
                    ]
                };
                this.chartBar.setOption(option);
            },
        },
        mounted() {
            this.getListData()
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
        .queryDate{
            text-align: right
        }
    }
</style>
