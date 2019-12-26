<template>
  <el-card class="articles">
    <bread-crumb slot="header">
        <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
            <!-- 放置单选组 -->
            <el-radio-group v-model="searchForm.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
            <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <!-- label显示值    value存储值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
            <!-- 日期选择器 日期范围 -->
            <el-date-picker v-model="searchForm.dataRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
    </el-form>
    <el-row class="totle" type="flex" align="middle">
        <span>共找到1000条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 左侧 -->
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <span><i class="el-icon-edit"></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 文章状态
      searchForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认不选中任何一个分类
        dataRange: [] // 日期范围
      },
      channels: [], // 用来接收频道数据
      list: [],
      defaultImg: require('../../assets/img/de.jpg') // 默认图片
    }
  },
  filters: {
    //   改变标签名称
    filterStatus (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 改变标签颜色
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 获取所有频道
    getChannles () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列数据
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results // 获取文章列表数据
      })
    }
  },
  created () {
    this.getChannles() // 获取文章数据
    this.getArticles() // 获取文章列表数据
  }
}
</script>

<style lang='less' scoped>
    .articles {
        .totle {
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        .article-item {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #f2f3f5;
            .left {
                display: flex;
                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 4px;
                }
                .info {
                height: 100px;
                margin-left: 10px;
                display: flex;
                flex-direction: column; // 从上向下布局
                justify-content: space-around;
                .date {
                    font-size: 12px;
                    color: #999;
                }
                .tag {
                    text-align: center;
                    width: 60px;
                    }
                }
            }
            .right {
                span {
                    font-size: 14px;
                    margin-right:8px;
                    cursor: pointer; // 修改鼠标样式为小手
                }
            }
        }
    }
</style>
