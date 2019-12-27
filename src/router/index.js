import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转到home页面
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2 // 二级路由地址不写的话,代表二级路由的默认组件
    }, {
      path: 'comment', // 这个是相对写法  完整写法: /home/comment
      component: () => import('../views/comment') // 按需加载
    }, {
      path: '/home/material',
      component: () => import('../views/material')
    }, {
      path: '/home/articles', // 文章列表
      component: () => import('../views/articles')
    }, {
      path: 'publish',
      component: () => import('../views/publish')
    }]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
