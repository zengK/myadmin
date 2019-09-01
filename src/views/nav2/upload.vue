<template>
	<section>
		<el-upload
			drag
			ref="upload"
			name="excel"
			class="upload-demo" 
			action="http://47.104.162.109/api/getExcel" 
			:data="params"
			:on-preview="handlePreview"
			accept=".xls,.xlsx"
			:auto-upload="false"
			:on-change="handleChange"
			:file-list="fileList"
			:on-error="handleError"
			:on-success="handleSuccess"
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
		</el-upload>
		<!-- <el-button size="small" type="primary">点击上传</el-button> -->
	</section>
</template>

<script>
import {getExcel} from '../../api/index'
export default {
	props: {

	},
	data() {
		return {
			params:{
				mobile:''
			},
			fileList:[],
			formData: {},
			isConfirm: true
		};
	},
	computed: {
// http://47.104.162.109/api/getExcel
	},
	created() {
		let userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
		this.params.mobile = userInfo.mobile
	},
	mounted() {
	},
	watch: {

	},
	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleError(err, file) {
			this.$message({
					type:"error",
					message:'上传成功'
				})
			this.fileList = []
		},
		handleSuccess(res, file) {
			console.log(res)
			if(res.code == 200){
				this.$message({
					type:"success",
					message:'上传成功'
				})
				this.fileList = []

				this.$router.push({path:'/table'})
			}
		},
		async handleChange() {  
			if (!this.isConfirm) {    
				this.isConfirm = true
				return
			}
			await this.$confirm('此操作将上传该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {    
				this.$refs.upload.submit()
				this.isConfirm = false
			}).catch(() => { 
				return true        
			}) 
			// if (bo) {    
				    
			// 	this.isConfirm = false
			// } else {    
			// 	this.fileList = []
			// }
		}
	},
	components: {

	},
};
</script>

<style scoped lang="scss">

</style>
