<template>
  <el-card>
      <!-- 头部内容 -->
      <bread-crumb slot="header">
        <template slot="title">
           素材管理
        </template>
      </bread-crumb>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部图片" name="all">
            <!-- 生成页面结构 -->
              <div class="img-list">
                <!-- 使用v-for对数据进行遍历 -->
                <el-card class="img-card" v-for="item in list" :key="item.id">
                  <img :src="item.url" alt="">
                  <el-row class="operate" type="flex" align="middle" justify="space-around">
                    <i class="el-icon-star-on"></i>
                    <i class="el-icon-delete-solid"></i>
                  </el-row>
                </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
            <div class="img-list">
                <!-- 使用v-for对数据进行遍历 -->
                <el-card class="img-card" v-for="item in list" :key="item.id">
                  <img :src="item.url" alt="">
                </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 设置默认选中的标签
      list: [] // 接收素材数据
    }
  },
  methods: {
    // 切换页签方法
    changeTab () {
      this.getMaterial() // 调用获取数据方法
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect' // flase是获取所有数据 true是获取收藏数据
        }
      }).then(result => {
        this.list = result.data.results // 获取图片数据 有可能是收藏的图片,也有可能是所有的图片 根据点击页签进行相应操作
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
      width: 200px;
      height: 200px;
      margin: 20px 50px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        width: 100%;
        height: 36px;
        position: absolute; // 脱离文档流
        left: 0;
        bottom: 0;
        font-size: 22px;
        background-color: #f4f5f6;
      }
    }
  }
</style>>
