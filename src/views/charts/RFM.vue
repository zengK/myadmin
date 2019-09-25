<template>
    <section class="chart-container">
        <el-row>
            <el-row class="title">
                <el-col :span="6">RFM模型分析</el-col>
                <el-col :span="18" class="lableText">
                    最近付款时间在：<el-date-picker
                        v-model="dateTime"
                        @change="getDate(dateTime)"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    前
                    <el-select v-model="params.type" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>的成交客户数据
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
                    :header-cell-style="{background:'#f2f2f2'}"
                    :cell-class-name="rowClass"
                    :cell-mouse-enter="rowClassBg"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="消费时间(R)/频次(F)"
                    width="180">
                    </el-table-column>
                    <el-table-column
                        label="F=1">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.oneFrequency.payBuyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.oneFrequency.percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.oneFrequency.payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.oneFrequency.goods_price}}元</el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="F=2">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.twoFrequency.payBuyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.twoFrequency.percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.twoFrequency.payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.twoFrequency.goods_price}}元</el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="F=3">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.threeFrequency.payBuyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.threeFrequency.percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.threeFrequency.payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.threeFrequency.goods_price}}元</el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="F=4">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.fourFrequency.payBuyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.fourFrequency.percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.fourFrequency.payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.fourFrequency.goods_price}}元</el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="F>=5">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.fiveFrequency.payBuyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.fiveFrequency.percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.fiveFrequency.payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.fiveFrequency.goods_price}}元</el-row>
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="行合计">
                        <template v-slot:default="scope">
                            <el-row v-if="radio == 1" class="rowText rowTextBold">{{scope.row.heji.total_buyers}}人</el-row>
                            <el-row v-if="radio == 1" class="rowText">占比{{scope.row.heji.total_percentage}}%</el-row>
                            <el-row v-if="radio == 2" class="rowText rowTextBold">{{scope.row.heji.total_payAmount}}元</el-row>
                            <el-row v-if="radio == 3" class="rowText rowTextBold">{{scope.row.heji.total_goods_price}}元</el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {inquireRfm} from '../../api/index'
    export default {
        data() {
            return {
                chartBar: null,
                dateTime: '',
                radio:1,
                params:{
                    mobile: '',
                    queryTime:'',
                    type:'1',
                },
                tableData: [
                ],
                options: [{
                    value: '1',
                    label: '全部'
                    }, {
                    value: '2',
                    label: '一年'
                }]
            }
        },
        created(){
            let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
            this.params.mobile = userInfo.mobile
        },
        methods: {
            queryData(){
                console.log(this.params)
                this.getRFMdata()
            },
            getDate(getDate){
                this.params.queryTime = this.$moment(getDate).format('yyyy-MM-DD')
            },
            getRFMdata(){
                inquireRfm(this.params).then((res)=>{
                    var  payBuyers1='',payBuyers2 = '',payBuyers3 = '',payBuyers4 = '',payBuyers5 = ''
                    var  payAmount1='',payAmount2 = '',payAmount3 = '',payAmount4 = '',payAmount5 = ''
                    var  percentage1='',percentage2 = '',percentage3 = '',percentage4 = '',percentage5 = ''
                    var  goods_price1='',goods_price2 = '',goods_price3 = '',goods_price4 = '',goods_price5 = ''
                    var  hejitotal_buyers=''
                    var  hejiprice=''
                    var  hejipayAmount=''
                    var  hejipercentage=''
                    
                    for(var i=0; i<res.length;i++){
                        hejitotal_buyers += Number(res[i].heji.total_buyers)
                        hejiprice += Number(res[i].heji.total_goods_price)
                        hejipayAmount += Number(res[i].heji.total_payAmount)
                        hejipercentage += Number(res[i].heji.total_percentage)

                        payBuyers1 += Number(res[i].oneFrequency.payBuyers)
                        payBuyers2 += Number(res[i].twoFrequency.payBuyers)
                        payBuyers3 += Number(res[i].threeFrequency.payBuyers)
                        payBuyers4 += Number(res[i].fourFrequency.payBuyers)
                        payBuyers5 += Number(res[i].fiveFrequency.payBuyers)

                        payAmount1 += Number(res[i].oneFrequency.payAmount)
                        payAmount2 += Number(res[i].twoFrequency.payAmount)
                        payAmount3 += Number(res[i].threeFrequency.payAmount)
                        payAmount4 += Number(res[i].fourFrequency.payAmount)
                        payAmount5 += Number(res[i].fiveFrequency.payAmount)

                        percentage1 += Number(res[i].oneFrequency.percentage)
                        percentage2 += Number(res[i].twoFrequency.percentage)
                        percentage3 += Number(res[i].threeFrequency.percentage)
                        percentage4 += Number(res[i].fourFrequency.percentage)
                        percentage5 += Number(res[i].fiveFrequency.percentage)

                        goods_price1 += Number(res[i].oneFrequency.goods_price)
                        goods_price2 += Number(res[i].twoFrequency.goods_price)
                        goods_price3 += Number(res[i].threeFrequency.goods_price)
                        goods_price4 += Number(res[i].fourFrequency.goods_price)
                        goods_price5 += Number(res[i].fiveFrequency.goods_price)

                        payBuyers1 +='+',payBuyers2 +='+',payBuyers3 +='+',payBuyers4 +='+',payBuyers5 +='+'
                        payAmount1 +='+',payAmount2 +='+',payAmount3 +='+',payAmount4 +='+',payAmount5 +='+'
                        percentage1 +='+',percentage2 +='+',percentage3 +='+',percentage4 +='+',percentage5 +='+'
                        goods_price1 +='+',goods_price2 +='+',goods_price3 +='+',goods_price4 +='+',goods_price5 +='+'

                        hejitotal_buyers +='+'
                        hejiprice +='+'
                        hejipayAmount +='+'
                        hejipercentage +='+'
                    }
                    payBuyers1=payBuyers1.substring(0, payBuyers1.length - 1);
                    payBuyers2=payBuyers2.substring(0, payBuyers2.length - 1);
                    payBuyers3=payBuyers3.substring(0, payBuyers3.length - 1);
                    payBuyers4=payBuyers4.substring(0, payBuyers4.length - 1);
                    payBuyers5=payBuyers5.substring(0, payBuyers5.length - 1);

                    payAmount1=payAmount1.substring(0, payAmount1.length - 1);
                    payAmount2=payAmount2.substring(0, payAmount2.length - 1);
                    payAmount3=payAmount3.substring(0, payAmount3.length - 1);
                    payAmount4=payAmount4.substring(0, payAmount4.length - 1);
                    payAmount5=payAmount5.substring(0, payAmount5.length - 1);

                    percentage1=percentage1.substring(0, percentage1.length - 1);
                    percentage2=percentage2.substring(0, percentage2.length - 1);
                    percentage3=percentage3.substring(0, percentage3.length - 1);
                    percentage4=percentage4.substring(0, percentage4.length - 1);
                    percentage5=percentage5.substring(0, percentage5.length - 1);

                    goods_price1=goods_price1.substring(0, goods_price1.length - 1);
                    goods_price2=goods_price2.substring(0, goods_price2.length - 1);
                    goods_price3=goods_price3.substring(0, goods_price3.length - 1);
                    goods_price4=goods_price4.substring(0, goods_price4.length - 1);
                    goods_price5=goods_price5.substring(0, goods_price5.length - 1);

                    hejitotal_buyers=hejitotal_buyers.substring(0, hejitotal_buyers.length - 1);
                    hejiprice=hejiprice.substring(0, hejiprice.length - 1);
                    hejipayAmount=hejipayAmount.substring(0, hejipayAmount.length - 1);
                    hejipercentage=hejipercentage.substring(0, hejipercentage.length - 1);

                    res.push({
                        name:'合计',
                        heji: {
                            total_goods_price: 0, 
                            total_buyers: 0, 
                            total_payAmount: 0, 
                            total_percentage: 0
                        },
                        oneFrequency: {
                            goods_price: 0, // 客单价
                            payAmount: 0, // 累积支付金额
                            payBuyers: 0, // 购买人数
                            percentage: 0 // 百分比,
                        }, // F= 1
                        twoFrequency: {
                             goods_price: 0, // 客单价
                            payAmount: 0, // 累积支付金额
                            payBuyers: 0, // 购买人数
                            percentage: 0, // 百分比
                        }, // F= 2
                        threeFrequency: { // F= 3
                            goods_price: 0, // 客单价
                            payAmount: 0, // 累积支付金额
                            payBuyers: 0, // 购买人数
                            percentage: 0 // 百分比
                        },
                        fourFrequency: {
                            goods_price: 0, // 客单价
                            payAmount: 0, // 累积支付金额
                            payBuyers: 0, // 购买人数
                            percentage: 0 // 百分比
                        }, //F = 4
                        fiveFrequency: {
                            goods_price: 0, // 客单价
                            payAmount: 0, // 累积支付金额
                            payBuyers: 0, // 购买人数
                            percentage: 0 // 百分比
                        }
                    })
                    this.tableData = res
                    this.tableData[5].oneFrequency.payBuyers=eval(payBuyers1)
                    this.tableData[5].twoFrequency.payBuyers=eval(payBuyers2)
                    this.tableData[5].threeFrequency.payBuyers=eval(payBuyers3)
                    this.tableData[5].fourFrequency.payBuyers=eval(payBuyers4)
                    this.tableData[5].fiveFrequency.payBuyers=eval(payBuyers5)

                    this.tableData[5].oneFrequency.payAmount=eval(payAmount1)
                    this.tableData[5].twoFrequency.payAmount=eval(payAmount2)
                    this.tableData[5].threeFrequency.payAmount=eval(payAmount3)
                    this.tableData[5].fourFrequency.payAmount=eval(payAmount4)
                    this.tableData[5].fiveFrequency.payAmount=eval(payAmount5)

                    this.tableData[5].oneFrequency.percentage=eval(percentage1)
                    this.tableData[5].twoFrequency.percentage=eval(percentage2)
                    this.tableData[5].threeFrequency.percentage=eval(percentage3)
                    this.tableData[5].fourFrequency.percentage=eval(percentage4)
                    this.tableData[5].fiveFrequency.percentage=eval(percentage5)

                    this.tableData[5].oneFrequency.goods_price=eval(goods_price1)
                    this.tableData[5].twoFrequency.goods_price=eval(goods_price2)
                    this.tableData[5].threeFrequency.goods_price=eval(goods_price3)
                    this.tableData[5].fourFrequency.goods_price=eval(goods_price4)
                    this.tableData[5].fiveFrequency.goods_price=eval(goods_price5)
                    
                    var rowpayBuyers = eval(payBuyers1)+eval(payBuyers2)+eval(payBuyers3)+eval(payBuyers4)+eval(payBuyers5)
                    var rowpayAmount = eval(payAmount1)+eval(payAmount2)+eval(payAmount3)+eval(payAmount4)+eval(payAmount5)
                    var rowpercentage = eval(percentage1)+eval(percentage2)+eval(percentage3)+eval(percentage4)+eval(percentage5)
                    var rowgoods_price = eval(goods_price1)+eval(goods_price2)+eval(goods_price3)+eval(goods_price4)+eval(goods_price5)

                    this.tableData[5].heji.total_buyers=eval(hejitotal_buyers)+rowpayBuyers
                    this.tableData[5].heji.total_goods_price=eval(hejiprice)+rowgoods_price
                    this.tableData[5].heji.total_payAmount=eval(hejipayAmount)+rowpayAmount
                    this.tableData[5].heji.total_percentage=eval(hejipercentage)+rowpercentage
                })
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
            this.getRFMdata()
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
    .rowText{
        text-align: center;
    }
    .rowTextBold{
        font-size: 18px;
        font-weight: bold;
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
    .el-table__body tr,
        .el-table__body td {
            padding: 0;
            height: 60px;
        }
</style>
