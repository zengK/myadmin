<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="6">消费频次分析（次数）</el-col>
                <el-col :span="18" class="lableText">
                    付款时间：<el-date-picker
                        v-model="dateTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-DD HH:mm"
                        @change="getDate(dateTime)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    新老客户:
                    <el-select v-model="params.status" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    <el-button type="primary" @click="queryData()">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="detile">
                <el-row class="chartsTitle">
                    购买次数分布图
                </el-row>
                <el-row class="radioS">
                    <el-col :span="1" class="labeltitle">指标选择:</el-col>
                    <el-col :span="6">
                         <el-radio-group v-model="radio" @change="changeType(radio)">
                            <el-radio :label="1">客户数</el-radio>
                            <el-radio :label="2">支付总额</el-radio>
                            <el-radio :label="3">商品支付件数</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-row>
            <el-row v-loading="loading">
                <div id="chartBar" style="width:100%;height:300px"></div>
            </el-row>
            <el-row>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                    prop="lable"
                    label="购买次数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="clent_num"
                    label="客户数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="clent_num_pct"
                    label="客户占比">
                    </el-table-column>
                    <el-table-column
                    prop="pay_num"
                    label="商品支付件数">
                    </el-table-column>
                    <el-table-column
                    prop="pay_avg"
                    label="人均支付件数">
                    </el-table-column>
                    <el-table-column
                    prop="pay_total"
                    label="支付总额">
                    </el-table-column>
                    <el-table-column
                    prop="pay_total_pct"
                    label="支付总额占比">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { consumpquency } from '../../api/index'
    export default {
        data() {
            return {
                loading:true,
                chartBar: null,
                dateTime: [],
                radio:1,
                params:{
                    mobile: '',
                    startTime:'',
                    endTime:'',
                    status:'all'
                },
                radioAllList:[],
                ylable:[
                    '购买1次','购买2次','购买3次','购买4次','购买5次及以上'
                ],
                peopleData:[],
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
                tableData: [],
                options: [{
                    value: 'all',
                    label: '全部'
                    }, {
                    value: 'new',
                    label: '新用户'
                    }, {
                    value: 'old',
                    label: '老用户'
                }],
                value: ''
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
            this.dateTime= [this.params.startTime, this.params.endTime]
        },
        methods: {
            getDataList(){
                consumpquency(this.params).then((res)=>{
                    if(res.code == 200){
                        this.loading = false
                        if(this.params.status == 'all'){
                            this.tableData = res.data.all.form
                            this.radioAllList = res.data.all.histogram
                        } else{
                            this.tableData = res.data.newOrold.form
                            this.radioAllList = res.data.newOrold.histogram
                        }

                        if(this.radio == 1){
                            this.peopleData = this.radioAllList.clent_num
                        } else if(this.radio == 2){
                            this.peopleData = this.radioAllList.pay_num
                        } else if(this.radio == 3){
                            this.peopleData = this.radioAllList.pay_total
                        }
                        console.log(res)
                        this.drawBarChart()
                    } else{
                        this.loading = false
                        this.$message.error(res.msg)
                    }
                })
            },
            queryData(){
                this.loading = true
                this.getDataList()
            },
            getDate(getDate){
                this.params.startTime = this.$moment(getDate[0]).format('YYYY-MM-DD HH:mm')
                this.params.endTime = this.$moment(getDate[1]).format('YYYY-MM-DD HH:mm')
            },
            changeType(radio){
                if(this.radio == 1){
                    this.peopleData = this.radioAllList.clent_num
                } else if(this.radio == 2){
                    this.peopleData = this.radioAllList.pay_num
                } else if(this.radio == 3){
                    this.peopleData = this.radioAllList.pay_total
                }
                this.drawBarChart()
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
                            name: '用户',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: this.peopleData
                        }
                        // ,
                        // {
                        //     name: '老用户',
                        //     type: 'bar',
                        //     stack: '总量',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'insideRight'
                        //         }
                        //     },
                        //     data: [120, 132, 101, 134, 90]
                        // }
                    ]
                }
                this.chartBar.setOption(option);
            }
        },
        mounted() {
            this.getDataList()
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
    .detile{
        padding: 10px 0;
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
