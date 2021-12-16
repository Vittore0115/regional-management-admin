<template>
  <div class="header">
    <div class="left">
      <img class="logo"
           src="@/assets/u5.png" />
      <div style="font-size: 20px">{{ name }}</div>
    </div>
    <div class="right">
      <el-popover placement="bottom"  :width="320" trigger="click" popper-class="popper-user-box">      
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ userInfo.username || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>用户名：{{ userInfo.username }}</p>
          <p>密码：{{ userInfo.password || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'Header',
  setup() {
    const state = reactive({
      name: '物联网卡平台',
      userInfo: {}
    })
		const methods = {
			getUserInfo(){
			  const userInfo : any= JSON.parse(localStorage.getItem('data') || '')
				Object.assign(state.userInfo,userInfo)
			},
			logout : () => {
				localStorage.removeItem('data')
				window.location.reload()
			}
		}
    onMounted(() => {
			methods.getUserInfo()
    })
    return {
      ...toRefs(state),
      ...methods
    }
  },
}
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.header .left {
  display: flex;
  align-items: center;
}
.left img {
  width: 50px;
  height: 50px;
}

.popper-user-box .nickname {
  position: relative;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.el-icon-back {
  border: 1px solid #1d1b1b;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>