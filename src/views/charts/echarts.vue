<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartBar" style="width:100%;"></div>
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
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                params:{
                    mobile: ''
                },
                pages: [],
                cityS:[],
                percentage:[],
                listArr:[],
                dataList:[],
                dataList2:[]
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
			this.params.mobile = userInfo.mobile 
        },
        methods: {
            getListData(){
                inquirecity(this.params).then((res)=>{
                    this.listArr = res.data
                    for(var i=0; i<this.listArr.length;i++){
                        this.cityS.unshift(this.listArr[i].name)
                        this.percentage.unshift(this.listArr[i].value)
                    } 
                    this.drawBarChart()
                })
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    color: ["#00B7EE"],
                    title: {
                        text: '数据统计',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['城市百分比']
                    },
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
                        data: this.cityS,
                        axisLabel:{
                            interval:0,
                        }
                    },
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: this.percentage
                        }
                        
                    ]
                };
                this.chartBar.setOption(option);
                this.autoHeight = this.cityS.length * 30 + 30; // counst.length为柱状图的条数，即数据长度。
　　            this.chartBar.getDom().style.height = this.autoHeight + "px";
                this.chartBar.resize();
            }
        },

        mounted: function () {
            this.getListData()
            setTimeout((res)=>{
                
            },2000)
            
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    .el-col {
        padding: 30px 20px;
    }
    #chartBar{
        height: auto;
    }
</style>
