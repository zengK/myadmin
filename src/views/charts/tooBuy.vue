<template>
	<section>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-row class="tableList">
			<el-table v-loading="loading" :data="tableData" height="73vh" border stripe>
				<el-table-column prop="id" label="序号" width="50"></el-table-column>
				<el-table-column prop="discountname" label="优惠券名称" width="150"></el-table-column>
				<el-table-column label="优惠券类型" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.discounttype==1">打折</span>
					<span v-if="scope.row.discounttype==2">满减</span>
					<span v-if="scope.row.discounttype==3">体验</span>
				</template>
				</el-table-column>
				<el-table-column prop="faceValue" label="优惠券面值" width="100"></el-table-column>
				<el-table-column prop="fullreduction" label="满减金额" width="100"></el-table-column>
				<el-table-column label="积分兑换" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.integral">{{scope.row.integral}}</span>
					<span v-else>--</span>
				</template>
				</el-table-column>
				<el-table-column label="优惠券项目">
				<template slot-scope="scope">
					<span>城市：{{scope.row.shopCityName}}</span><br>
					<span>场馆：{{scope.row.shopName}}</span><br>
					<span v-if="scope.row.projectType == 1">类型：卡 </span><br>
					<span v-if="scope.row.projectType == 2">类型：私教 </span><br>
					<span>项目：{{scope.row.projectName}}</span>
				</template>
				</el-table-column>
				<!-- <el-table-column label="是否叠加" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.position==1">是</span>
					<span v-else>否</span>
				</template>
				</el-table-column> -->
				<el-table-column prop="describe" label="优惠券说明"></el-table-column>
				<el-table-column label="有效期">
				<template slot-scope="scope">
					<span>{{scope.row.startTime}}至</span>
					<span>{{scope.row.endTime}}</span>
				</template>
				</el-table-column>
				<el-table-column width="300" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
					<el-button
					v-if="scope.row.states == 1"
					type="success"
					@click="downdataBtn(scope.row.id)"
					>上架</el-button>
					<el-button
					v-if=" scope.row.states == 0"
					type="warning"
					@click="updataBtn(scope.row.id)"
					>下架</el-button>
					<el-button type="danger" @click="removeList(scope.row.id)">删除</el-button>
				</template>
				</el-table-column>
			</el-table>
			</el-row>
			<el-row class="pageination">
			<el-col>
				<el-pagination
				style="textAlign:center;marginTop:10px"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-sizes="[30, 50, 100, 150]"
				:page-size="20"
				layout="total, sizes, prev, pager, next, jumper"
				:total="this.total"
				></el-pagination>
			</el-col>
			</el-row>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { inquirecity } from '../../api/index'
	export default {
		data() {
			return {
				params:{
					current_page: 1,
					size: 40
				},
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				tableData:[],
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//获取列表
			getSwitchList(){
				inquirecity(this.params).then((res)=>{
					console.log(res)
				})
			},
			//分页
			handleSizeChange(val) {
				this.params.size = val;
				this.params.page = 1;
				this.currentPage = 1;
				this.getSwitchList();
			},
			handleCurrentChange(val) {
				this.params.page = val;
				this.getSwitchList();
			},
		},
		mounted() {
			this.getSwitchList()
		}
	}

</script>

<style scoped lang="scss">
.app-container {
  position: relative;
  height: auto;
  .newAdd {
    height: 50px;
    line-height: 50px;
    text-align: right;
    // margin: 10px 0;
  }
  .tableList {
    width: 100%;
    position: absolute;
    top: 60px;
    height: 73vh;
    overflow-y: auto;
  }
  .pageination {
    position: absolute;
    top: 82vh;
    left: 0;
    right: 0;
  }
}
</style>