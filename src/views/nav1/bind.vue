<template>
<el-row class="center">
	<el-row class="changeType">
		<el-button type="primary" @click="dialogVisible = true">重新选择</el-button>
	</el-row>
	<el-col :span="12" v-show="type==1">
		<h2>免费</h2>
		<el-form ref="form2" 
			:model="form2"
			label-width="120px" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item label="绑定店铺ID" prop="storeid">
				<el-input style="width:300px" v-model="form2.list[0].storeid"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form2')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<el-col :span="12" v-show="type==2">
		<h2>付费</h2>
		<el-form ref="form" :model="form" label-width="120px" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item>
				<el-button style="width:150px" type="success" @click="addshopId()"> 增加绑定店铺 </el-button>
			</el-form-item>
			<el-form-item label="绑定店铺ID：">
				<el-row style="marginBottom:20px" v-for="(item, index) in form.list" :key="index">
					<el-col :span="20">
						<el-input style="width:300px" v-model="item.storeid" placeholder="请输入店铺id"></el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="danger" @click="removeShopId(index)">删除</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitPay('form')">立即创建</el-button>
				<!-- <el-button>取消</el-button> -->
			</el-form-item>
		</el-form>
	</el-col>
	<el-dialog
		title="提示"
		:visible.sync="dialogVisible"
		:show-close="false"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		top="15%"
		width="30%">
		<el-row>
			<el-col>
				<el-radio-group v-model="type">
					<el-radio :label="1">免费</el-radio>
					<el-radio :label="2">付费</el-radio>
				</el-radio-group>
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
			<el-button type="primary" @click="changetype(type)">确 定</el-button>
		</span>
		</el-dialog>
</el-row>
	
</template>

<script>
	import { bind, bindstoreid, alipay } from '../../api/index' 
	export default {
		data() {
			return {
				loading: false,
				dialogVisible: true,
				exitFileList: [],
				ispayShop:'',
				type:1,
				mobile:'',
				form2:{
					list:[
						{storeid: ''}
					],
					ispayShop: 0
				},
				form: {
					ispayShop: 1,
					list:[
						{storeid: ''}
					]
				}
			}
		},
		created() {
			let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
			this.mobile = userInfo.mobile
			console.log(this.mobile)
		},
		methods: {
			addshopId(){
				if(this.form.list.length == 10){
					this.$message.error('最多添加10个店铺ID');
				} else{
					this.form.list.push( {storeid: ''} )
				}
			},
			removeShopId(index){
				if(this.form.list.length == 1){
					this.$message.error('最少保留一个店铺ID');
				} else{
					this.form.list.splice(index,1)
				}
			},
			onSubmit(form2) {
				this.$refs[form2].validate((valid) => {
					if (valid) {
						this.form2.mobile = this.mobile
						bindstoreid(this.form2).then((res)=>{
							if(res.code==200){
								this.$message({
									type:'success',
									message:'绑定成功'
								})
								this.$router.push({path:"/sku"})
							}else{
								this.$message({
									type:'error',
									message:res.msg
								})
							}
						})

					} else {
						console.log('error submit!!');
						return false;
					}

				});

			},
			submitPay(form){
				this.form.mobile = this.mobile
					bindstoreid(this.form).then((res)=>{
						if(res.code==200){
							this.$message({
								type:'success',
								message:'绑定成功'
							})
							this.$router.push({path:"/main"})
						}else{
							this.$message({
								type:'error',
								message:res.msg
							})
						}
					})

			},
			//选择付费类型
			changetype(type){
				if(type == 2){
					alipay().then((res)=>{
						console.log(res)
						let routerData = this.$router.resolve({path:'/pay',query:{htmls:res}})
	                 	this.htmls = res
	                 	//打开新页面
	                 	window.open(routerData.href)
					})
				} else{
					bind({mobile:this.mobile,bind:type}).then((res)=>{
						if(res.code==200){
							this.$message({
								type:'success',
								message: res.msg
							})
							this.ispayShop = false
							this.dialogVisible = false
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.center{
		height: 100%;
	}
	.changeType{
		padding: 20px;
	}
</style>