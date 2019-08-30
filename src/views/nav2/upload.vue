<template>
	<section>
		<el-upload
			class="upload"
			ref="upload"
			drag
			accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.zip,.rar"
			action="http://47.104.162.109/api/getExcel"
			:on-success='success'
			:on-error='error'
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    	</el-upload>
	</section>
</template>

<script>
export default {
	props: {

	},
	data() {
		return {

		};
	},
	computed: {

	},
	created() {

	},
	mounted() {

	},
	watch: {

	},
	methods: {
		success() {
		this.$message.success('上传成功')
		},
		error() {
		this.$message.error('上传失败')
		}
	},
	components: {

	},
};
</script>

<style scoped lang="scss">

</style>
