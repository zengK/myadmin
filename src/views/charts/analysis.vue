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
                    <el-select v-model="params.userType" placeholder="请选择">
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
                    回购周期分布明细
                </el-row>
                <el-row class="radioS">
                    <el-col :span="2" class="labeltitle">回顾周期间隔:</el-col>
                    <el-col :span="3">
                         <el-radio-group v-model="params.time" @change="changeTime(params.time)">
                            <el-radio :label="10">10</el-radio>
                            <el-radio :label="30">30</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="1" class="labeltitle">指标选择:</el-col>
                    <el-col :span="6">
                         <el-radio-group v-model="params.target"  @change="changeType(params.target)">
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
                    v-loading="loading"
                    style="width: 100%">
                    <!-- <el-table-column
                    prop="date"
                    label="回购周期"
                    width="180">
                    </el-table-column> -->
                    <el-table-column
                    prop="count"
                    label="客户数">
                    </el-table-column>
                    <el-table-column
                    prop="kehuzhanbi"
                    label="客户占比">
                    </el-table-column>
                    <el-table-column
                    prop="leijizhanbi"
                    label="累计占比">
                    </el-table-column>
                    <el-table-column
                    prop="renjunxiaofei"
                    label="人均累计消费(元))">
                    </el-table-column>
                    <el-table-column
                    v-if="showtarge"
                    prop="huigouyici"
                    label="回购一次">
                    </el-table-column>
                    <el-table-column
                    prop="huigouerci"
                    v-if="showtarge"
                    label="回购两次">
                    </el-table-column>
                     <el-table-column
                    prop="huigousanci"
                    v-if="showtarge"
                    label="回购三次">
                    </el-table-column>
                     <el-table-column
                    prop="huigousici"
                    v-if="showtarge"
                    label="回购四次">
                    </el-table-column>
                     <el-table-column
                    prop="huigouwuci"
                    v-if="showtarge"
                    label="回购五次">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </section>
</template>

<script>
    import { inquireBuyBack } from '../../api/index'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                loading:true,
                chartBar: null,
                dateTime: '',
                showtarge: false,
                params:{
                    mobile: '',
                    startTime:'',
                    endTime:'',
                    userType: '1',
                    time:10,
                    target:1
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
                tableData: [],
                options: [{
                    value: '1',
                    label: '全部'
                    }, {
                    value: '2',
                    label: '新用户'
                    }, {
                    value: '3',
                    label: '老用户'
                }]
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
            this.dateTime= [this.params.startTime, this.params.endTime]
        },
        methods: {
            getDate(getDate){
                this.params.startTime = this.$moment(getDate[0]).format('YYYY/M/D HH:mm')
                this.params.endTime = this.$moment(getDate[1]).format('YYYY/M/D HH:mm')
            },
            getTableData(){
                this.loading = true
                inquireBuyBack(this.params).then(res=>{
                    this.tableData = res
                    this.loading = false
                    console.log(res)
                })
            },
            changeType(type){
                if(type == 1){
                    this.showtarge= false
                } else{
                    this.showtarge = true
                }
            },
            changeTime(time){
                this.params.time =  time
                this.getTableData()
            },
            queryData(){
                this.loading = true
                this.params.time = 10
                this.getTableData()
            }
        },
        mounted() {
            this.getTableData()
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
