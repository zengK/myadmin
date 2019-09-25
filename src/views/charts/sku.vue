<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="12">sku销售占比</el-col>
                <el-col :span="12" class="queryDate">
                    <el-date-picker
                        v-model="dateTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-DD HH:mm"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    <el-button type="primary" @click="queryData()">查询</el-button>
                </el-col>
            </el-row>
            <el-col :span="24">
                <div id="chartBar" style="width:100%; height:600px"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { inquiresku } from '../../api/index'
    export default {
        data() {
            return {
                chartBar: null,
                dateTime: '',
                params:{
                    mobile: '',
                    startTime: '',
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
                pages: [],
                listArr:[],
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
            this.params.mobile = userInfo.mobile
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 200);
            this.params.startTime = this.$moment(start).format('YYYY-MM-DD HH:mm')
            this.params.endTime = this.$moment(end).format('YYYY-MM-DD HH:mm')
        },
        methods: {
            getListData(){
                inquiresku(this.params).then((res)=>{
                    this.listArr = res.data
                    this.drawBarChart()
                })
            },
            queryData(){
                this.params.startTime = this.$moment(this.dateTime[0]).format('YYYY-MM-DD HH:mm')
                this.params.endTime = this.$moment(this.dateTime[1]).format('YYYY-MM-DD HH:mm')
                this.getListData()
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.listArr,
                            label: {
                                rich: {
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                
                };
                this.chartBar.setOption(option);
            }
        },

        mounted: function () {
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
