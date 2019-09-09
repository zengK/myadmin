<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="6">RFM模型分析</el-col>
                <el-col :span="18" class="lableText">
                    最近付款时间在：<el-date-picker
                        v-model="dateTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    前
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>的成交客户数据
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="detile">
                <el-row class="chartsTitle">
                    购买次数分布图
                </el-row>
                <el-row class="radioS">
                    <el-col :span="1" class="labeltitle">指标选择:</el-col>
                    <el-col :span="6">
                         <el-radio-group v-model="radio">
                            <el-radio :label="1">客户数/占比</el-radio>
                            <el-radio :label="2">累计支付金额</el-radio>
                            <el-radio :label="3">客单价</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-row>
            <el-row>
                <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f2f2f2'}"
                    :cell-class-name="rowClass"
                    :cell-mouse-enter="rowClassBg"
                    style="width: 100%">
                    <el-table-column
                    prop="buyNums"
                    label="消费时间(R)/频次(F)"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="clientNumber"
                    label="F=1">
                    </el-table-column>
                    <el-table-column
                    prop="client"
                    label="F=2">
                    </el-table-column>
                    <el-table-column
                    prop="total"
                    label="F=3">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="F=4">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="F>=5">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="行合计">
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
                params:{
                    mobile: '',
                    startTime:'',
                    endTime:''
                },
                tableData: [{
                    buyNums: 'R<=30',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    buyNums: '30<R<=90',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    buyNums: '90<R<=180',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    buyNums: '180<R<=365',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    buyNums: 'R>365',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                },{
                    buyNums: '列合计',
                    clientNumber: 10,
                    client: '10%',
                    total: '15%',
                    money: 2600
                }],
                options: [{
                    value: '1',
                    label: '全部'
                    }, {
                    value: '2',
                    label: '一年'
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
            rowClassBg({row, column, cell, event}){
                console.log(cell)
            },
            rowClass ({ row, column, rowIndex, columnIndex }){
                if (rowIndex === 0 && columnIndex === 1||
                rowIndex === 1 && columnIndex === 2||
                rowIndex === 2 && columnIndex === 3||
                rowIndex === 3 && columnIndex === 4||
                rowIndex === 4 && columnIndex === 5) {
                    return 'R-1-F-1'
                } else if(
                    rowIndex === 1 && columnIndex === 1||
                    rowIndex === 2 && columnIndex === 2||
                    rowIndex === 3 && columnIndex === 3||
                    rowIndex === 4 && columnIndex === 4){
                    return 'R-2-F-1'
                } else if(
                    rowIndex === 2 && columnIndex === 1||
                    rowIndex === 3 && columnIndex === 2||
                    rowIndex === 4 && columnIndex === 3){
                    return 'R-3-F-1'
                } else if(
                    rowIndex === 3 && columnIndex === 1||
                    rowIndex === 4 && columnIndex === 2){
                    return 'R-4-F-1'
                } else if(
                    rowIndex === 4 && columnIndex === 1){
                    return 'R-5-F-1'
                }
                if (rowIndex === 0 && columnIndex === 2||
                rowIndex === 1 && columnIndex === 3||
                rowIndex === 2 && columnIndex === 4||
                rowIndex === 3 && columnIndex === 5) {
                    return 'r-4-f-5'
                } else if(
                    rowIndex === 0 && columnIndex === 3||
                    rowIndex === 1 && columnIndex === 4||
                    rowIndex === 2 && columnIndex === 5){
                    return 'r-3-f-5'
                } else if(
                    rowIndex === 0 && columnIndex === 4||
                    rowIndex === 1 && columnIndex === 5){
                    return 'r-2-f-5'
                } else if(
                    rowIndex === 0 && columnIndex === 5){
                    return 'r-1-f-5'
                }
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
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
    .R-1-F-1{
        background: #E6F7FF;
    }
    .R-2-F-1{
        background: #BDE8FF;
    }
    .R-3-F-1{
        background: #94d6ff;
    }
    .R-4-F-1{
        background: #6bc1ff;
    }
    .R-5-F-1{
        background: #42aaff;
    }
    .r-1-f-5 {
        background: #fa9741;
    }
    .r-2-f-5 {
    background: #faa869;
    }
    .r-3-f-5 {
        background: #fabb91;
    }
    .r-4-f-5 {
        background: #fad1b9;
    }
    .el-table tbody tr:hover>td { 
        background-color:none !important;
    }
    .hoverBG{
        background: none;
    }
</style>
