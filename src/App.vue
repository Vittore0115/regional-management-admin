<template>
  <ElConfigProvider :locale="localeMap.get(common.locale)">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import { useStore } from 'vuex';
const store = useStore();
const localeMap = new Map([
  ['en',en],
  ['zhCN',zhCN],
])
const { value: common } = computed(() => store.state.common);
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
</style>
