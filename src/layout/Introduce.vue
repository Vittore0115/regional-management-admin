<template>
	<el-card class="account-container">
		<h1>平台简介</h1>
		<div style="line-height: 30px">
			vue3-admin 是一个企业级后台管理系统，基于 Vue 3.x 相关技术栈开发。
		</div>
		<h1>基础交互</h1>
		<HelloWorld />
		<h1>相关展示</h1>
		<Compts />
	</el-card>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'

const { proxy: ctx } = getCurrentInstance()

const state = reactive({})
</script>

<style scoped>
.course {
	font-weight: bold;
	display: inline-block;
}
.course li {
	line-height: 36px;
	color: #409eff;
	cursor: pointer;
}
</style>
