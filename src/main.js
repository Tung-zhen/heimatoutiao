import Vue from 'vue'
import App from './App.vue'
import './permission' // 引用权限模块
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import Component from './components/index'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from './utils/request'
Vue.prototype.$axios = axios // 给axios赋值给全局属性
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
