<template>
  <main>
    这是系统页    
  </main>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
// 这里的ctx  类似于vue2的this
const { proxy: ctx } = getCurrentInstance();
const { $store: store, $router: router } = ctx;
//调用useRoute,获取页面携带的参数
const route = useRoute();

onMounted(() => {
	
  console.log(import.meta.env);
  console.log(ctx);
  console.log(store);
  console.log(router);
  console.log(route);
});
</script>

<style lang="scss" scoped>
.test1 {
  color: red;
  width: 200px;
  background: pink;
  .test1-1 {
    color: blue;
  }
}
.test2 {
  color: green;
}
</style>