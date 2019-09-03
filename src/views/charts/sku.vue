<template>
    <section class="chart-container">
        <el-row>
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
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                params:{
                    mobile: ''
                },
                pages: [],
                listArr:[],
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
			this.params.mobile = userInfo.mobile 
        },
        methods: {
            getListData(){
                inquiresku(this.params).then((res)=>{
                    this.listArr = res.data
                    this.drawBarChart()
                })
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    title : {
                        text: 'sku销售占比',
                        x:'center'
                    },
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
