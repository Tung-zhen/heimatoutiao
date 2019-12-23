<template>
  <el-carousel height="800px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://w.wallhaven.cc/full/4x/wallhaven-4x9jl3.jpg', 'https://w.wallhaven.cc/full/49/wallhaven-49opz8.png']
    }
  }
}
</script>

<style>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
