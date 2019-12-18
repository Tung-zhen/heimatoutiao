<template>
  <div class="login">
    <!-- 放置一个el-card组件(卡片) -->
    <el-card class="login-card">
      <!-- 放置标题图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单 给el-form绑定数据对象 -->
      <el-form ref="myForm" :model="loginForm" :rules="loginRules">
        <!-- 放置表单域 里面放置input/select/checkbox 一个表单域相当于一行 -->
        <!-- 输入手机号  prop要写检验的字段名-->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 获取并输入验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:70%" placeholder="验证码"></el-input>
          <el-button style="float:right" plain>获取验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="subminLogin" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则对象 key(字段名):value(规则 => [])
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' }, {
          pattern: /^\d{6}$/, message: '请输入正确验证码' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            // 自定义校验函数
            // rule 当前规则
            // value 要校验的字段的值
            // callback 是一个回调函数
            // 认为已经勾选
            callback() // 认为当前的规则校验通过了
          } else {
            // 认为没有勾选
            callback(new Error('给我把复选框勾上,不然的话小心我抽你!'))
          }
        } }]
      }
    }
  },
  methods: {
    subminLogin () {
      // 手动校验
      this.$refs.myForm.validate(function (isOK) {
        if (isOK) {
          // 说明校验通过 应该调用登录接口
          console.log('校验通过,开始调用登录接口')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login {
    background-image: url(../../assets/img/back.jpg);
    height: 100vh;  // 将可视区域分为100份
    background-size: cover; // 自适应覆盖
    // 设置垂直水平居中
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 500px;
      height: 350px;
      .title {
        text-align: center;
        margin-bottom: 30px;
        img {
          height: 50px;
        }
      }
    }
  }
</style>
