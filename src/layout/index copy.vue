<template>
	<!-- <el-header>
		<router-link to="/index">
			<el-button type="primary">{{ $t('links.index') }}</el-button>
		</router-link>
		<router-link to="/system">
			<el-button type="primary">{{ $t('links.system') }}</el-button>
		</router-link>
		<router-link to="/user">
			<el-button type="primary">{{ $t('links.user') }}</el-button>
		</router-link>
		<el-dropdown @command="handleCommand">
			<el-button type="primary">
				{{ $t('lang.default') }}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="zhCN">{{
						$t('lang.zhCN')
					}}</el-dropdown-item>
					<el-dropdown-item command="en">{{
						$t('lang.en')
					}}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</el-header> -->
	<el-main>
		<div class="block">
			<span class="demonstration">Display all tags (default)</span>
			<el-cascader
				:options="state.options"
				:props="state.props"
				clearable
			/>
		</div>
		<div class="block">
			<span class="demonstration">Collapse tags</span>
			<el-cascader
				:options="state.options"
				:props="state.props"
				collapse-tags
				clearable
			/>
		</div>
		<div>
			<img alt="Vue logo" src="@/assets/logo.png" />
		</div>
		<HelloWorld msg="Hello Vue 3 + Vite" />
		<router-view />
	</el-main>
	<!-- 底部 -->
	<el-footer>
		<div class="footer">
			<div class="left">Copyright © 2021 Test. All rights reserved.</div>
			<div class="right">
				<a
					target="_blank"
					href="https://github.com/element-plus/element-plus"
					>vue3-admin Version 3.2.20</a
				>
			</div>
		</div>
	</el-footer>
</template>

<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance, computed } from 'vue'
const state = reactive({
	lang: '语言',
	props: { multiple: true },
	options: [],
})
const { proxy: ctx } = getCurrentInstance()
onMounted(async () => {
	// 数据源
	let res = await ctx.$store.dispatch('getList')
	if (res.status == 200) {
		state.options = res.data		
		state.options = state.options.filter((item: any) => {
			item.value = item.id
			item.label = item.name
			return item
		})
	}
	let data = localStorage.getItem('data')
	if (data) {
		ctx.$store.commit('SET_INFO', JSON.parse(data))
	}
	const userInfo: any = computed(() => ctx.$store.state.user.userInfo)
	console.log(userInfo.value)
})
const handleCommand = (command: any) => {
	ctx.$store.commit('SET_LANG', command)
	ctx.$i18n.locale = command
}
</script>

<style lang="scss" scoped>
.footer {
	height: 50px;
	border-top: 1px solid #e9e9e9;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
}
</style>
