<template>
<el-row class="center">
	<el-col :span="12">
		<h2>免费</h2>
		<el-form ref="form2" :model="form2" label-width="120px" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item label="绑定店铺ID">
				<el-input style="width:300px" v-model="form2.id"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form2')">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<el-col :span="12">
		<h2>付费</h2>
		<el-form ref="form" :model="form" label-width="120px" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item>
				<el-button style="width:100px" type="success" @click="addshopId()"> 增加</el-button>
			</el-form-item>
			<el-form-item label="绑定店铺ID">
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
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</el-col>
</el-row>
	
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				exitFileList: [],
				uploadData: {
					x: 1,
					y: 1,
					type: 1
				},
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
			beforeUpload(file) {
				console.log(file)
			},
			success(response, file, fileList) {
				this.loading = false
				file.url = this.uploadData.url + '/' + file.response.key
				file.index = this.index
				file.key = file.response.key
				this.exitFileList = file
				console.log(this.exitFileList)
				// this.$emit('finish-upload', this.exitFileList)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.center{
		height: 100%;
	}
</style>