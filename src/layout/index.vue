<template>
  <div class="layout">
    <el-container class="container">
      <!-- 头部 -->
			<Header />
      <el-header>
        <div class="block">
          <span class="left">请选择您的地址:</span>
          <el-cascader 
						placeholder="---请选择地区---"
						v-model="state.params.areaId"
						:options="state.originData"
						:props="state.defaultProps"
						@change="methods.handleChange"
						filterable
						clearable />
          <el-button type="primary"
            @click="methods.searchList()">查询
          </el-button>
        </div>
      </el-header>
      <!-- 内容区 -->
      <el-main>
        <el-table 
						v-loading="state.loading"
						:data="state.options"
						style="width: 100%"
						row-key="id"
						border
						lazy
						:load="methods.load"
						:tree-props="{ children: 'row', hasChildren: 'hasChildren' }">
          <el-table-column 
						prop="name"
						label="地区"
						header-align="center" />
          <el-table-column 
						prop="level"
						label="当前层级"
						header-align="center"
						align="center" />
          <el-table-column 
						prop="createTime"
						label="创建时间"
						header-align="center"
						align="center" />
          <el-table-column 
						prop="updateTime"
						label="操作时间"
						header-align="center"
						align="center" />
          <el-table-column 
						prop="status"
						label="状态"
						header-align="center"
						align="center">
            <template v-slot:default="{row}">
              <el-switch 
								v-model="row.status"
								:active-value="1"
								:inactive-value="0"
								active-color="#13ce66"
								inactive-color="#ff4949"
								title="0：禁用 1：启用"
								@change="methods.statusHandle(row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column 
						prop="operator"
						label="创建人"
						header-align="center"
						align="center" />
          <el-table-column 
						label="操作"
						header-align="center"
						align="center">
            <template v-slot:default="{row}">
              <el-button 
								type="text"
								size="small"
								@click="methods.addOrUpdateHandle(row,0)">
								修改
							</el-button>
              <el-button 
								type="text"
								size="small"
								@click="methods.addOrUpdateHandle(row,2)">
								新增
							</el-button>
							<el-button 
								type="text"
								size="small"
								@click="methods.deleteHandle(row)"
								>删除
							</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
					v-model:currentPage="state.currentPage"
					:page-sizes="[5, 10, 20, 100]"
					layout="sizes, prev, pager, next"
					:total="state.totalPage"
					@size-change="methods.sizeChangeHandle"
					@current-change="methods.currentChangeHandle">
        </el-pagination>
      </el-main>
      <!-- 底部 -->
      <Footer />
    </el-container>
  </div>
	<!-- 新增 修改 -->
	<add-or-update v-if="state.isShow" ref="locationDialog" :_originData = state.originData @searchHandle="methods.searchList" ></add-or-update>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AddOrUpdate from '@/components/AddOrUpdate.vue'
import { reactive, onMounted, getCurrentInstance } from 'vue'
import { getAreaList,updateAreaList,deleteAreaList } from '@/api/service'
import { getTreeData } from '@/utils/index'

const state = reactive({
  loading: true,
	isShow: false,
  defaultProps: {
    label: 'name', // 显示的选项
    value: 'id', // 选择的value值
    children: 'children', // 子级属性名
    checkStrictly: true, // 可以选择任意一级
  }, // 指定层级属性
  options: [], //表格数据
  originData: [], // 级联数据源
  pageIndex: 1, //页数
  pageSize: 10, // 条数 
  totalPage: 0, // 总条数
  params: { //请求参数
    areaId: '',
  },
  currentPage: 1, // 当前分页
})

const { proxy: ctx } = getCurrentInstance()

const methods = {
	/**
	 * @methods getDataList
	 * @params {type} 区分请求
	 */
  async getDataList(params: Object, type = 0) {
		state.options = []
    let res: any = await getAreaList(params)
		// 级联数据源
    if (Boolean(type)) {
      let arr = JSON.parse(JSON.stringify(res.data))
      state.originData = getTreeData(arr)
    }
    if (res.status == 200) {
      state.totalPage = res.data.length
      state.options = getTreeData(res.data)
    } else {
      state.totalPage = 0
      state.options = []
    }
    state.loading = false
  },
  // 查询
  searchList() {
    state.loading = true
		Object.assign(state.params, {
      pageIndex: null,
      limit: null,
    })
    methods.getDataList(state.params)
  },
 
  // 每页数
  sizeChangeHandle(val: any) {
    state.pageSize = val
    state.pageIndex = 1
    Object.assign(state.params, {
      pageIndex: state.pageIndex,
      limit: state.pageSize,
    })
    methods.getDataList(state.params)
  },
  // 当前页
  currentChangeHandle(val: any) {
    state.pageIndex = val
    Object.assign(state.params, {
      pageIndex: state.pageIndex,
      limit: state.pageSize,
    })
    methods.getDataList(state.params)
  },
  // 条件筛选
  handleChange(val: any) {
    if (val && val.length > 0) {
      Object.assign(state.params, { areaId: val[val.length - 1] })
    }
  },
 
  // 开关
  async statusHandle(row: any) {
		let obj = {
			id: row.id,
			status: row.status,
			locationName: row.name
		}
		let res = await updateAreaList(obj)
			if(res.status == 200){
				ctx.$message({
					message: '操作成功',
					type: 'success',
					duration: 1500,
					onClose: () => {
						methods.searchList()
					}
				})
			}
  },
	// 删除数据
	async deleteHandle(row : any){
		let obj = {
			code: row.code,
			p_code: row.p_code
		}
		let res = await deleteAreaList(obj)
			if(res.status == 200){
				ctx.$message({
					message: '操作成功',
					type: 'success',
					duration: 1500,
					onClose: () => {
						methods.searchList()
					}
				})
			}
	},
  // 修改、新增
  addOrUpdateHandle(row: Object, type: Number) {
		state.isShow = true
		ctx.$nextTick(()=>{
			ctx.$refs['locationDialog'].init(type,row)
		})
  },
  // 树结构懒加载
  load(tree: any, treeNode: any, resolve: any) {
    setTimeout(() => {
			resolve(tree.children)
    }, 100)
  },
}
onMounted(() => {
  // 数据源
  methods.getDataList(state.params, 1)

  let data = localStorage.getItem('data')

  if (data) {
    ctx.$store.commit('SET_INFO', JSON.parse(data))
  }
})

</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
  .container {
    height: 100vh;
    .left {
      display: inline-block;
      margin-right: 10px;
    }
    .block {
      margin-top: 20px;
    }
  }
}
</style>
