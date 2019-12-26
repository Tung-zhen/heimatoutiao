<template>
  <el-card v-loading="loading">
      <!-- 头部内容 -->
      <bread-crumb slot="header">
        <template slot="title">
           素材管理
        </template>
      </bread-crumb>
      <!-- 上传按钮 -->
      <el-row type="flex" justify="end">
        <el-upload action="" :http-request="uploadImg" :show-file-list="false">
          <el-button type="primary" size="small">上传</el-button>
        </el-upload>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部图片" name="all">
            <!-- 生成全部素材页面结构 -->
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
      <!-- 分页公共组件 -->
        <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
        </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 设置默认选中的标签
      list: [], // 接收素材数据
      page: { // 设置分页数据
        total: 0, // 总条目数 类型为number
        pageSize: 10, // 每页显示条目个数 类型为number  默认每页条数为10
        currentPage: 1 // 当前页数  类型为number  默认页码为1
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      this.loading = true // 先弹个层
      let data = new FormData()
      data.append('image', params.file) // 文件加入到参数中
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        this.loading = false // 关闭弹层
        this.getMaterial() // 直接调用拉取数据的方法
      })
    },
    // 改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage // 最新的页码
      this.getMaterial() // 重新请求
    },
    // 切换页签方法
    changeTab () {
      this.page.currentPage = 1 // 将页码重置为1
      this.getMaterial() // 调用获取数据方法
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect' // flase是获取所有数据 true是获取收藏数据
        }
      }).then(result => {
        this.list = result.data.results // 获取图片数据 有可能是收藏的图片,也有可能是所有的图片 根据点击页签进行相应操作
        this.page.total = result.data.total_count // 获取总数
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
