<template>
	<main class="login-body">
		<div class="login-container">
			<div class="head">
				<img class="logo" src="@/assets/u5.png" />
				<div class="name">
					<div class="title">物联网卡平台</div>
					<div class="tips">Vue3.0 后台管理系统</div>
				</div>
			</div>
			<el-form
				label-position="top"
				:rules="state.rules"
				:model="state.ruleForm"
				ref="loginForm"
				class="login-form"
			>
				<el-form-item label="用户名" prop="username">
					<el-input
						type="text"
						v-model.trim="state.ruleForm.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						type="password"
						v-model.trim="state.ruleForm.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						style="width: 100%"
						type="primary"
						@click="methods.submitForm('loginForm')"
						>立即登录</el-button
					>
					<el-checkbox
						v-model="state.checked"
						@change="!state.checked"
						>下次自动登录</el-checkbox
					>
				</el-form-item>
			</el-form>
		</div>
	</main>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'

const { proxy: ctx } = getCurrentInstance()

const state = reactive({
	submitLoading: false,
	checked: true,
	ruleForm: {
		username: '',
		password: '',
		code: '',
	},
	rules: {
		username: [
			{
				required: true,
				message: '请输入用户名',
				trigger: 'blur',
			},
		],
		password: [
			{
				required: true,
				message: '请输入密码',
				trigger: 'blur',
			},
		],
		code: [
			{
				required: true,
				message: 'Please input Activity name',
				trigger: 'blur',
			},
		],
	},
})
const methods = {
	submitForm(formName: string) {
		ctx.$refs[formName].validate(async (valid: boolean) => {
			if (valid) {
				state.submitLoading = true
				try {
					const { code, data } = await ctx.$store.dispatch(
						'login',
						state.ruleForm
					)
					if (code == 200 && data) {
						ctx.$message({
							message: '登录成功',
							type: 'success',
							duration: 500,
							onClose: () => {}
						})
						localStorage.setItem('data', JSON.stringify(data))
						ctx.$router.replace('/')
						state.submitLoading = false
					}
				} catch (error) {
					state.submitLoading = false
				}
			} else {
				console.log('error submit!!')
				return false
			}
		})
	},
	resetForm(formName: string) {
		ctx.$refs[formName].resetFields()
	},
}
</script>

<style lang="scss" scoped>
.login-body {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-color: #fff;
	/* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
	width: 420px;
	height: 500px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 0 20px 0;
}
.head img {
	width: 100px;
	height: 100px;
	margin-right: 20px;
}
.head .title {
	font-size: 28px;
	color: #1baeae;
	font-weight: bold;
}
.head .tips {
	font-size: 12px;
	color: #999;
}
.login-form {
	width: 70%;
	margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
	padding: 0;
}
</style>
