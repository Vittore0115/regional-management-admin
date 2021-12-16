<template>
		<el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="formInline.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
	setup(){
		const state = reactive({
			dialogVisible:true,
			formInline: {
						user: '',
						region: '',
					},
		})
		const init = (row) => {
			state.dialogVisible = true
			console.log(row)
		}
		return {...toRefs(state),init}
	}
}
</script>

<style>

</style>