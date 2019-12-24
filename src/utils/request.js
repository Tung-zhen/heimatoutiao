// 负责对axios进行处理
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  return config
}, function () {

})

axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // 解决js处理大数据失真问题
}]

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行该函数 状态码  200/201/204
  // 对响应数据做处理
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()  跳转到登录页
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示信息
  // 错误执行函数 如果不做任何操作 还会进入到promise then中
  return Promise.reject(error) // 只要reject 就会进入catch中
})
export default axios
