import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios' // 引入axios

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/#/'
Vue.prototype.$http = axios // 给axios赋值给全局属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
