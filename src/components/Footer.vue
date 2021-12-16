<template>
  <div class="footer">
    <div class="left">Copyright © 2021 Test. All rights reserved.</div>
    <div class="right">
      <a target="_blank" href="https://github.com/element-plus/element-plus">vue3-admin Version 3.2.20</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Footer',
	setup(){
		
	}
}
</script>

<style scoped>
  .footer {
    height: 50px;
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
</style>