<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartBar" style="width:100%; height:400px;"></div>
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
                    page: 0,
                    size: 25,
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
                    this.listArr = res.data.page.data
                    for(var i=0; i<this.listArr.length;i++){
                        this.cityS.push(this.listArr[i].name)
                        this.percentage.push(this.listArr[i].value)
                    } 
                    for(var i=0; i<res.data.page.last_page;i++){
                        this.pages.push(i+1)
                    }
                    this.drawBarChart()
                })
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    timeline:{
                        data: this.pages,
                        label : {
                            formatter : function(s) { return "第"+s+"页"; }
                        },
                        autoPlay : false,
                        playInterval : 1000,
                        tooltip:{
                            formatter : function(s) {
                                return "第"+s.value+"页"; 
                            }
                        },
                    },
                    options:[
                        {
                            title : {
                                'text':'数据统计'
                            },
                            tooltip : {'trigger':'axis'},
                            legend : {
                                x:'right',
                                'data':['GDP']
                            },
                            calculable : true,
                            grid : {'y2':80},
                            xAxis : [{
                                'type':'category',
                                //'axisLabel':{'interval':0},
                                'data':this.cityS
                            }],
                            yAxis : [
                                {
                                    'type':'value',
                                    'name':'百分比',
                                }
                            ],
                            series : [
                                {
                                    'name':'百分比','type':'bar',
                                    'data': this.percentage
                                }
                            ]
                        }
                    ]
                };
                this.chartBar.setOption(option);
                this.chartBar.on('click',(res)=>{
                    this.params.page = res.data-1
                    this.getListData()
                })
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
</style>
