<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="8">
                <div id="chartBar" style="width:100%;height:400px"></div>
            </el-col>
            <el-col :span="16">
                
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
            // getListData(){
            //     inquirecity(this.params).then((res)=>{
            //         this.listArr = res.data
            //         for(var i=0; i<this.listArr.length;i++){
            //             this.cityS.unshift(this.listArr[i].name)
            //             this.percentage.unshift(this.listArr[i].value)
            //         } 
            //         this.drawBarChart()
            //     })
            // },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                var option = {
                    title: {
                        text: '订单销量',
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
                        max: 300,
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
                            data:[
                                {name: '北京',value: 0 },
                                {name: '天津',value: 11 },
                                {name: '上海',value: 23 },
                                {name: '重庆',value: 300 },
                                {name: '河北',value: 45 },
                                {name: '河南',value: 3 },
                                {name: '云南',value: 0 },
                                {name: '辽宁',value: 300 },
                                {name: '黑龙江',value: 300 },
                                {name: '湖南',value: 300 },
                                {name: '安徽',value: 0 },
                                {name: '山东',value: 300 },
                                {name: '新疆',value: 300 },
                                {name: '江苏',value: 300 },
                                {name: '浙江',value: 300 },
                                {name: '江西',value: 300 },
                                {name: '湖北',value: 0 },
                                {name: '广西',value: 300 },
                                {name: '甘肃',value: 0 },
                                {name: '山西',value: 300 },
                                {name: '内蒙古',value: 0 },
                                {name: '陕西',value: 300 },
                                {name: '吉林',value: 300 },
                                {name: '福建',value: 300 },
                                {name: '贵州',value: 300 },
                                {name: '广东',value: 0 },
                                {name: '青海',value: 300 },
                                {name: '西藏',value: 0 },
                                {name: '四川',value: 300 },
                                {name: '宁夏',value: 300 },
                                {name: '海南',value: 300 },
                                {name: '台湾',value: 300 },
                                {name: '香港',value: 300 },
                                {name: '澳门',value: 300 }
                            ]
                        }
                    ]
                };
                this.chartBar.setOption(option);
            }
        },

        mounted: function () {
            // this.getListData()
            this.drawBarChart()
            // setTimeout((res)=>{
                
            // },2000)
            
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
