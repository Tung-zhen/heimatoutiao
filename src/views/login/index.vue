<template>
  <div class="login">
    <!-- 放置一个el-card组件(卡片) -->
    <el-card class="login-card">
      <!-- 放置标题图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单 -->
      <el-form>
        <!-- 放置表单域 里面放置input/select/checkbox 一个表单域相当于一行 -->
        <!-- 输入手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 获取并输入验证码 -->
        <el-form-item>
          <el-input style="width:70%" placeholder="验证码"></el-input>
          <el-button style="float:right" plain>获取验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

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
