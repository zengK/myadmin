<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="6">回购分析</el-col>
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
            <el-row class="detile">
                <el-row class="chartsTitle">
                    回购周期分布明细
                </el-row>
                <el-row class="radioS">
                    <el-col :span="2" class="labeltitle">回顾周期间隔:</el-col>
                    <el-col :span="3">
                         <el-radio-group v-model="radio">
                            <el-radio :label="1">10</el-radio>
                            <el-radio :label="2">30</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="1" class="labeltitle">指标选择:</el-col>
                    <el-col :span="6">
                         <el-radio-group v-model="radio2">
                            <el-radio :label="1">支付金额（M）</el-radio>
                            <el-radio :label="2">购买频次（F）</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-row>
            <el-row>
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#f2f2f2'}"
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="回购周期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="clientNumber"
                    label="客户数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="client"
                    label="客户占比">
                    </el-table-column>
                    <el-table-column
                    prop="total"
                    label="累计占比">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="人均累计消费园元">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chartBar: null,
                dateTime: '',
                radio:1,
                radio2:1,
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
                tableData: [{
                    date: '2016-05-02',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    date: '2016-05-02',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    date: '2016-05-02',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    date: '2016-05-02',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    date: '2016-05-02',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                }],
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
        },
        mounted() {
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
