import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb.vue'
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册 左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册头部组件
    Vue.component('bread-crumb', breadCrumb) // 全局注册面包屑组件
  }
}
