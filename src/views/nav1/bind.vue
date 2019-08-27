<template>
<el-row class="center">
	<el-row class="changeType">
		<el-button type="primary" @click="dialogVisible = true">重新选择</el-button>
	</el-row>
	<el-col :span="12" v-show="type==1">
		<h2>免费</h2>
		<el-form ref="form2" :model="form2" label-width="120px" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item label="绑定店铺ID">
				<el-input style="width:300px" v-model="form2.id"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form2')">立即创建</el-button>
				<!-- <el-button>取消</el-button> -->
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
				<el-row style="marginBottom:20px" v-for="(item, index) in form.Ids" :key="index">
					<el-col :span="20">
						<el-input style="width:300px" v-model="item.id" placeholder="请输入店铺id"></el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="danger" @click="removeShopId(index)">删除</el-button>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit1">立即创建</el-button>
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
	import { bind } from '../../api/index' 
	export default {
		data() {
			return {
				loading: false,
				dialogVisible: true,
				exitFileList: [],
				type:2,
				mobile:'',
				form2:{
					id: '',
					type: '1'
				},
				form: {
					type: '2',
					Ids:[
						{id: ''}
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
				if(this.form.Ids.length == 10){
					this.$message.error('最多添加10个店铺ID');
				} else{
					this.form.Ids.push( {id: ''} )
				}
			},
			removeShopId(index){
				if(this.form.Ids.length == 1){
					this.$message.error('最少保留一个店铺ID');
				} else{
					this.form.Ids.splice(index,1)
				}
			},
			onSubmit() {
				// alert(this.form2.id)
				sessionStorage.setItem("form2", this.form2)
			},
			//选择付费类型
			changetype(type){
				bind({mobile:this.mobile,bind:type}).then((res)=>{
					if(res.code==200){
						this.$message({
							type:'success',
							message: res.msg
						})
					}
				})
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