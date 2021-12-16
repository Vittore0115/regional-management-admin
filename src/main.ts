import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/index.scss'
// 修改后的主题样式必须放在最后面
import '../theme/index.css'
import './assets/reset.css'
import installElementPlus from './plugins/element'
import installi18n from './plugins/i18n'
import router from './router'
import store from './store'

const app = createApp(App)
installElementPlus(app)
installi18n(app)
app.use(router).use(store).mount('#app')

console.log(import.meta.env);