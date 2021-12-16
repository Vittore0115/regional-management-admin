<template>
  <el-dialog
    :title="Boolean(type) ? '新增' : '修改'"
    :close-on-click-modal="false"
    width="45%"
    v-model="visible">
    <el-form :model="dataForm" ref="formData" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" label-width="82px">
			<el-form-item label="地区名称:" prop="locationName">
				<el-input v-model="dataForm.locationName" placeholder="请输入地区名称" maxlength="20" show-word-limit type="text"></el-input>
			</el-form-item>
			<div class="block">
				<span class="left">所属地区:</span>
				<el-cascader 
						style="width:744px"
						placeholder="---请选择地区---"
						v-model="dataForm.areaId"
						:options="_originData"
						:props="defaultProps"
						@change="handleChange"
						filterable
						clearable />
			</div>
			<el-form-item label="状态" prop="status" title="状态 0：关闭 1：开启">
				<el-switch 
					v-model="dataForm.status"
					:active-value="1"
					:inactive-value="0"
					active-color="#13ce66"
					inactive-color="#ff4949"
					title="0：禁用 1：启用"
					@change="statusHandle(params)">
        </el-switch>
			</el-form-item>
		</el-form>
		<template #footer>
      <span class="dialog-footer">
				<el-button @click="visible = false">取消</el-button>
				<el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, onMounted, getCurrentInstance, toRefs, defineComponent } from 'vue'
import { saveAreaList } from '@/api/service'
import { emptyObject } from '@/utils/index'
export default defineComponent({
  name: 'AddOrUpdate',
	props:{
		_originData: {
			type : Array,
			default : []
		}
	},
	setup(){
		const state = reactive({
			visible: false,
			type : 0,
			defaultProps: {
				label: 'name', // 显示的选项
				value: 'id', // 选择的value值
				children: 'children', // 子级属性名
				checkStrictly: true, // 可以选择任意一级
			}, // 指定层级属性
			dataForm:{
				locationName: '',
				status : '',
				areaId: '',
				code: ''
			},
			dataRule: {
				locationName: [
					{
						required: true,
						message: '请输入地区',
						trigger: 'blur',
					},
				]
			},
		})
		const { proxy: ctx } = getCurrentInstance()
		
		const methods = {
			init(type : any ,row : any){		
				if(type == 0){
					Object.assign(state.dataForm,{
						locationName : row.name,
						status : row.status,
						areaId : row.id
					})
				}else if(type == 2){
					Object.assign(state.dataForm,{
						areaId : row.id,
						code: row.code
					})
				}else{
					emptyObject(state.dataForm,(obj : any, key : any)=>{ return obj[key] = ''})
				}
				ctx.$nextTick(()=>{
					state.visible = true
					state.type = type
				})		
			},
			dataFormSubmit(){

				ctx.$refs['formData'].validate(async(valid: boolean)=>{
					if(valid){
						let res: any = await saveAreaList(
							{
								name : state.dataForm.locationName,
								status : state.dataForm.status,
								code: state.dataForm.code
							}
						)
						if (res.status == 200) {
							ctx.$message({
								message: '操作成功',
								type: 'success',
								duration: 500,
								onClose: () => {
									state.visible = false
									ctx.$emit('searchHandle')
								}
							})
						} else {
							ctx.$message({
								message: '操作失败',
								type: 'success',
								duration: 500,
							})
						}

					}
				})
			},
			searchList(){

			},
			handleChange(){

			},
			statusHandle(row : any){
				// console.log('是否开启',row);
			}
		}
		onMounted(()=>{})
		return {
			...toRefs(state),
			...methods
		}
	}
})

</script>

<style lang="scss" scoped>
.block{
	margin-left: 10px;
	.left {
		padding-right: 10px;
	}
}
</style>
